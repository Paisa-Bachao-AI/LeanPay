# LeanPay

LeanPay is an AI-powered invoice processing and compliance platform. Upload an invoice, and LeanPay automatically validates it against compliance rules, checks for fraud signals, scores vendor risk, and tells you whether to approve or block payment — in seconds.
<img width="1870" height="999" alt="Image" src="https://github.com/user-attachments/assets/b3f3ee6f-2452-4133-8151-13f1aa845b1c" />

<img width="1787" height="936" alt="Image" src="https://github.com/user-attachments/assets/e4333461-b2aa-43a4-942d-42ec1d6329d4" />

<img width="1079" height="913" alt="Image" src="https://github.com/user-attachments/assets/0f672c38-5d0a-43d4-afe8-fbff99732002" />

<img width="763" height="943" alt="Image" src="https://github.com/user-attachments/assets/a063b16b-d4ed-4f87-a8cc-e323693fec4a" />

<img width="1886" height="987" alt="Image" src="https://github.com/user-attachments/assets/6a758af5-2781-4cee-83fe-57269de472ed" />

<img width="1885" height="941" alt="Image" src="https://github.com/user-attachments/assets/3e8d59e7-ea8f-4084-bdfc-693f0cc79be7" />

---

## What it does

Most finance teams review invoices manually. That means checking GSTIN numbers, cross-referencing vendor records, spotting duplicates, and catching amount mismatches by hand. LeanPay automates that entire process.

You upload an invoice. LeanPay runs a set of structured checks on it. You get a clear approved or blocked result with a full breakdown of what passed, what failed, and why.

---

## Core capabilities

**Invoice validation**
Each uploaded invoice goes through a pipeline of automated checks — GSTIN and PAN verification, PO number matching, date validation, and amount consistency. Every check produces a pass, fail, or warning result with a human-readable explanation.

**Fraud and risk detection**
LeanPay flags duplicate invoices, unusual amount patterns, mismatched vendor details, and other signals that indicate potential fraud or manipulation — before payment goes out.

**Vendor risk scoring**
Every vendor has a risk score derived from their invoice history, flag count, and compliance record. The vendor ledger gives you a full view of who you're paying and how trustworthy that relationship is.

**Invoice queue**
Manage batches of invoices with filtering by status, vendor, and date. Track what's pending, processing, approved, disputed, or blocked in one view.

**Reports and analytics**
Monthly payment trends, approval rates, top vendors by volume, and invoice status breakdowns — presented as charts and tables you can act on.

---

## Pages

| Route | What you'll find |
|---|---|
| `/` | Landing page |
| `/upload` | Upload a new invoice |
| `/processing` | Live processing progress for an uploaded invoice |
| `/queue` | Full invoice queue with filtering |
| `/dashboard` | Stats overview and recent invoice activity |
| `/vendors` | Vendor ledger with risk profiles |
| `/reports` | Payment analytics and monthly trends |
| `/results/approved` | Approved invoice result with check breakdown |
| `/results/blocked` | Blocked invoice result with flag details |

---

## Tech stack

**Frontend**
- Next.js 16 with App Router and TypeScript
- Tailwind CSS v4 for styling
- Radix UI for accessible component primitives
- Recharts for data visualisation
- Three.js for the landing page 3D animation

**Backend**
- In progress

---

## Running locally

Requires Node.js 18 or higher.

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

---

## Data model

The core types that flow through the system:

**Invoice** — the primary entity. Contains vendor info, amount, dates, compliance identifiers (GSTIN, PAN, PO number), and a list of checks and flags produced by the processing pipeline.

**InvoiceCheck** — a single validation rule result. Has a name, a status (`pass` / `fail` / `warning`), and a message explaining the outcome.

**InvoiceFlag** — a risk signal attached to an invoice. Typed by category (`fraud`, `duplicate`, `amount`, `vendor`, `date`) and severity (`low`, `medium`, `high`).

**Vendor** — a supplier record with GSTIN, PAN, transaction history, risk score, and status (`active`, `flagged`, `suspended`).

---

## Status

Frontend is complete with mock data. Backend integration is in progress.
