import React from 'react';
import { ShieldCheck, Lock, Send, Sparkles } from 'lucide-react';

export function TrustIndicators() {
  const valueProps = [
    {
      icon: <ShieldCheck className="h-5 w-5 text-[#C6922E]" />,
      title: '18+ Verified Profiles',
      description: 'Strict age validation and authentic profile curation for complete peace of mind.',
    },
    {
      icon: <Lock className="h-5 w-5 text-[#C6922E]" />,
      title: 'Discreet & Confidential',
      description: 'Zero exposure of client identity; private communications protected at all times.',
    },
    {
      icon: <Send className="h-5 w-5 text-[#C6922E]" />,
      title: 'Direct Inquiries',
      description: 'Instant direct WhatsApp and phone contact without middleman delays.',
    },
    {
      icon: <Sparkles className="h-5 w-5 text-[#C6922E]" />,
      title: 'Hyderabad Focus',
      description: 'Handpicked companions across Banjara Hills, Jubilee Hills, Hitech City, and more.',
    },
  ];

  return (
    <section id="trust-value-proposition" className="py-10 bg-[#F8F6F1] border-b border-[#E6E1D8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {valueProps.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#E6E1D8] flex flex-col justify-between hover:border-[#C6922E] transition-colors shadow-2xs"
            >
              <div className="w-11 h-11 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-display text-base font-bold text-[#171717]">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5F5A52] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
