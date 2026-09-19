import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { mockReviews } from '../../data/reviews';

export function TestimonialsSection() {
  return (
    <section id="client-reviews-section" className="py-16 md:py-24 bg-white border-b border-[#E6E1D8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C6922E]">
            Client Experiences
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
            Refined Companionship Experiences
          </h2>
          <p className="text-xs sm:text-sm text-[#5F5A52]">
            Real feedback from discerning patrons in Hyderabad highlighting punctuality, cultural poise, and memorable social chemistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#F8F6F1] border border-[#E6E1D8] flex flex-col justify-between hover:border-[#C6922E] transition-all shadow-2xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#C6922E] text-xs">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-[11px] text-[#5F5A52] font-mono">{rev.date}</span>
                </div>

                <p className="text-xs text-[#171717] leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E6E1D8] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#171717]">{rev.author}</div>
                  <div className="text-[10px] text-[#C6922E] font-medium">{rev.serviceUsed}</div>
                </div>
                {rev.verifiedBooking && (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] text-[#171717] bg-white border border-[#E6E1D8] px-2 py-0.5 rounded-full font-medium"
                    title="Verified Booking"
                  >
                    <ShieldCheck className="w-3 h-3 text-[#C6922E]" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
