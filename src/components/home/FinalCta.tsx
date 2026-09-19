import React from 'react';
import { Compass, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/site';

export interface FinalCtaProps {
  onBrowseDirectory: () => void;
  onContactConcierge: () => void;
}

export function FinalCta({ onBrowseDirectory, onContactConcierge }: FinalCtaProps) {
  const whatsappUrl = `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(siteConfig.contact.defaultWhatsAppMessage)}`;
  const phoneTel = `tel:${siteConfig.contact.phoneRaw}`;

  return (
    <section id="final-cta-section" className="py-20 md:py-28 bg-[#F8F6F1] border-b border-[#E6E1D8] relative overflow-hidden">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E6E1D8] text-[11px] font-bold text-[#C6922E] uppercase tracking-widest shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C6922E]" />
          <span>Hyderabad Discreet Introductions</span>
        </div>

        <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] tracking-tight leading-tight">
          Find an Independent Companion in Hyderabad
        </h2>

        <p className="text-sm sm:text-base text-[#5F5A52] max-w-xl mx-auto leading-relaxed">
          Browse verified 18+ adult profiles across Banjara Hills, Jubilee Hills, Hitech City, and Gachibowli with complete confidentiality.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-lg mx-auto">
          {/* Browse Directory */}
          <button
            type="button"
            onClick={onBrowseDirectory}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#C6922E] hover:bg-[#A8751F] text-[#171717] font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#171717]" />
            <span>Browse Directory</span>
          </button>

          {/* WhatsApp Direct */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-sm shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-white" />
            <span>WhatsApp Now</span>
          </a>

          {/* Call Direct */}
          <a
            href={phoneTel}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-[#F3F0E9] text-[#171717] border border-[#E6E1D8] font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-2xs"
          >
            <Phone className="w-4 h-4 text-[#C6922E]" />
            <span>Call Concierge</span>
          </a>
        </div>

        <p className="text-[11px] text-[#5F5A52] pt-2">
          Strictly 18+ adults only. Phone: {siteConfig.contact.phoneFormatted} • Confidentiality unconditionally guaranteed.
        </p>
      </div>
    </section>
  );
}
