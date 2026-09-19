import React from 'react';
import { Lock, ShieldCheck, EyeOff } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';

export interface PrivacyPageViewProps {
  onNavigate: (href: string) => void;
}

export function PrivacyPageView({ onNavigate }: PrivacyPageViewProps) {
  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} onNavigate={onNavigate} />

        <div className="space-y-3 pb-6 border-b border-[#E6E1D8]">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
            <Lock className="w-4 h-4" />
            <span>Confidentiality & Privacy</span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#5F5A52]">
            Last updated: September 2026 • Dedicated to safeguarding client and companion discretion.
          </p>
        </div>

        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#E6E1D8] space-y-6 text-xs sm:text-sm text-[#5F5A52] leading-relaxed shadow-2xs">
          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-[#171717]">
              1. Our Discretion Commitment
            </h2>
            <p>
              Adaah is designed from the ground up for high discretion. We do not sell, rent, monetize, or disclose personal inquiry information to third-party advertisers, data brokers, or marketing networks.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-[#171717]">
              2. Information Collected During Inquiries
            </h2>
            <p>
              When submitting a confidential inquiry or booking request, we collect only the information you voluntarily submit (such as preferred alias, contact messenger handle or email, requested date, and location in Hyderabad). This information is transmitted solely to the requested companion or our concierge team to fulfill your inquiry.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-[#171717]">
              3. Age Confirmation State
            </h2>
            <p>
              We store a minimal local session flag confirming you have accepted the 18+ legal advisory notice so you are not repeatedly prompted during your continuous browsing session.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-display text-lg font-bold text-[#171717]">
              4. Data Deletion
            </h2>
            <p>
              You may request immediate purging of any past concierge communication records at any time by contacting our confidential concierge desk.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
