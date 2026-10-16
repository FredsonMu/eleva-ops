# Leads table in Google Sheets

Every request for the guide at `/ai-agents-guide` is added as a new row to a Google Sheet.
The team still receives an email notification for each lead (Resend), when it is configured.

The site only shows "Your guide is ready." after the lead was actually stored (sheet and/or email).

## Columns

| Data | Nome | Email | Aceita marketing | Origem | Meio | Campanha | Anúncio | Conjunto de anúncios | ID da lead |
|---|---|---|---|---|---|---|---|---|---|

- **Aceita marketing**: `Sim` only if the person ticked the optional box. Only these people may receive marketing emails.
- **Origem / Meio / Campanha / Anúncio / Conjunto**: the `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` and `utm_term` of the ad link (empty for direct visits).

## Setup (about 5 minutes)

### 1. Create the sheet

1. Go to [sheets.new](https://sheets.new) with the company Google account and name it, e.g. **Eleva Ops – Leads**.
2. *File → Settings → Time zone*: **(GMT+01:00) Lisbon**, so dates are in Portuguese time.

### 2. Add the script

1. In the sheet: *Extensions → Apps Script*.
2. Delete the existing code and paste the script below.
3. Replace `PASTE_THE_SECRET_HERE` with a long random secret. To generate one in PowerShell:
   ```powershell
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
   ```
4. Save (disk icon).

```javascript
// Eleva Ops — receives guide leads from elevaops.com and appends them to the "Leads" tab.
const SECRET = 'PASTE_THE_SECRET_HERE';
const SHEET_NAME = 'Leads';
const HEADERS = ['Data', 'Nome', 'Email', 'Aceita marketing', 'Origem', 'Meio', 'Campanha', 'Anúncio', 'Conjunto de anúncios', 'ID da lead', 'Empresa', 'Telefone'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    if (!data || data.secret !== SECRET) return json({ ok: false, error: 'unauthorized' });

    const sheet = getSheet();
    sheet.appendRow([
      new Date(),
      clean(data.firstName),
      clean(data.email),
      data.marketingConsent === true ? 'Sim' : 'Não',
      clean(data.utm_source),
      clean(data.utm_medium),
      clean(data.utm_campaign),
      clean(data.utm_content),
      clean(data.utm_term),
      clean(data.leadId),
      clean(data.companyName),
      clean(data.phone),
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

// Text values are stored as plain text (a leading = + - @ would otherwise run as a formula).
function clean(value) {
  const text = value === undefined || value === null ? '' : String(value).slice(0, 300);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
```

### 3. Publish the script

1. *Deploy → New deployment* → type **Web app**.
2. *Execute as*: **Me**. *Who has access*: **Anyone** (required so the website can send leads; the secret protects it).
3. *Deploy*, authorise with the company account, and copy the **Web app URL** (ends in `/exec`).

> If you change the script later, use *Deploy → Manage deployments → Edit → New version*, so the URL stays the same.

### 4. Connect the website

In Vercel: *Project → Settings → Environment Variables* (Production), add:

| Name | Value |
|---|---|
| `GOOGLE_SHEETS_WEBHOOK_URL` | the Web app URL from step 3 |
| `GOOGLE_SHEETS_WEBHOOK_SECRET` | the same secret used in the script |

Then *Deployments → Redeploy*. For local tests, put the same two lines in `.env.local`.

### 5. Test

Request the guide once at `https://elevaops.com/ai-agents-guide?utm_source=test&utm_content=check` and confirm that a new row appears with `test` / `check`.

## Privacy

- Only people with **Aceita marketing = Sim** may receive marketing emails.
- Keep the sheet shared only with the people who need it.
- Rows older than **12 months** should be deleted (retention period stated in the Privacy Policy), except people who accepted marketing and haven't unsubscribed.

### Updating an existing script (company and phone columns)

The form now also sends **Empresa** (company) and **Telefone** (phone). If the script was set up
before this change: paste the new code above over the old one, then *Deploy → Manage deployments →
Edit → Version: New version → Deploy* (the web app URL stays the same). In an existing sheet, type
`Empresa` and `Telefone` in the first two empty header cells after `ID da lead`. Until the script is
updated, leads still arrive by email with all fields; the sheet just won't store the two new ones.
