// Appends guide leads to a Google Sheet through a Google Apps Script web app.
// Setup (sheet, script and environment variables): docs/leads-google-sheets.md

export type SheetLead = {
  leadId: string;
  firstName: string;
  email: string;
  marketingConsent: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

export function isSheetConfigured() {
  return Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL && process.env.GOOGLE_SHEETS_WEBHOOK_SECRET);
}

// Returns true only when the script confirms the row was written.
export async function appendLeadToSheet(lead: SheetLead): Promise<boolean> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) return false;

  try {
    // Apps Script answers through a redirect; fetch follows it and returns the JSON body.
    // The secret travels in the body because Apps Script can't read request headers.
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...lead, secret }),
      redirect: 'follow',
      signal: AbortSignal.timeout(10_000),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.ok) {
      console.error('[leads-sheet] Sheet rejected the lead:', response.status, result);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[leads-sheet] Could not reach the sheet:', err);
    return false;
  }
}
