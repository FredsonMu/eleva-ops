const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const ts = require('typescript');

process.env.NEWSLETTER_UNSUBSCRIBE_SECRET = 'local-test-signing-secret-not-a-real-credential';
const contactId = '479e3145-dd38-476b-932c-529ceb705947';
const lead = { firstName: 'Ana', email: 'ana@example.com', language: 'pt', guideId: 'ai-lawyers', marketingConsent: true };
const ok = data => ({ data, error: null });
const subscriptionStatus = result => result && ({ subscribed: result.subscribed, welcomed: result.welcomed });
const failed = (statusCode, name = 'validation_error') => ({ data: null, error: { statusCode, name, message: 'Test provider failure' } });

// Transpile the installed TypeScript version in memory; no extra runner or network.
function load(relative, overrides = {}) {
  const filename = path.resolve(relative);
  const nativeRequire = createRequire(filename);
  const module = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText;
  const localRequire = name => {
    if (Object.hasOwn(overrides, name)) return overrides[name];
    if (name.startsWith('@/')) return load(name.slice(2) + '.ts', overrides);
    if (name.startsWith('.')) return load(path.resolve(path.dirname(filename), name) + '.ts', overrides);
    return nativeRequire(name);
  };
  new Function('require', 'module', 'exports', code)(localRequire, module, module.exports);
  return module.exports;
}

const realEmail = load('lib/email.ts');
function setup(options = {}) {
  const sent = [], created = [], updated = [], segments = [];
  const client = {
    contacts: {
      get: async () => options.lookup ?? failed(404, 'not_found'),
      create: async value => { created.push(value); return options.save ?? ok({ id: contactId }); },
      update: async value => { updated.push(value); return options.save ?? ok({ id: contactId }); },
      segments: { add: async value => { segments.push(value); return ok({ id: contactId }); }, list: async () => ok({ data: options.contactSegments ?? [] }) },
    },
    emails: { send: async (message, request) => { sent.push({ message, request }); return options.send ?? ok({ id: 'email-id' }); } },
  };
  const email = { ...realEmail, getResend: () => client, getNewsletterResend: () => client, withResendRetry: fn => fn() };
  const newsletter = load('lib/newsletter.ts', { './email': email });
  return { client, email, newsletter, sent, created, updated, segments };
}

test('unsubscribe signatures reject tampering and expose no email address', () => {
  const { newsletter } = setup();
  const token = newsletter.createUnsubscribeToken(contactId, 'pt');
  assert.deepEqual(newsletter.verifyUnsubscribeToken(token), { contactId, language: 'pt' });
  for (const invalid of ['', token.replace('.pt.', '.en.'), token + 'x', token.replace('479e', '579e'), '<script>', 'x'.repeat(500)]) {
    assert.equal(newsletter.verifyUnsubscribeToken(invalid), null);
  }
  assert.ok(!token.includes(lead.email));
});

test('welcome is personalised, escaped, in the requested language and links to the correct PDF', () => {
  const { newsletter } = setup();
  const message = newsletter.buildNewsletterWelcome('<Ana & Joao>', 'pt', 'ai-lawyers', 'https://elevaops.com/newsletter/unsubscribe?token=valid');
  assert.match(message.subject, /newsletter/);
  assert.ok(message.html.includes('&lt;Ana &amp; Joao&gt;'));
  assert.ok(!message.html.includes('<Ana & Joao>'));
  assert.ok(message.html.includes('eleva-ops-ia-para-advogados.pdf'));
  assert.ok(message.text.includes('Fredson, ElevaOps'));
  assert.ok(message.html.includes('newsletter/unsubscribe?token=valid'));
  assert.ok(message.html.includes('LegalOps'));
  assert.ok(message.html.includes('/email/newsletter-welcome.jpg'));
  assert.ok(!message.html.includes('data:image/'));
  });

test('no consent means no provider calls or welcome', async () => {
  const { newsletter, sent, created, updated } = setup();
  assert.equal(await newsletter.subscribeToNewsletter({ ...lead, marketingConsent: false }), null);
  assert.equal(sent.length + created.length + updated.length, 0);
});

test('new opt-in creates the contact and sends welcome with working unsubscribe headers', async () => {
  const { newsletter, sent, created } = setup();
  assert.deepEqual(subscriptionStatus(await newsletter.subscribeToNewsletter(lead)), { subscribed: true, welcomed: true });
  assert.deepEqual(created[0], { email: lead.email, firstName: lead.firstName, unsubscribed: false });
  assert.equal(sent[0].message.to, lead.email);
  assert.equal(sent[0].message.replyTo, 'contact@elevaops.com');
  assert.equal(sent[0].message.headers['List-Unsubscribe-Post'], 'List-Unsubscribe=One-Click');
  const url = sent[0].message.headers['List-Unsubscribe'].slice(1, -1);
  assert.equal(newsletter.verifyUnsubscribeToken(new URL(url).searchParams.get('token')).contactId, contactId);
  await newsletter.subscribeToNewsletter(lead);
  assert.equal(sent[0].request.idempotencyKey, sent[1].request.idempotencyKey);
});

test('renewed consent updates a previously unsubscribed contact', async () => {
  const { newsletter, created, updated } = setup({ lookup: ok({ id: contactId, unsubscribed: true }) });
  assert.deepEqual(subscriptionStatus(await newsletter.subscribeToNewsletter(lead)), { subscribed: true, welcomed: true });
  assert.equal(created.length, 0);
  assert.deepEqual(updated[0], { id: contactId, firstName: 'Ana', unsubscribed: false });
});

test('Contacts permission failure is reported without sending a false confirmation', async () => {
  const { newsletter, sent, created } = setup({ lookup: failed(403, 'restricted_api_key') });
  assert.deepEqual(await newsletter.subscribeToNewsletter(lead), { subscribed: false, welcomed: false });
  assert.equal(sent.length + created.length, 0);
});

test('welcome failure preserves and accurately reports the saved subscription', async () => {
  const { newsletter } = setup({ send: failed(400) });
  assert.deepEqual(subscriptionStatus(await newsletter.subscribeToNewsletter(lead)), { subscribed: true, welcomed: false });
});

test('unsubscribe GET is read-only, POST unsubscribes and forged tokens cannot mutate Contacts', async () => {
  const { newsletter, email, updated } = setup();
  const route = load('app/newsletter/unsubscribe/route.ts', { '@/lib/email': email, '@/lib/newsletter': newsletter });
  const token = newsletter.createUnsubscribeToken(contactId, 'pt');
  const url = 'https://elevaops.com/newsletter/unsubscribe?token=' + token;
  const confirmation = await route.GET(new Request(url));
  assert.equal(confirmation.status, 200);
  assert.match(await confirmation.text(), /method="post"/);
  assert.equal(updated.length, 0);
  assert.equal((await route.POST(new Request(url, { method: 'POST' }))).status, 200);
  assert.deepEqual(updated[0], { id: contactId, unsubscribed: true });
  assert.equal((await route.POST(new Request(url + 'x', { method: 'POST' }))).status, 400);
  assert.equal(updated.length, 1);
  assert.equal(confirmation.headers.get('cache-control'), 'no-store');
});

test('unsubscribe provider failure stays retryable instead of displaying success', async () => {
  const { newsletter, email } = setup({ save: failed(403, 'restricted_api_key') });
  const route = load('app/newsletter/unsubscribe/route.ts', { '@/lib/email': email, '@/lib/newsletter': newsletter });
  const token = newsletter.createUnsubscribeToken(contactId, 'en');
  const response = await route.POST(new Request('https://elevaops.com/newsletter/unsubscribe?token=' + token, { method: 'POST' }));
  assert.equal(response.status, 503);
  assert.match(await response.text(), /Please try again/);
});

test('temporary Resend rate limits retry; permission errors do not retry', async () => {
  let attempts = 0;
  const response = await realEmail.withResendRetry(async () => ++attempts === 1 ? failed(429, 'rate_limit_exceeded') : ok({ id: 'sent' }));
  assert.equal(response.error, null);
  assert.equal(attempts, 2);
  attempts = 0;
  await realEmail.withResendRetry(async () => { attempts++; return failed(403, 'restricted_api_key'); });
  assert.equal(attempts, 1);
});

test('guide API delivers the PDF independently and only opted-in requests get newsletter side effects', async () => {
  const { email, newsletter, sent, created } = setup();
  const saved = [], delivered = [];
  const guide = load('lib/guide.ts');
  const route = load('app/api/guide-lead/route.ts', {
    '@/lib/email': email, '@/lib/guide': guide, '@/lib/newsletter': newsletter,
    '@/lib/leads-sheet': { isSheetConfigured: () => true, appendLeadToSheet: async value => { saved.push(value); return true; } },
    '@/lib/guide-email': { sendGuideToLead: async (...args) => { delivered.push(args); return true; } },
  });
  function request(consent, ip) {
    return new Request('https://elevaops.com/api/guide-lead', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://elevaops.com', Host: 'elevaops.com', 'x-forwarded-for': ip },
      body: JSON.stringify({ ...lead, marketingConsent: consent, website: '', startedAt: Date.now() - 5000 }),
    });
  }
  const optIn = await route.POST(request(true, '192.0.2.1'));
  assert.equal(optIn.status, 200);
  const result = await optIn.json();
  assert.deepEqual(result.newsletter, { subscribed: true, welcomed: true });
  assert.equal(result.download, '/guides/eleva-ops-ia-para-advogados.pdf');
  assert.equal(delivered[0][3], 'ai-lawyers');
  assert.ok(delivered[0][5].includes('/newsletter/unsubscribe?token='));
  assert.equal(Object.hasOwn(result.newsletter, 'unsubscribeUrl'), false);
  assert.equal(sent.length, 2); // Team notification and welcome; delivery is separately mocked.
  assert.equal(created.length, 1);
  const optOut = await route.POST(request(false, '192.0.2.2'));
  assert.equal(optOut.status, 200);
  assert.equal((await optOut.json()).newsletter, null);
  assert.equal(delivered[1][5], undefined);
  assert.equal(created.length, 1);
  assert.equal(sent.length, 3); // Only a team notification was added.
});


test('PDF email shows cancellation only for subscribers, in HTML, text and mailbox headers', async () => {
  const { email, sent, newsletter } = setup();
  const delivery = load('lib/guide-email.ts', { './email': email });
  const url = 'https://elevaops.com/newsletter/unsubscribe?token=' + newsletter.createUnsubscribeToken(contactId, 'pt');
  const subscribed = delivery.buildGuideEmail('Ana', 'pt', 'ai-lawyers', url);
  assert.ok(subscribed.html.includes('Cancelar subscri\u00e7\u00e3o'));
  assert.ok(subscribed.html.includes(url));
  assert.ok(subscribed.text.includes(url));
  const plain = delivery.buildGuideEmail('Ana', 'pt', 'ai-lawyers');
  assert.ok(!plain.html.includes('/newsletter/unsubscribe'));
  await delivery.sendGuideToLead(lead.email, lead.firstName, 'pt', 'ai-lawyers', 'lead-123', url);
  assert.equal(sent[0].message.headers['List-Unsubscribe'], '<' + url + '>');
  await delivery.sendGuideToLead(lead.email, lead.firstName, 'pt', 'ai-lawyers', 'lead-124');
  assert.equal(sent[1].message.headers, undefined);
});

// ── LegalOps waitlist ─────────────────────────────────────────────────────────────────────

function waitlistRoute(options = {}) {
  const env = setup(options);
  const rows = [];
  const route = load('app/api/waitlist/route.ts', {
    '@/lib/email': env.email, './email': env.email,
    '@/lib/leads-sheet': { isSheetConfigured: () => true, appendLeadToSheet: async value => { rows.push(value); return true; } },
  });
  let ip = 0;
  const post = body => route.POST(new Request('https://elevaops.com/api/waitlist', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://elevaops.com', Host: 'elevaops.com', 'x-forwarded-for': '198.51.100.' + ++ip },
    body: JSON.stringify({ name: 'Ana Silva', email: 'ana@escritorio.pt', phone: '+351 912 345 678', office: 'Silva & Associados', role: 'Sócio', teamSize: '4–10 pessoas', waitlistConsent: true, newsletter: false, website: '', startedAt: Date.now() - 5000, tracking: { utm_source: 'instagram', utm_campaign: 'manual' }, ...body }),
  }));
  return { ...env, rows, post };
}

function withSegments(fn) {
  return async () => {
    process.env.RESEND_WAITLIST_SEGMENT_ID = 'seg-waitlist';
    process.env.RESEND_NEWSLETTER_SEGMENT_ID = 'seg-newsletter';
    try { await fn(); } finally {
      delete process.env.RESEND_WAITLIST_SEGMENT_ID;
      delete process.env.RESEND_NEWSLETTER_SEGMENT_ID;
    }
  };
}

test('waitlist emails: A without and B with the newsletter paragraph, logo, signature and unsubscribe', () => {
  const { email } = setup();
  const waitlist = load('lib/waitlist.ts', { './email': email });
  const url = 'https://elevaops.com/newsletter/unsubscribe?token=abc';
  const a = waitlist.buildWaitlistEmail('<Ana> Silva', false, url);
  const b = waitlist.buildWaitlistEmail('Ana Silva', true, url);
  assert.equal(a.subject, 'Está na waitlist do LegalOps');
  assert.equal(b.subject, 'Está na waitlist do LegalOps (e na nossa newsletter)');
  assert.ok(a.html.includes('Olá &lt;Ana&gt;,'));
  assert.ok(!a.html.includes('Como também escolheu a newsletter'));
  assert.ok(b.html.includes('Como também escolheu a newsletter'));
  assert.ok(!b.text.includes('O primeiro chega'));
  for (const message of [a, b]) {
    assert.ok(message.html.includes('/email/legalops-logo-chip.png'));
    assert.ok(message.html.includes('/email/fredson.jpg'));
    assert.ok(message.html.includes(url) && message.text.includes(url));
    assert.ok(!/intelig[eê]ncia artificial|\bIA\b/.test(message.text));
  }
});

test('waitlist only: one waitlist segment, email A, team email C and a sheet row with consent time', withSegments(async () => {
  const { post, created, sent, rows } = waitlistRoute();
  const response = await post({});
  assert.equal(response.status, 200);
  assert.deepEqual(created[0].segments, [{ id: 'seg-waitlist' }]);
  const person = sent.find(s => s.message.to === 'ana@escritorio.pt').message;
  const team = sent.find(s => s.message.to === 'contact@elevaops.com').message;
  assert.equal(person.subject, 'Está na waitlist do LegalOps');
  assert.ok(person.headers['List-Unsubscribe'].includes('/newsletter/unsubscribe?token='));
  assert.equal(team.subject, 'Nova inscrição — Waitlist LegalOps');
  assert.ok(team.text.includes('Origem: instagram / manual') && team.text.includes('Newsletter: Não') && team.text.includes('Telefone: +351 912 345 678'));
  assert.equal(rows[0].phone, '+351 912 345 678');
  assert.equal(rows[0].role, 'Sócio');
  assert.equal(rows[0].marketingConsent, false);
  assert.ok(rows[0].waitlistConsentAt && !rows[0].newsletterConsentAt);
}));

test('waitlist + newsletter: both segments, email B and "+ Newsletter" for the team', withSegments(async () => {
  const { post, created, sent, rows } = waitlistRoute();
  assert.equal((await post({ newsletter: true })).status, 200);
  assert.deepEqual(created[0].segments, [{ id: 'seg-waitlist' }, { id: 'seg-newsletter' }]);
  assert.ok(sent.some(s => s.message.subject === 'Está na waitlist do LegalOps (e na nossa newsletter)'));
  assert.ok(sent.some(s => s.message.subject === 'Nova inscrição — Waitlist LegalOps + Newsletter'));
  assert.ok(rows[0].newsletterConsentAt);
}));

test('waitlist refuses a missing consent and does not re-register an email already on the list', withSegments(async () => {
  const fresh = waitlistRoute();
  const refused = await fresh.post({ waitlistConsent: false });
  assert.equal(refused.status, 422);
  assert.equal((await refused.json()).field, 'waitlistConsent');
  const existing = waitlistRoute({ lookup: ok({ id: contactId }), contactSegments: [{ id: 'seg-waitlist' }] });
  const again = await existing.post({});
  assert.deepEqual(await again.json(), { ok: true, duplicate: true });
  assert.equal(existing.sent.length + existing.rows.length + existing.updated.length, 0);
}));

test('waitlist requires a valid phone number', withSegments(async () => {
  const { post, sent } = waitlistRoute();
  const missing = await post({ phone: '' });
  assert.equal(missing.status, 422);
  assert.equal((await missing.json()).field, 'phone');
  assert.equal((await post({ phone: '+351 12' })).status, 422);
  assert.equal(sent.length, 0);
}));

test('manual: phone required, PDF by email, and the optional waitlist box adds the waitlist segment only', withSegments(async () => {
  const { email, newsletter, sent, created } = setup();
  const rows = [], delivered = [];
  const route = load('app/api/guide-lead/route.ts', {
    '@/lib/email': email, './email': email, '@/lib/newsletter': newsletter,
    '@/lib/leads-sheet': { isSheetConfigured: () => true, appendLeadToSheet: async value => { rows.push(value); return true; } },
    '@/lib/guide-email': { sendGuideToLead: async (...args) => { delivered.push(args); return true; } },
  });
  let ip = 10;
  const post = body => route.POST(new Request('https://elevaops.com/api/guide-lead', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://elevaops.com', Host: 'elevaops.com', 'x-forwarded-for': '203.0.113.' + ++ip },
    body: JSON.stringify({ firstName: 'Rui', email: 'rui@escritorio.pt', phone: '+351 912 345 678', language: 'pt', guideId: 'gestao-juridica', marketingConsent: false, website: '', startedAt: Date.now() - 5000, ...body }),
  }));
  const noPhone = await post({ phone: '' });
  assert.equal(noPhone.status, 422);
  assert.equal((await noPhone.json()).field, 'phone');
  const ok = await post({ waitlist: true });
  assert.equal(ok.status, 200);
  assert.equal((await ok.json()).download, '/guides/eleva-ops-gestao-juridica-digital.pdf');
  assert.deepEqual(created[0].segments, [{ id: 'seg-waitlist' }]);
  assert.equal(delivered[0][3], 'gestao-juridica');
  assert.ok(sent.some(s => s.message.to === 'rui@escritorio.pt' && s.message.subject === 'Está na waitlist do LegalOps'));
  assert.ok(delivered[0][5].includes('/newsletter/unsubscribe?token='));
  assert.equal(rows[0].guide, 'Gestão Jurídica Digital + Waitlist LegalOps');
  assert.ok(rows[0].waitlistConsentAt && !rows[0].newsletterConsentAt);
  assert.ok(sent.some(s => s.message.to === 'contact@elevaops.com' && s.message.html.includes('LegalOps waitlist:</strong> Yes')));
  // Both boxes: email B, and no separate newsletter welcome.
  sent.length = 0;
  assert.equal((await post({ email: 'ana@escritorio.pt', waitlist: true, marketingConsent: true })).status, 200);
  const toAna = sent.filter(s => s.message.to === 'ana@escritorio.pt').map(s => s.message.subject);
  assert.deepEqual(toAna, ['Está na waitlist do LegalOps (e na nossa newsletter)']);
}));

test('manual delivery email mentions the waitlist only when it was ticked', () => {
  const { email } = setup();
  const delivery = load('lib/guide-email.ts', { './email': email });
  assert.ok(delivery.buildGuideEmail('Rui', 'pt', 'gestao-juridica', undefined, { waitlist: true }).text.includes('waitlist do LegalOps'));
  const plain = delivery.buildGuideEmail('Rui', 'pt', 'gestao-juridica');
  assert.ok(!plain.text.includes('waitlist'));
  assert.match(plain.subject, /manual/);
});
