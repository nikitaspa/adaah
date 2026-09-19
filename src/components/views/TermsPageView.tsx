import React from 'react';
import { FileText, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';

export interface TermsPageViewProps {
  onNavigate: (href: string) => void;
}

export function TermsPageView({ onNavigate }: TermsPageViewProps) {
  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Terms of Service' }]} onNavigate={onNavigate} />

        <div className="space-y-3 pb-6 border-b border-[#E6E1D8]">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
            <FileText className="w-4 h-4" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-[#5F5A52]">
            Last updated: September 2026 • Governing use of Adaah directory and inquiry services in Hyderabad.
          </p>
        </div>

        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E6E1D8] space-y-6 text-xs sm:text-sm text-[#5F5A52] leading-relaxed shadow-2xs">
          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-[#171717]">
              1. 18+ Mandatory Age Requirement
            </h2>
            <p>
              By accessing or utilizing Adaah (&ldquo;the Platform&rdquo;), you certify that you are at least eighteen (18) years of age (or the legal age of majority in your jurisdiction). Individuals under 18 years of age are strictly prohibited from accessing, viewing, or submitting inquiries on this platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-[#171717]">
              2. Independent Directory Platform Status
            </h2>
            <p>
              Adaah serves strictly as an advertising and discovery directory for independent adult companions. Adaah does not employ, manage, or act as an agent or broker for any person listed. Companions operate autonomously and set their own guidelines, rates, and availability.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-[#171717]">
              3. Mutual Consent & Boundary Respect
            </h2>
            <p>
              All interactions between patrons and companions must be rooted in mutual consent, mutual respect, and explicit personal boundaries. Harassment, coercion, unlawful solicitations, or abusive behavior will result in immediate termination of platform access.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-[#171717]">
              4. Zero Tolerance for Exploitation
            </h2>
            <p>
              The Platform enforces an absolute zero-tolerance policy regarding human trafficking, non-consensual exploitation, or unlawful coercion. Any evidence of exploitation will be referred to relevant authorities immediately.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-[#171717]">
              5. Limitation of Liability
            </h2>
            <p>
              Adaah disclaims all liability for agreements, conduct, or disputes arising outside of this informational directory. Patrons and companions assume full personal responsibility for confirming terms, personal safety, and adhering to applicable local laws.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
