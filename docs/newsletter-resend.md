# Newsletter and welcome emails

Guide delivery and newsletter signup are separate. Opted-in subscribers see a visible cancellation link in both the welcome and PDF delivery emails; people who did not opt in are never added to the newsletter. Only marketingConsent=true registers a Resend Contact and sends a personalised PT/EN welcome, signed by Fredson, with the requested PDF and an unsubscribe link.

## Vercel configuration

Reuse the existing RESEND_API_KEY and verified elevaops.com domain. Contacts registration and cancellation need Contacts access. If the existing key is sending-only, set RESEND_NEWSLETTER_API_KEY to a separate full-access key; email delivery keeps using the existing sending key.

Optional variables:

- RESEND_NEWSLETTER_SEGMENT_ID: an existing newsletter segment. Without it, subscribers are available in Contacts.
- NEWSLETTER_UNSUBSCRIBE_SECRET: a stable random signing secret. Without it, links use the existing newsletter/sending key. Configure a stable secret before the first welcome if API keys will be rotated.

Keep secrets in Vercel variables and ignored .env.local files. Redeploy after changing production variables.

## Behaviour

- Without explicit consent, no contact is created, updated or re-subscribed, and no welcome is sent.
- With consent, create or update the contact and send a welcome. Identical repeat welcomes use Resend idempotency keys, suppressing duplicates for 24 hours. Temporary errors are retried.
- If registration or welcome fails, the PDF stays available and the form displays a warning.
- Unsubscribe GET displays confirmation. A signed POST cancels, including mailbox one-click requests. Resend marks the Contact globally unsubscribed, excluding it from future Broadcasts. Guide lead rows preserve the historical consent captured at submission.
- Google Sheets remains optional when the team notification email works. Update its Apps Script using docs/leads-google-sheets.md to store team size.

## Checks

Run npm test and npm run build. Automated tests mock provider calls. Confirm live delivery with a controlled inbox and Resend delivery events before claiming a live welcome was received.

Provider references:
https://resend.com/docs/api-reference/contacts/create-contact
https://resend.com/docs/dashboard/emails/idempotency-keys
