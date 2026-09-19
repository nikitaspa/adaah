import React from 'react';
import { Sparkles, ShieldCheck, Compass, HeartHandshake, Eye, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';

export interface AboutPageViewProps {
  onNavigate: (href: string) => void;
}

export function AboutPageView({ onNavigate }: AboutPageViewProps) {
  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs items={[{ label: 'About Adaah' }]} onNavigate={onNavigate} />

        {/* Hero Header */}
        <div className="space-y-4 pb-6 border-b border-[#E6E1D8]">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Directory Marketplace</span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] tracking-tight">
            Elevating Discretion & Companionship
          </h1>
          <p className="text-sm sm:text-base text-[#5F5A52] max-w-2xl leading-relaxed">
            Adaah was founded to offer a dignified, secure, and aesthetically refined alternative for discerning adults seeking verified independent companionship in Hyderabad.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-xs sm:text-sm text-[#5F5A52] leading-relaxed">
            <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#171717]">
              A Private Sanctuary for Consensual Adult Discovery
            </h2>
            <p>
              In a marketplace historically fraught with misleading classifieds and unverified listings, Adaah establishes a new benchmark of elegance, transparency, and authenticated identity.
            </p>
            <p>
              We celebrate independence. Every companion featured on our platform is a self-directed, autonomous professional who exercises full sovereignty over their calendar, boundaries, and honorarium guidelines.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E6E1D8] space-y-4 shadow-2xs">
            <div className="text-xs font-bold uppercase tracking-wider text-[#C6922E]">
              Core Principles
            </div>
            <div className="space-y-3 text-xs text-[#5F5A52]">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong className="text-[#171717]">18+ Age Validation:</strong> Strict document check for legal adulthood.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Eye className="w-4 h-4 text-[#C6922E] shrink-0 mt-0.5" />
                <span><strong className="text-[#171717]">Complete Discretion:</strong> Total safeguarding of patron privacy.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-[#C6922E] shrink-0 mt-0.5" />
                <span><strong className="text-[#171717]">Hyderabad Coverage:</strong> Premier hubs in Banjara Hills, Jubilee Hills, Hitech City, and Gachibowli.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <HeartHandshake className="w-4 h-4 text-[#C6922E] shrink-0 mt-0.5" />
                <span><strong className="text-[#171717]">Direct Inquiries:</strong> Direct WhatsApp & phone communication without commissions.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Non-Agency Disclosure */}
        <div className="p-6 rounded-2xl bg-white border border-[#E6E1D8] text-xs text-[#5F5A52] space-y-2 shadow-2xs">
          <div className="font-bold text-[#171717]">Legal & Operational Classification:</div>
          <p className="leading-relaxed">
            Adaah functions purely as an advertising technology platform and informational catalog. We are not an employer, agency, escort bureau, or financial intermediary. All rates, engagements, and services are private, independent agreements between consenting adults aged 18 and older.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={() => onNavigate('/profiles')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6922E] hover:bg-[#A8751F] text-white font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <span>Explore Verified Companions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
