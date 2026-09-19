import React, { useState } from 'react';
import { Mail, PhoneCall, ShieldCheck, Lock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';
import { useToast } from '../common/Toast';

export interface ContactPageViewProps {
  onNavigate: (href: string) => void;
}

export function ContactPageView({ onNavigate }: ContactPageViewProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    messenger: '',
    city: 'Mumbai',
    subject: 'General Inquiry',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || (!formData.email && !formData.messenger)) {
      toast({
        type: 'error',
        title: 'Missing Contact Method',
        message: 'Please provide either an email address or secure messenger handle.',
      });
      return;
    }

    setSubmitted(true);
    toast({
      type: 'success',
      title: 'Inquiry Submitted',
      message: 'Your inquiry has been relayed to our private concierge desk.',
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#171717] py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={[{ label: 'Concierge Desk & Contact' }]} onNavigate={onNavigate} />

        <div className="space-y-3 pb-6 border-b border-[#E6E1D8]">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C6922E]">
            <PhoneCall className="w-4 h-4" />
            <span>Private Concierge Desk</span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#171717] tracking-tight">
            Confidential Inquiries & Support
          </h1>
          <p className="text-xs sm:text-sm text-[#5F5A52] max-w-2xl leading-relaxed">
            Our discreet concierge desk assists with custom booking requests, advertising inquiries for independent companions, and platform safety questions in Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="p-8 rounded-3xl bg-white border border-[#E6E1D8] text-center space-y-4 shadow-2xs">
                <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="font-serif-display text-xl font-bold text-[#171717]">
                  Inquiry Received Discreetly
                </h2>
                <p className="text-xs text-[#5F5A52] max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.name}. Our private desk has received your note and will reply via your preferred contact channel within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      messenger: '',
                      city: 'Hyderabad',
                      subject: 'General Inquiry',
                      message: '',
                    });
                  }}
                  className="px-5 py-2 rounded-xl bg-[#F8F6F1] border border-[#E6E1D8] text-xs text-[#171717] font-semibold hover:bg-[#F3F0E9] cursor-pointer"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E6E1D8] space-y-4 shadow-2xs">
                <h2 className="font-serif-display text-lg font-bold text-[#171717]">
                  Send a Confidential Message
                </h2>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#171717] block">
                    Your Name or Preferred Alias *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Mr. Sharma / Private Client"
                    className="w-full h-10 rounded-xl border border-[#E6E1D8] bg-[#F8F6F1] px-3 text-xs text-[#171717] focus:outline-none focus:border-[#C6922E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#171717] block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="client@private.com"
                      className="w-full h-10 rounded-xl border border-[#E6E1D8] bg-[#F8F6F1] px-3 text-xs text-[#171717] focus:outline-none focus:border-[#C6922E]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#171717] block">
                      Telegram / WhatsApp Handle
                    </label>
                    <input
                      type="text"
                      value={formData.messenger}
                      onChange={(e) => setFormData({ ...formData, messenger: e.target.value })}
                      placeholder="@username or +91 89..."
                      className="w-full h-10 rounded-xl border border-[#E6E1D8] bg-[#F8F6F1] px-3 text-xs text-[#171717] focus:outline-none focus:border-[#C6922E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#171717] block">
                      Location in Hyderabad
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-10 rounded-xl border border-[#E6E1D8] bg-[#F8F6F1] px-3 text-xs text-[#171717] focus:outline-none focus:border-[#C6922E]"
                    >
                      <option value="Banjara Hills">Banjara Hills</option>
                      <option value="Jubilee Hills">Jubilee Hills</option>
                      <option value="Gachibowli">Gachibowli</option>
                      <option value="Hitech City">Hitech City</option>
                      <option value="Madhapur">Madhapur</option>
                      <option value="Kondapur">Kondapur</option>
                      <option value="Begumpet">Begumpet</option>
                      <option value="Secunderabad">Secunderabad</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#171717] block">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-10 rounded-xl border border-[#E6E1D8] bg-[#F8F6F1] px-3 text-xs text-[#171717] focus:outline-none focus:border-[#C6922E]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Companion Listing / Verification">Companion Listing / Verification</option>
                      <option value="VIP Multi-Day Itinerary">VIP Multi-Day Itinerary</option>
                      <option value="Privacy & Safety Question">Privacy & Safety Question</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#171717] block">
                    Message Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your schedule, requested companion profile, or questions..."
                    className="w-full rounded-xl border border-[#E6E1D8] bg-[#F8F6F1] p-3 text-xs text-[#171717] focus:outline-none focus:border-[#C6922E]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#C6922E] hover:bg-[#A8751F] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Discreet Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Sidebar Specs */}
          <aside className="space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E6E1D8] space-y-4 shadow-2xs">
              <h3 className="font-serif-display text-base font-bold text-[#171717]">
                Concierge Desk Hours
              </h3>
              <div className="space-y-2 text-xs text-[#5F5A52]">
                <div className="flex justify-between pb-1 border-b border-[#E6E1D8]">
                  <span>Mon – Sun:</span>
                  <span className="text-[#171717] font-bold">10:00 AM – 2:00 AM IST</span>
                </div>
                <div className="flex justify-between pb-1 border-b border-[#E6E1D8]">
                  <span>Avg. Response:</span>
                  <span className="text-emerald-600 font-bold">Under 90 Minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Direct Hotline:</span>
                  <span className="text-[#171717] font-semibold">+91 89993 84340</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E6E1D8] space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-[#C6922E] font-bold text-xs">
                <Lock className="w-4 h-4" />
                <span>Confidentiality Guarantee</span>
              </div>
              <p className="text-xs text-[#5F5A52] leading-relaxed">
                Communications transmitted through our concierge desk are handled with strict privacy protocols. No marketing newsletters or tracking pixels are ever sent.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
