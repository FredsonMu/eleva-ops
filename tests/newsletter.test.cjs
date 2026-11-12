const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const ts = require('typescript');

process.env.NEWSLETTER_UNSUBSCRIBE_SECRET = 'local-test-signing-secret-not-a-real-credential';
const contactId = '479e3145-dd38-476b-932c-529ceb705947';
const lead = { firstName: 'Ana', email: 'ana@example.com', language: 'pt', guideId: 'manual-prazos', marketingConsent: true };
const ok = data => ({ data, error: null });
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
      segments: { add: async value => { segments.push(value); return ok({ id: contactId }); } },
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
  const message = newsletter.buildNewsletterWelcome('<Ana & Joao>', 'pt', 'manual-prazos', 'https://elevaops.com/newsletter/unsubscribe?token=valid');
  assert.match(message.subject, /newsletter/);
  assert.ok(message.html.includes('&lt;Ana &amp; Joao&gt;'));
  assert.ok(!message.html.includes('<Ana & Joao>'));
  assert.ok(message.html.includes('eleva-ops-entre-prazos-e-processos.pdf'));
  assert.ok(message.text.includes('Fredson, ElevaOps'));
  assert.ok(message.html.includes('newsletter/unsubscribe?token=valid'));
  assert.ok(message.html.includes('LegalOps'));
  const english = newsletter.buildNewsletterWelcome('Ana', 'en', 'ai-agents', 'https://elevaops.com/unsubscribe');
  assert.equal(english.subject, 'Welcome to the ElevaOps newsletter');
  assert.ok(english.html.includes('lang="en"'));
});

test('no consent means no provider calls or welcome', async () => {
  const { newsletter, sent, created, updated } = setup();
  assert.equal(await newsletter.subscribeToNewsletter({ ...lead, marketingConsent: false }), null);
  assert.equal(sent.length + created.length + updated.length, 0);
});

test('new opt-in creates the contact and sends welcome with working unsubscribe headers', async () => {
  const { newsletter, sent, created } = setup();
  assert.deepEqual(await newsletter.subscribeToNewsletter(lead), { subscribed: true, welcomed: true });
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
  assert.deepEqual(await newsletter.subscribeToNewsletter(lead), { subscribed: true, welcomed: true });
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
  assert.deepEqual(await newsletter.subscribeToNewsletter(lead), { subscribed: true, welcomed: false });
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
      body: JSON.stringify({ ...lead, marketingConsent: consent, teamSize: '3-5', website: '', startedAt: Date.now() - 5000 }),
    });
  }
  const optIn = await route.POST(request(true, '192.0.2.1'));
  assert.equal(optIn.status, 200);
  const result = await optIn.json();
  assert.deepEqual(result.newsletter, { subscribed: true, welcomed: true });
  assert.equal(result.download, '/guides/eleva-ops-entre-prazos-e-processos.pdf');
  assert.equal(saved[0].teamSize, '3-5');
  assert.equal(delivered[0][3], 'manual-prazos');
  assert.equal(sent.length, 2); // Team notification and welcome; delivery is separately mocked.
  assert.equal(created.length, 1);
  const optOut = await route.POST(request(false, '192.0.2.2'));
  assert.equal(optOut.status, 200);
  assert.equal((await optOut.json()).newsletter, null);
  assert.equal(created.length, 1);
  assert.equal(sent.length, 3); // Only a team notification was added.
});
