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
