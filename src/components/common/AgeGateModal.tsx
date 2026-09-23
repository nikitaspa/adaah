import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from './Button';

export const AgeGateModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const confirmed = localStorage.getItem('lumina_18_confirmed');
      if (confirmed !== 'true') {
        setIsOpen(true);
      }
    } catch {
      // In case localStorage is blocked in iframe/sandboxed environments
      setIsOpen(false);
    }
  }, []);

  const handleConfirm = () => {
    try {
      localStorage.setItem('lumina_18_confirmed', 'true');
    } catch {
      // ignore
    }
    setIsOpen(false);
  };

  const handleLeave = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isOpen) return null;

  return (
    <div
      id="age-gate-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 sm:p-6 bg-black/90 backdrop-blur-md transition-opacity animate-in fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div
        id="age-gate-card"
        className="w-full max-w-[calc(100vw-1.5rem)] xs:max-w-md sm:max-w-lg rounded-2xl bg-[#12141a] border border-[#2a3042] p-4 xs:p-6 sm:p-8 text-stone-100 shadow-2xl relative overflow-hidden my-auto max-h-[88vh] sm:max-h-none overflow-y-auto"
      >
        {/* Subtle accent top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600" />

        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
          <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-0.5 sm:mb-1 shrink-0">
            <span className="text-base xs:text-lg sm:text-xl font-bold font-serif-display tracking-wider">18+</span>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h2 id="age-gate-title" className="text-xl xs:text-2xl sm:text-3xl font-serif-display font-semibold text-stone-50 leading-tight">
              Age Verification Notice
            </h2>
            <p className="text-amber-400/90 text-[10px] xs:text-xs sm:text-sm font-medium tracking-wide uppercase">
              18+ Only • Private • Verified Profiles
            </p>
          </div>

          <p className="text-xs xs:text-sm sm:text-base text-stone-300 leading-relaxed max-w-md">
            This website is intended strictly for adults aged 18 and over. All featured independent companions are consenting adults aged 18+.
          </p>

          <div className="w-full bg-[#181b24] border border-[#252a38] rounded-xl p-3 xs:p-3.5 text-[11px] xs:text-xs text-stone-400 text-left space-y-1 sm:space-y-1.5">
            <div className="flex items-center space-x-2 text-stone-300 font-medium">
              <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
              <span>Discretion & Compliance Policy</span>
            </div>
            <p className="leading-relaxed">
              By proceeding, you verify under penalty of perjury that you are of legal adult age in your jurisdiction and consent to viewing adult-oriented companionship directory information.
            </p>
          </div>

          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2.5 sm:gap-3 w-full pt-1 sm:pt-2">
            <button
              id="age-gate-confirm-btn"
              type="button"
              onClick={handleConfirm}
              className="w-full min-h-[44px] py-2.5 sm:py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-450 hover:to-amber-550 text-stone-950 font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-amber-500/20 active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-stone-950 shrink-0" />
              <span>I am 18 or older</span>
            </button>

            <button
              id="age-gate-leave-btn"
              type="button"
              onClick={handleLeave}
              className="w-full min-h-[44px] py-2.5 sm:py-3 px-4 rounded-xl bg-[#1c202d] hover:bg-[#252a3a] text-stone-300 hover:text-white border border-[#2d3448] font-medium text-xs sm:text-sm transition-all active:scale-[0.98] flex items-center justify-center space-x-2 cursor-pointer"
            >
              <XCircle className="w-4 h-4 text-stone-400 shrink-0" />
              <span>Leave</span>
            </button>
          </div>

          <p className="text-[10px] sm:text-[11px] text-stone-400 leading-normal">
            We do not collect or store identity documents during this preliminary gate.
          </p>
        </div>
      </div>
    </div>
  );
};
