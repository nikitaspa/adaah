import React from 'react';
import { ShieldCheck, Lock, AlertTriangle, Phone, MessageCircle, MapPin } from 'lucide-react';
import { siteConfig } from '../../config/site';

export interface FooterProps {
  onNavigate?: (href: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate?.(href);
  };

  const hyderabadAreas = [
    { name: 'Banjara Hills', slug: 'banjara-hills' },
    { name: 'Jubilee Hills', slug: 'jubilee-hills' },
    { name: 'Gachibowli', slug: 'gachibowli' },
    { name: 'Hitech City', slug: 'hitech-city' },
    { name: 'Madhapur', slug: 'madhapur' },
    { name: 'Kondapur', slug: 'kondapur' },
    { name: 'Begumpet', slug: 'begumpet' },
    { name: 'Secunderabad', slug: 'secunderabad' },
  ];

  return (
    <footer id="main-site-footer" className="bg-[#F3F0E9] text-[#171717] border-t border-[#E6E1D8] pt-14 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-[#E6E1D8]">
          {/* Brand & About Column */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-[#C6922E]/40 text-[#171717] shadow-2xs">
                <span className="font-serif-display font-bold text-lg text-[#C6922E]">A</span>
              </div>
              <span className="font-serif-display text-xl font-bold text-[#171717] tracking-tight group-hover:text-[#C6922E] transition-colors">
                {siteConfig.name}
              </span>
            </a>
            <p className="text-xs text-[#5F5A52] leading-relaxed max-w-sm">
              Hyderabad&apos;s premier independent adult companionship directory. Connecting discerning clients with verified adult companions across leading neighborhoods with absolute privacy, discretion, and mutual respect.
            </p>

            {/* Direct Contact Info */}
            <div className="pt-2 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#171717]">
                <Phone className="w-3.5 h-3.5 text-[#C6922E]" />
                <span className="text-[#5F5A52]">Phone:</span>
                <a href={`tel:${siteConfig.contact.phoneRaw}`} className="font-semibold text-[#171717] hover:text-[#C6922E] transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#171717]">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span className="text-[#5F5A52]">WhatsApp:</span>
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#171717] hover:text-[#25D366] transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-[#5F5A52]">
                <MapPin className="w-3.5 h-3.5 text-[#C6922E]" />
                <span>City: Hyderabad, Telangana, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-[#5F5A52]">
              <li>
                <a href="/profiles" onClick={(e) => handleNavClick(e, '/profiles')} className="hover:text-[#C6922E] transition-colors">
                  All Profiles
                </a>
              </li>
              <li>
                <a href="/categories" onClick={(e) => handleNavClick(e, '/categories')} className="hover:text-[#C6922E] transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="/locations" onClick={(e) => handleNavClick(e, '/locations')} className="hover:text-[#C6922E] transition-colors">
                  Locations
                </a>
              </li>
              <li>
                <a href="/services" onClick={(e) => handleNavClick(e, '/services')} className="hover:text-[#C6922E] transition-colors">
                  Occasions & Services
                </a>
              </li>
              <li>
                <a href="/guides" onClick={(e) => handleNavClick(e, '/guides')} className="hover:text-[#C6922E] transition-colors">
                  Guides & Etiquette
                </a>
              </li>
              <li>
                <a href="/faq" onClick={(e) => handleNavClick(e, '/faq')} className="hover:text-[#C6922E] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Hyderabad Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider">Popular Areas</h4>
            <ul className="space-y-2 text-xs text-[#5F5A52]">
              {hyderabadAreas.map((area) => (
                <li key={area.slug}>
                  <a
                    href={`/locations/${area.slug}`}
                    onClick={(e) => handleNavClick(e, `/locations/${area.slug}`)}
                    className="hover:text-[#C6922E] transition-colors"
                  >
                    {area.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#171717] uppercase tracking-wider">Legal & Compliance</h4>
            <ul className="space-y-2 text-xs text-[#5F5A52]">
              <li>
                <a href="/safety" onClick={(e) => handleNavClick(e, '/safety')} className="hover:text-[#C6922E] transition-colors">
                  Safety & Discretion Notice
                </a>
              </li>
              <li>
                <a href="/privacy" onClick={(e) => handleNavClick(e, '/privacy')} className="hover:text-[#C6922E] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" onClick={(e) => handleNavClick(e, '/terms')} className="hover:text-[#C6922E] transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')} className="hover:text-[#C6922E] transition-colors">
                  Contact Concierge
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E6E1D8] text-[11px] font-bold text-[#171717] shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6922E]" />
                <span>Strict 18+ Only</span>
              </span>
            </div>
          </div>
        </div>

        {/* 18+ Mandatory Legal Disclaimer Banner */}
        <div className="py-6 border-b border-[#E6E1D8] text-xs text-[#5F5A52] leading-relaxed flex flex-col md:flex-row items-start md:items-center gap-3">
          <div className="p-2 rounded-lg bg-white border border-[#E6E1D8] text-[#C6922E] shrink-0 shadow-2xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="font-semibold text-[#171717]">18+ Age & Lawful Agency Disclaimer:</span> This website is strictly intended for individuals 18 years of age or older. All models, independent companions, and service providers listed herein are consenting adults aged 18+. Adaah operates solely as an informational directory and introduction medium; it does not employ, broker, or direct individual service arrangements. All client engagements are private and subject to mutual adult consent.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5F5A52] gap-3">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Hyderabad Premier Directory.
          </div>
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-bold bg-white text-[#916718] border border-[#C6922E]/30">
              18+ ONLY
            </span>
            <span className="text-[#8C827A]">Designed for Discretion & Confidentiality</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
