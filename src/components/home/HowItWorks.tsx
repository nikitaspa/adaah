import React from 'react';
import { Search, MapPin, Clock, Send } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: <Search className="w-5 h-5 text-[#C6922E]" />,
      title: 'Browse Verified Profiles',
      description: 'Explore authenticated photo portfolios, verified adult ages, spoken languages, and personal biographies.',
    },
    {
      number: '02',
      icon: <MapPin className="w-5 h-5 text-[#C6922E]" />,
      title: 'Select Hyderabad Area',
      description: 'Filter by premier localities such as Banjara Hills, Jubilee Hills, Gachibowli, or Hitech City.',
    },
    {
      number: '03',
      icon: <Clock className="w-5 h-5 text-[#C6922E]" />,
      title: 'Review Availability & Rates',
      description: 'Check real-time calendar availability indicators and transparent honorarium guidelines with zero surprises.',
    },
    {
      number: '04',
      icon: <Send className="w-5 h-5 text-[#C6922E]" />,
      title: 'Direct WhatsApp or Call',
      description: 'Connect instantly via direct WhatsApp or phone call for rapid coordination and discreet scheduling.',
    },
  ];

  return (
    <section id="how-it-works-section" className="py-16 md:py-24 bg-[#F8F6F1] border-b border-[#E6E1D8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C6922E]">
            Simple & Private Process
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
            How Adaah Works
          </h2>
          <p className="text-xs sm:text-sm text-[#5F5A52]">
            A discreet 4-step discovery framework designed for absolute privacy, mutual respect, and effortless coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-white border border-[#E6E1D8] shadow-2xs flex flex-col justify-between hover:border-[#C6922E] hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center justify-center">
                  {s.icon}
                </div>
                <span className="font-serif-display text-2xl font-bold text-[#C6922E]/30">
                  {s.number}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-serif-display text-base font-bold text-[#171717]">
                  {s.title}
                </h3>
                <p className="text-xs text-[#5F5A52] leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
