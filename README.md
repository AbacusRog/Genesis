# Genesis Incorporated — Invoices

A small login-gated app for creating, saving, searching, and PDF-exporting
Genesis Incorporated sales invoices, matching the existing `GI/xxxx` template.

Built with React + Vite, using the same Supabase project as the timesheet
app and client onboarding form ("carglass wages"), deployed via Cloudflare
Pages.

## 1. Set up the database table

In the Supabase dashboard for the shared project, open the **SQL editor**
and run everything in `supabase-schema.sql`. This creates an `invoices`
table and locks it down so only signed-in users can read or write rows.

## 2. Add your Supabase anon key

Open `src/supabaseClient.js` and replace `PASTE_YOUR_ANON_KEY_HERE` with
the project's anon/public key (Project Settings → API in Supabase — the
same key used by the other apps on this project, safe to use in frontend
code).

## 3. Create a login for the office

In Supabase, go to **Authentication → Users → Add user** and create an
email/password login for whoever needs access (same process as the other
login-gated apps). Add more users the same way as needed.

## 4. Deploy

Same process as your other apps:

1. Create a new GitHub repo (e.g. `genesis-invoices`) and upload these
   files (GitHub's "Add file → Upload files" works fine, or `git push`
   if you're using Claude Code).
2. In Cloudflare Pages, create a new project connected to that repo.
   - Build command: `npm run build`
   - Build output directory: `dist`
3. Once deployed, point a subdomain at it the same way as the others
   (e.g. `invoices.abacusapps.us`).

## Using the app

- **New invoice** — fills in the next `GI/` number automatically, based
  on the highest number already saved.
- **Search** — on the invoices list, search by invoice number (with or
  without `GI/`), customer name, or site address. Typing a full number
  and pressing Enter jumps straight to that invoice.
- **PDF** — the PDF button (on a list row, or inside an invoice) opens
  the print-formatted invoice and triggers your browser's print dialog.
  Choose **Save as PDF** as the destination.
- **Export to Xero** — visible only when signed in as
  `roger@abacusconsultancy.co.uk`. Filter by invoice number range or date
  range, tick which invoices to include, adjust the sales account code
  and tax type names if needed, then download a CSV in Xero's sales
  invoice import format (mapped from `SalesInvoiceTemplateXero.csv`).
  Double-check the tax type names match your Xero organisation's tax
  rates exactly before importing.
- **Sign out** — top-right of the header.

## Notes

- Xero draft-invoice integration was intentionally left out of this build
  — see the invoice-app notes if you want to revisit that later.
- All invoice data lives in the `invoices` table as a JSON blob per row
  plus an indexed `invoice_number` column for fast search.
