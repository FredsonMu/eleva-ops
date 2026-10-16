'use client';
import type { ReactNode } from 'react';
import { useLanguage } from '@/lib/i18n';
import { LEGAL } from '@/lib/legal';
import { Brand } from '../Brand';

// Short Privacy Policy in English and Portuguese (follows the site's language toggle).
// Aligned with the GDPR, Portuguese Law 58/2019 and Law 41/2004 (cookies and marketing).
// Keep it in sync with what the site actually does (e.g. if a Pixel is ever added).

type Section = { title: string; body: ReactNode[] };

const mail = <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>;
const cnpd = <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer">CNPD</a>;
const company = [LEGAL.legalName, LEGAL.address, LEGAL.registrationNumber && `NIPC ${LEGAL.registrationNumber}`].filter(Boolean).join(', ');

const content: Record<'en' | 'pt', { title: string; intro: string; updated: string; sections: Section[] }> = {
  en: {
    title: 'Privacy Policy',
    intro: 'How we handle your personal data, in plain words.',
    updated: `Last updated ${LEGAL.effectiveDate}`,
    sections: [
      {
        title: 'Who we are',
        body: [<><Brand>{company || LEGAL.brand}</Brand> is responsible for your data under the GDPR. Questions or requests: {mail}.</>],
      },
      {
        title: 'What we collect',
        body: [
          'The details you send us: your name, email and message, or your first name and email when you request a guide.',
          'Which ad or link brought you here (campaign parameters), and basic technical data such as your IP address, kept by our hosting provider.',
        ],
      },
      {
        title: 'Why we use it',
        body: [
          'To reply to you, send you the guide you asked for, see which campaigns work and keep the website secure. We only send marketing emails if you opt in, and getting a guide never depends on it.',
        ],
      },
      {
        title: 'Cookies',
        body: ['We don’t use cookies. We only save your light or dark theme choice on your device.'],
      },
      {
        title: 'Who we share it with',
        body: [
          'Only Vercel (website hosting), Resend (email delivery) and Google (Google Sheets, where we keep the list of guide requests), which act on our behalf. When they process data outside the EU, they do so with the safeguards required by the GDPR. We never sell your data.',
        ],
      },
      {
        title: 'How long we keep it',
        body: ['Enquiries for up to 24 months, guide requests for up to 12 months, and marketing details until you unsubscribe. Invoices are kept for 10 years, as Portuguese law requires.'],
      },
      {
        title: 'Your rights',
        body: [
          <>You can access, correct or delete your data, object to its use or withdraw your consent at any time. Just email {mail} and we’ll reply within one month. You can also complain to the Portuguese data protection authority, the {cnpd}.</>,
        ],
      },
    ],
  },
  pt: {
    title: 'Política de Privacidade',
    intro: 'Como tratamos os seus dados pessoais, de forma simples.',
    updated: `Atualizada a ${LEGAL.effectiveDate.replace('October', 'de outubro de')}`,
    sections: [
      {
        title: 'Quem somos',
        body: [<>A <Brand>{company || LEGAL.brand}</Brand> é responsável pelos seus dados nos termos do RGPD. Questões ou pedidos: {mail}.</>],
      },
      {
        title: 'O que recolhemos',
        body: [
          'Os dados que nos envia: nome, email e mensagem, ou primeiro nome e email quando pede um guia.',
          'O anúncio ou link que o trouxe até nós (parâmetros de campanha) e dados técnicos básicos, como o endereço IP, guardados pelo nosso alojamento.',
        ],
      },
      {
        title: 'Para que os usamos',
        body: [
          'Para lhe responder, enviar o guia que pediu, perceber que campanhas funcionam e manter o website seguro. Só enviamos emails de marketing se der o seu consentimento, e o acesso aos guias nunca depende disso.',
        ],
      },
      {
        title: 'Cookies',
        body: ['Não usamos cookies. Apenas guardamos no seu dispositivo a sua escolha de tema claro ou escuro.'],
      },
      {
        title: 'Com quem partilhamos',
        body: [
          'Apenas com a Vercel (alojamento do website), a Resend (envio de emails) e a Google (Google Sheets, onde guardamos a lista de pedidos de guias), que atuam em nosso nome. Quando tratam dados fora da UE, fazem-no com as garantias exigidas pelo RGPD. Nunca vendemos os seus dados.',
        ],
      },
      {
        title: 'Durante quanto tempo',
        body: ['Pedidos de contacto até 24 meses, pedidos de guias até 12 meses e dados de marketing até cancelar a subscrição. As faturas são guardadas 10 anos, conforme a lei portuguesa.'],
      },
      {
        title: 'Os seus direitos',
        body: [
          <>Pode aceder, corrigir ou apagar os seus dados, opor-se à sua utilização ou retirar o consentimento a qualquer momento. Basta escrever para {mail} e respondemos no prazo de um mês. Pode também apresentar reclamação à {cnpd}.</>,
        ],
      },
    ],
  },
};

export function PrivacyPolicyContent() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <div lang={language === 'pt' ? 'pt-PT' : 'en'} className="max-w-6xl mx-auto px-5 md:px-6 pt-36 md:pt-44 pb-24 md:pb-36">
      <header className="mb-16 md:mb-24">
        <h1 className="font-sans font-semibold tracking-[-0.04em] leading-[1] text-[clamp(2.75rem,8vw,5rem)]">{c.title}</h1>
        <p className="mt-6 text-lg md:text-xl font-medium text-black/60 dark:text-white/65">{c.intro}</p>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-brand">{c.updated}</p>
      </header>

      <div className="border-t border-black/10 dark:border-white/15 [&_a]:text-brand [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:no-underline">
        {c.sections.map((s, i) => (
          <section key={s.title} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-3 md:gap-12 py-8 md:py-10 border-b border-black/10 dark:border-white/15">
            <h2 className="flex items-baseline gap-4 font-sans text-xl md:text-2xl font-semibold tracking-tight">
              <span className="font-mono text-xs font-semibold text-brand" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              {s.title}
            </h2>
            <div className="space-y-3">
              {s.body.map((b, j) => (
                <p key={j} className="text-base md:text-lg leading-relaxed text-black/65 dark:text-white/70">{b}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
