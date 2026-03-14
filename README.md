# LeanPay

LeanPay is an AI-powered invoice processing and compliance platform. Upload an invoice, and LeanPay automatically validates it against compliance rules, checks for fraud signals, scores vendor risk, and tells you whether to approve or block payment — in seconds.

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
