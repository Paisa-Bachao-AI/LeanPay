'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, TrendingUp, Shield } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-between">
          <div className="font-display text-2xl font-semibold text-foreground">
            CleanPayout
          </div>
          <Link
            href="/upload"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight text-foreground mb-8 text-balance">
          Invoice intelligence meets compliance
        </h1>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Automatically validate invoices, catch compliance issues, and streamline your payment process with AI-powered accuracy and trust.
        </p>
        <Link
          href="/upload"
          className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Start Processing <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-6xl px-6 py-24 border-t border-border">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="flex flex-col">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              Smart Validation
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Automatically validate invoice data, check GSTIN compliance, and identify discrepancies in seconds.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col">
            <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-warning" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              Risk Detection
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Flag suspicious patterns, duplicate invoices, and compliance violations before they become problems.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col">
            <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-info" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              Actionable Insights
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Get detailed reports, vendor analytics, and trends to optimize your payment workflow.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-6 py-24 border-t border-border">
        <div className="bg-secondary/30 rounded-lg p-12 text-center">
          <h2 className="font-display text-4xl font-semibold text-foreground mb-6 text-balance">
            Ready to clean up your invoicing?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Upload your first invoice in seconds. No setup required, no credit card needed.
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Upload Your Invoice <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-24">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center text-sm text-muted-foreground">
          <p>Clean. Validated. Compliant. Invoices.</p>
        </div>
      </footer>
    </div>
  );
}
