import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Send,
  Phone,
  Mail,
} from 'lucide-react';
import { Profile, Service } from '../../types';
import { mockProfiles } from '../../data/profiles';
import { mockLocations } from '../../data/locations';
import { mockServices } from '../../data/services';
import { useToast } from '../common/Toast';
import { formatCurrency } from '../../utils/formatters';

const inquirySchema = z.object({
  profileId: z.string().min(1, 'Please select a companion profile'),
  city: z.string().min(1, 'Please select a city'),
  area: z.string().optional(),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time slot'),
  duration: z.string().min(1, 'Please select a duration'),
  occasion: z.string().min(1, 'Please select an occasion or service type'),
  contactMethod: z.enum(['whatsapp', 'telegram', 'phone', 'email']),
  clientName: z.string().min(2, 'Name or moniker must be at least 2 characters'),
  contactDetail: z.string().min(5, 'Please provide valid contact information'),
  notes: z.string().max(500, 'Notes must be under 500 characters').optional(),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

export interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProfile?: Profile | null;
  initialService?: Service | null;
}

export function RequestModal({
  isOpen,
  onClose,
  initialProfile,
  initialService,
}: RequestModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      profileId: initialProfile?.id || mockProfiles[0].id,
      city: initialProfile?.city || mockLocations[0].name,
      area: initialProfile?.area || 'Central',
      preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      preferredTime: 'Evening (7:00 PM – 10:00 PM)',
      duration: '4 Hours (Dinner & Evening)',
      occasion: initialService?.name || 'Dinner Date & Companionship',
      contactMethod: 'whatsapp',
      clientName: '',
      contactDetail: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (initialProfile) {
      setValue('profileId', initialProfile.id);
      setValue('city', initialProfile.city || mockLocations[0].name);
      if (initialProfile.area) setValue('area', initialProfile.area);
    }
  }, [initialProfile, setValue]);

  useEffect(() => {
    if (initialService) {
      setValue('occasion', initialService.name);
    }
  }, [initialService, setValue]);

  if (!isOpen) return null;

  const currentProfileId = watch('profileId');
  const selectedProfile = mockProfiles.find((p) => p.id === currentProfileId) || initialProfile || mockProfiles[0];
  const watchedCity = watch('city');
  const watchedDate = watch('preferredDate');
  const watchedTime = watch('preferredTime');
  const watchedDuration = watch('duration');
  const watchedOccasion = watch('occasion');
  const watchedContactMethod = watch('contactMethod');

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) isValid = await trigger('profileId');
    else if (step === 2) isValid = await trigger('city');
    else if (step === 3) isValid = await trigger(['preferredDate', 'preferredTime']);
    else if (step === 4) isValid = await trigger('duration');
    else if (step === 5) isValid = await trigger('occasion');
    else if (step === 6) isValid = await trigger(['contactMethod', 'clientName', 'contactDetail']);
    else if (step === 7) isValid = true;

    if (isValid && step < 7) {
      setStep((prev) => (prev + 1) as any);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as any);
    }
  };

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call & local logging
      console.log('Discreet Inquiry Submitted:', data);
      await new Promise((resolve) => setTimeout(resolve, 600));

      const code = `LUM-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmationCode(code);

      // Save locally to simulate persistence
      try {
        const stored = JSON.parse(localStorage.getItem('lumina_inquiries') || '[]');
        stored.push({ ...data, code, createdAt: new Date().toISOString() });
        localStorage.setItem('lumina_inquiries', JSON.stringify(stored));
      } catch (err) {
        // ignore
      }

      toast({
        title: 'Inquiry Sent Discreetly',
        description: `Reference code ${code}. Your selected companion will review and reply.`,
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'Please check your information and try again.',
        variant: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setConfirmationCode(null);
    setStep(1);
    reset();
    onClose();
  };

  return (
    <div
      id="inquiry-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div
        id="inquiry-modal-container"
        className="w-full max-w-xl rounded-2xl bg-[#11141d] border border-[#262c3e] shadow-2xl text-stone-100 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#202637] flex items-center justify-between bg-[#141824]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif-display font-bold text-stone-50">
                Discreet Companion Inquiry
              </h2>
              <p className="text-[11px] text-amber-400 font-medium tracking-wide">
                Step {confirmationCode ? 'Complete' : `${step} of 7`} • 18+ Private Arrangement
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-[#1f2537] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Progress bar */}
        {!confirmationCode && (
          <div className="w-full bg-[#181d2a] h-1.5">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-400 h-full transition-all duration-300"
              style={{ width: `${(step / 7) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {confirmationCode ? (
            /* Confirmation Screen */
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif-display font-bold text-stone-50">
                  Inquiry Dispatched With Discretion
                </h3>
                <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                  Your arrangement request has been encrypted and confidentially routed to{' '}
                  <span className="text-amber-400 font-semibold">{selectedProfile?.name}</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#161a26] border border-[#272e42] max-w-sm mx-auto text-left space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Reference Token:</span>
                  <span className="text-amber-300 font-mono font-bold">{confirmationCode}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Companion:</span>
                  <span className="text-stone-200 font-semibold">{selectedProfile?.name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Location:</span>
                  <span className="text-stone-200">{watchedCity}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Preferred Date:</span>
                  <span className="text-stone-200">{watchedDate}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-sm shadow-md"
                >
                  Close & Return to Directory
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* STEP 1: Select Profile */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-stone-100">Step 1: Select Companion</h3>
                    <p className="text-xs text-stone-400">
                      Choose the verified independent companion you wish to contact.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-64 overflow-y-auto pr-1">
                    {mockProfiles.map((p) => {
                      const isSelected = currentProfileId === p.id;
                      return (
                        <div
                          key={p.id}
                          onClick={() => setValue('profileId', p.id)}
                          className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-[#1e2333] border-amber-500/70 shadow-sm'
                              : 'bg-[#151824] border-[#252b3c] hover:bg-[#1a1f2e]'
                          }`}
                        >
                          <img
                            src={p.avatar}
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-bold text-stone-100 truncate">
                                {p.name}, {p.age}
                              </h4>
                              {p.verified && (
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-stone-400 truncate">{p.city}</p>
                            <p className="text-xs font-semibold text-amber-300">
                              {formatCurrency(p.priceFrom)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: City / Location */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-stone-100">Step 2: City & Area</h3>
                    <p className="text-xs text-stone-400">
                      Indicate the metropolitan city and neighborhood where you plan to meet.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1.5">
                        Metropolitan City
                      </label>
                      <select
                        {...register('city')}
                        className="w-full bg-[#161a26] border border-[#282f42] rounded-xl px-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                      >
                        {mockLocations.map((loc) => (
                          <option key={loc.id} value={loc.name}>
                            {loc.name} ({loc.state})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1.5">
                        Specific Area / Neighborhood (e.g., South Mumbai, BKC, Connaught Place)
                      </label>
                      <input
                        type="text"
                        {...register('area')}
                        placeholder="e.g. Bandra Kurla Complex or 5-Star Hotel District"
                        className="w-full bg-[#161a26] border border-[#282f42] rounded-xl px-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Date & Time */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-stone-100">Step 3: Preferred Date & Time</h3>
                    <p className="text-xs text-stone-400">
                      Specify the scheduled timing for your private engagement.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1.5">
                        Date of Meeting
                      </label>
                      <input
                        type="date"
                        {...register('preferredDate')}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-[#161a26] border border-[#282f42] rounded-xl px-3.5 py-2.5 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                      />
                      {errors.preferredDate && (
                        <p className="text-xs text-rose-400 mt-1">{errors.preferredDate.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1.5">
                        Preferred Time Slot
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[
                          'Afternoon (1:00 PM – 4:00 PM)',
                          'Evening (6:00 PM – 9:00 PM)',
                          'Late Evening (9:00 PM – Midnight)',
                          'Overnight (10:00 PM – 8:00 AM)',
                        ].map((timeOption) => (
                          <div
                            key={timeOption}
                            onClick={() => setValue('preferredTime', timeOption)}
                            className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                              watchedTime === timeOption
                                ? 'bg-[#1e2333] border-amber-500 text-amber-300 font-semibold'
                                : 'bg-[#161a26] border-[#282f42] text-stone-300 hover:bg-[#1a1f2e]'
                            }`}
                          >
                            {timeOption}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Duration */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-stone-100">Step 4: Duration</h3>
                    <p className="text-xs text-stone-400">
                      Select the duration of the engagement.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { title: '2 Hours', subtitle: 'Brief social or beverage meeting' },
                      { title: '4 Hours', subtitle: 'Dinner date & evening engagement' },
                      { title: 'Overnight (8–10 Hours)', subtitle: 'Extended luxury stay' },
                      { title: 'Weekend / Travel (2+ Days)', subtitle: 'Outstation or resort getaway' },
                    ].map((dur) => (
                      <div
                        key={dur.title}
                        onClick={() => setValue('duration', dur.title)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          watchedDuration === dur.title
                            ? 'bg-[#1e2333] border-amber-500 text-amber-300 shadow-sm'
                            : 'bg-[#161a26] border-[#282f42] text-stone-300 hover:bg-[#1a1f2e]'
                        }`}
                      >
                        <div className="text-sm font-bold">{dur.title}</div>
                        <div className="text-xs text-stone-400 mt-0.5">{dur.subtitle}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 5: Service / Occasion */}
              {step === 5 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-stone-100">Step 5: Service & Occasion</h3>
                    <p className="text-xs text-stone-400">
                      Choose the nature of the meeting or social setting.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { title: 'Dinner Date & Companionship', desc: 'Fine dining & relaxed conversation' },
                      { title: 'VIP & Corporate Event', desc: 'Poised presence for galas or galas' },
                      { title: 'Travel & Vacation Companion', desc: 'Luxury resort or holiday getaway' },
                      { title: 'Private Social Relaxation', desc: 'Intimate, quiet private downtime' },
                    ].map((occ) => (
                      <div
                        key={occ.title}
                        onClick={() => setValue('occasion', occ.title)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          watchedOccasion === occ.title
                            ? 'bg-[#1e2333] border-amber-500 text-amber-300 shadow-sm'
                            : 'bg-[#161a26] border-[#282f42] text-stone-300 hover:bg-[#1a1f2e]'
                        }`}
                      >
                        <div className="text-sm font-bold">{occ.title}</div>
                        <div className="text-xs text-stone-400 mt-0.5">{occ.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 6: Contact Preference */}
              {step === 6 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-stone-100">Step 6: Contact Preference</h3>
                    <p className="text-xs text-stone-400">
                      How should {selectedProfile?.name} or the Concierge confirm details with you?
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'whatsapp', label: 'WhatsApp' },
                      { id: 'telegram', label: 'Telegram' },
                      { id: 'phone', label: 'Phone Call' },
                      { id: 'email', label: 'Email' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setValue('contactMethod', opt.id as any)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                          watchedContactMethod === opt.id
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-[#161a26] border-[#282f42] text-stone-400 hover:text-stone-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">
                        Your Name or Preferred Moniker
                      </label>
                      <input
                        type="text"
                        {...register('clientName')}
                        placeholder="e.g. Mr. R. Malhotra"
                        className="w-full bg-[#161a26] border border-[#282f42] rounded-xl px-3.5 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                      />
                      {errors.clientName && (
                        <p className="text-xs text-rose-400 mt-1">{errors.clientName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">
                        {watchedContactMethod === 'email'
                          ? 'Email Address'
                          : watchedContactMethod === 'telegram'
                          ? 'Telegram Username (@handle)'
                          : 'Phone / WhatsApp Number'}
                      </label>
                      <input
                        type="text"
                        {...register('contactDetail')}
                        placeholder={
                          watchedContactMethod === 'email'
                            ? 'client@example.com'
                            : watchedContactMethod === 'telegram'
                            ? '@discreet_client'
                            : '+91 98765 43210'
                        }
                        className="w-full bg-[#161a26] border border-[#282f42] rounded-xl px-3.5 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                      />
                      {errors.contactDetail && (
                        <p className="text-xs text-rose-400 mt-1">{errors.contactDetail.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 7: Notes & Confirmation */}
              {step === 7 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-stone-100">Step 7: Notes & Review</h3>
                    <p className="text-xs text-stone-400">
                      Add any confidential notes or special dining preferences before submission.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#161a26] border border-[#282f42] space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Companion:</span>
                      <span className="text-amber-300 font-bold">{selectedProfile?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Location:</span>
                      <span className="text-stone-200">{watchedCity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Date & Slot:</span>
                      <span className="text-stone-200">{watchedDate} ({watchedTime})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Duration:</span>
                      <span className="text-stone-200">{watchedDuration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Occasion:</span>
                      <span className="text-stone-200">{watchedOccasion}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Private Notes / Attire / Venue Guidelines (Optional)
                    </label>
                    <textarea
                      rows={3}
                      {...register('notes')}
                      placeholder="e.g. Planning a private corner table at Wasabi by Morimoto; cocktail attire requested."
                      className="w-full bg-[#161a26] border border-[#282f42] rounded-xl px-3.5 py-2 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="text-[11px] text-stone-400 bg-[#161a26] p-2.5 rounded-lg border border-[#242a3a]">
                    🔒 All contact information is encrypted and transmitted directly for verification without third-party exposure.
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="pt-3 border-t border-[#202638] flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="py-2.5 px-4 rounded-xl bg-[#1a1e2b] text-stone-300 hover:text-white border border-[#2c3346] text-xs font-semibold flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 7 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-450 hover:to-amber-550 text-stone-950 text-xs font-bold flex items-center gap-1.5 shadow-lg active:scale-95 transition-all disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <span>Encrypting & Sending…</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Discreet Inquiry</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
