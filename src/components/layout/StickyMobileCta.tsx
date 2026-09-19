import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/site';

interface StickyMobileCtaProps {
  onBrowse?: () => void;
  onOpenInquiry?: () => void;
}

export const StickyMobileCta: React.FC<StickyMobileCtaProps> = () => {
  const whatsappUrl = `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(siteConfig.contact.defaultWhatsAppMessage)}`;
  const phoneTel = `tel:${siteConfig.contact.phoneRaw}`;

  return (
    <>
      {/* Mobile Sticky Bottom Contact Bar (Visible ONLY on mobile / small screens) */}
      <aside
        id="sticky-mobile-contact-bar"
        aria-label="Quick contact actions"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/98 backdrop-blur-md border-t border-[#E6E1D8] px-4 py-2.5 shadow-lg safe-area-pb"
      >
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          {/* WhatsApp Action */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs tracking-wide shadow-xs active:scale-98 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-white shrink-0" />
            <span>WhatsApp</span>
          </a>

          {/* Call Now Action */}
          <a
            href={phoneTel}
            className="flex-1 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-[#C6922E] hover:bg-[#A8751F] text-[#171717] font-bold text-xs tracking-wide shadow-xs active:scale-98 transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4 text-[#171717] shrink-0" />
            <span>Call Now</span>
          </a>
        </div>
      </aside>

      {/* Desktop Floating WhatsApp Button (Visible ONLY on desktop / md+ screens) */}
      <aside
        id="desktop-floating-whatsapp"
        aria-label="Direct WhatsApp Concierge"
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center group"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          title="Chat with Hyderabad Concierge on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white text-white" />
          <span className="font-semibold pr-0.5">WhatsApp Concierge</span>
        </a>
      </aside>
    </>
  );
};
