import React from 'react';
import { ShieldCheck, Lock, AlertOctagon, UserCheck, EyeOff, FileText, CheckCircle2, PhoneCall } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';

export interface SafetyPageViewProps {
  onNavigate: (href: string) => void;
  onContactSupport: () => void;
}

export function SafetyPageView({ onNavigate, onContactSupport }: SafetyPageViewProps) {
  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={[{ label: 'Safety & Discretion Protocols' }]} onNavigate={onNavigate} />

        {/* Page Header */}
        <div className="space-y-3 pb-6 border-b border-[#E6E1D8]">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
            <ShieldCheck className="w-4 h-4" />
            <span>Integrity & Security</span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] tracking-tight">
            Trust, Privacy & Safety Guidelines
          </h1>
          <p className="text-xs sm:text-sm text-[#5F5A52] max-w-2xl leading-relaxed">
            Adaah operates under strict 18+ legal compliance benchmarks to safeguard personal discretion, mutual consent, and dignified adult companionship arrangements.
          </p>
        </div>

        {/* Pillar 1: 18+ Verification */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E1D8] space-y-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center justify-center">
              <span className="font-bold text-[#C6922E] text-xs">18+</span>
            </div>
            <h2 className="font-serif-display text-xl font-bold text-[#171717]">
              Rigorous 18+ Verification Standards
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5F5A52] leading-relaxed">
            Every profile on Adaah must complete an identity confirmation process utilizing authentic government-issued photo identification. We verify full legal adulthood (18 years or older) and validate photographic authenticity before any listing is published. We strictly forbid minors from browsing or listing on our platform.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[#171717] font-medium">Government ID Confirmed</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[#171717] font-medium">Real Photo Validation</span>
            </div>
            <div className="p-3 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[#171717] font-medium">Independent Direct Sign-off</span>
            </div>
          </div>
        </section>

        {/* Pillar 2: Client Privacy & Discretion */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E1D8] space-y-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#C6922E]" />
            </div>
            <h2 className="font-serif-display text-xl font-bold text-[#171717]">
              Absolute Discretion & Information Privacy
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5F5A52] leading-relaxed">
            We understand that discretion is paramount. Adaah does not sell, rent, or publicly display patron contact details. Inquiries submitted through our forms are relayed solely and privately to your selected companion. We do not store sensitive payment details or retain tracking records beyond essential session cookies.
          </p>
        </section>

        {/* Pillar 3: Respect & Consent Protocols */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E1D8] space-y-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-[#C6922E]" />
            </div>
            <h2 className="font-serif-display text-xl font-bold text-[#171717]">
              Mutual Consent & Boundary Respect
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5F5A52] leading-relaxed">
            All companions are fully autonomous, independent adults who set their own hours, rates, and comfort boundaries. Respect for personal comfort, impeccable hygiene, and adherence to confirmed arrangements are mandatory requirements for both patrons and companions. Any party retains the absolute right to decline or conclude an engagement if boundaries or mutual respect are breached.
          </p>
        </section>

        {/* Pillar 4: Zero Tolerance for Exploitation */}
        <section className="p-6 sm:p-8 rounded-3xl bg-rose-50 border border-rose-200 space-y-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center">
              <AlertOctagon className="w-5 h-5 text-rose-600" />
            </div>
            <h2 className="font-serif-display text-xl font-bold text-rose-900">
              Zero Tolerance for Human Exploitation
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-rose-800 leading-relaxed">
            Adaah enforces a strict, unconditional zero-tolerance policy against human trafficking, coercion, underage involvement, or non-consensual activity. Any individual attempting to facilitate or engage in unlawful exploitation will be permanently banned from the directory and reported directly to competent law enforcement agencies.
          </p>
        </section>

        {/* Contact Concierge for assistance */}
        <div className="p-6 rounded-2xl bg-white border border-[#E6E1D8] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif-display text-base font-bold text-[#171717]">
              Need to report an issue or request assistance?
            </h3>
            <p className="text-xs text-[#5F5A52]">
              Our safety review desk reviews all confidential inquiries promptly.
            </p>
          </div>

          <button
            type="button"
            onClick={onContactSupport}
            className="px-5 py-2.5 rounded-xl bg-[#C6922E] hover:bg-[#A8751F] text-white font-bold text-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer shrink-0 shadow-2xs"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Contact Safety Desk</span>
          </button>
        </div>
      </div>
    </div>
  );
}
