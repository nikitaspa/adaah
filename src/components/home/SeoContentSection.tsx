import React from 'react';
import { Shield, Compass } from 'lucide-react';

export function SeoContentSection() {
  return (
    <section id="seo-editorial-content" className="py-16 md:py-20 bg-white border-b border-[#E6E1D8] text-[#5F5A52] text-xs sm:text-sm leading-relaxed">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8 bg-[#F8F6F1] p-6 sm:p-10 rounded-2xl border border-[#E6E1D8]">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C6922E]">
              Hyderabad Directory Overview & Informational Guidelines
            </span>
            <h2 className="font-serif-display text-xl sm:text-2xl md:text-3xl font-bold text-[#171717]">
              Navigating Hyderabad’s Premier 18+ Adult Companion Directory
            </h2>
            <p className="text-[#5F5A52] text-xs sm:text-sm">
              Adaah operates as an independent discovery and introduction platform engineered for privacy, dignified adult arrangements, and high-caliber social companionship in Hyderabad, Telangana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[#E6E1D8]">
            <div className="space-y-2">
              <h3 className="font-serif-display text-base font-bold text-[#171717] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C6922E]" />
                <span>Hyderabad Metropolitan Coverage</span>
              </h3>
              <p className="text-[#5F5A52] text-xs leading-relaxed">
                Our directory features verified profiles residing in premier Hyderabad hubs including Banjara Hills, Jubilee Hills, Hitech City, Gachibowli, Madhapur, Kondapur, Begumpet, and Secunderabad. Whether you are hosting an executive business dinner in Hitech City or planning a luxury dinner in Banjara Hills, our directory connects you with local independent talent.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-display text-base font-bold text-[#171717] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#C6922E]" />
                <span>How to Browse & Inquire Safely</span>
              </h3>
              <p className="text-[#5F5A52] text-xs leading-relaxed">
                Prioritize companions with the 18+ Verified badge, indicating verified photo identity and age confirmation. Connect directly via WhatsApp or phone call to communicate your scheduled date, venue, and preferred duration. We recommend meeting in reputable public settings such as hotel lounges or fine dining restaurants for initial introductions.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#E6E1D8] text-xs text-[#5F5A52] space-y-1">
            <div className="font-bold text-[#171717]">Legal & Independent Agency Disclosure:</div>
            <p>
              Adaah is strictly an advertising and informational medium for independent adult companions aged 18 and over in Hyderabad. We do not act as an employer, agency, or broker. All rates and arrangements are consensual transactions negotiated directly and privately between independent consenting adults.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
