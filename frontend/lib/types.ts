export type InvoiceStatus = "pending" | "processing" | "approved" | "blocked" | "disputed";

export interface InvoiceCheck {
  id: string;
  name: string;
  status: "pass" | "fail" | "warning";
  message: string;
}

export interface InvoiceFlag {
  id: string;
  type: "fraud" | "duplicate" | "amount" | "vendor" | "date";
  severity: "low" | "medium" | "high";
  message: string;
}

export interface Invoice {
  id: string;
  vendorId: string;
  vendorName: string;
  amount: number;
  currency: string;
  invoiceDate: string;
  dueDate: string;
  status: InvoiceStatus;
  checks: InvoiceCheck[];
  flags: InvoiceFlag[];
  invoiceNumber: string;
  description: string;
  gstin?: string;
  pan?: string;
  poNumber?: string;
  uploadedAt: string;
  processedAt?: string;
}

export interface Vendor {
  id: string;
  name: string;
  gstin: string;
  pan?: string;
  category: string;
  totalInvoices: number;
  totalAmount: number;
  riskScore: number;
  status: "active" | "flagged" | "suspended";
}

export interface DashboardStats {
  totalProcessed: number;
  totalApproved: number;
  totalBlocked: number;
  approvalRate: number;
  totalAmount: number;
  averageProcessingTime: number;
}

export interface VendorTransaction {
  month: string;
  amount: number;
}
