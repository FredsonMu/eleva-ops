import { Resend } from 'resend';

// Shared by the API routes that send email through Resend.

// Created lazily so the build doesn't fail when RESEND_API_KEY isn't set.
let resend: Resend | null = null;

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  resend ??= new Resend(apiKey);
  return resend;
}

export function getNewsletterResend() {
  return process.env.RESEND_NEWSLETTER_API_KEY ? new Resend(process.env.RESEND_NEWSLETTER_API_KEY) : getResend();
}

// Calls in a guide request share Resend's rate limit; retry temporary failures.
export async function withResendRetry<T extends { error: unknown }>(request: () => Promise<T>): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      const result = await request();
      const error = result.error as { statusCode?: number | null } | null;
      if (attempt >= 2 || !error || (error.statusCode !== 429 && (error.statusCode ?? 0) < 500)) return result;
    } catch (error) {
      if (attempt >= 2) throw error;
    }
    await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt));
  }
}

export const EMAIL_FROM = 'ElevaOps <onboarding@elevaops.com>';
export const TEAM_INBOX = 'contact@elevaops.com';

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
