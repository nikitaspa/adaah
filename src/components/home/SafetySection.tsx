import React from 'react';
import { ShieldCheck, Lock, UserCheck, EyeOff, AlertOctagon } from 'lucide-react';

export function SafetySection() {
  const safetyPillars = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#C6922E]" />,
      title: 'Strict 18+ Verification Compliance',
      description:
        'All profiles undergo rigorous age verification via government-issued photo ID prior to listing. We strictly prohibit minors on our platform.',
    },
    {
      icon: <UserCheck className="w-5 h-5 text-[#C6922E]" />,
      title: 'Consensual Independent Arrangements',
      description:
        'All companions featured on Adaah operate as self-managed, independent adults who determine their own schedules, rates, and boundaries.',
    },
    {
      icon: <EyeOff className="w-5 h-5 text-[#C6922E]" />,
      title: 'Comprehensive Privacy Protection',
      description:
        'We never sell or distribute client communication details. Inquiries are handled discreetly and shared solely with your selected companion.',
    },
    {
      icon: <Lock className="w-5 h-5 text-[#C6922E]" />,
      title: 'Discretion & Mutual Respect Guidelines',
      description:
        'Both clients and companions are held to the highest standards of decorum, punctuality, hygiene, and strict boundary honoring.',
    },
    {
      icon: <AlertOctagon className="w-5 h-5 text-[#A8751F]" />,
      title: 'Zero Tolerance for Exploitation',
      description:
        'We enforce zero tolerance for human trafficking, coercion, non-consensual behavior, or unlawful activity. Violations result in permanent banning and legal referral.',
    },
  ];

  return (
    <section id="safety-discretion-section" className="py-16 md:py-24 bg-[#F8F6F1] border-b border-[#E6E1D8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C6922E]">
            Trust, Privacy & Discretion
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
            Our Commitment to Safety & Ethics
          </h2>
          <p className="text-xs sm:text-sm text-[#5F5A52] leading-relaxed">
            Adaah maintains strict verification benchmarks to cultivate a secure, dignified, and mutually respectful directory environment in Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E6E1D8] space-y-3 hover:border-[#C6922E] transition-all shadow-2xs"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="font-serif-display text-base font-bold text-[#171717]">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#5F5A52] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
