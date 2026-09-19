import React from 'react';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/site';

export interface WhatsAppButtonProps {
  profileName?: string;
  customText?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  showIcon?: boolean;
}

export function WhatsAppButton({
  profileName,
  customText,
  className = '',
  size = 'md',
  fullWidth = false,
  showIcon = true,
}: WhatsAppButtonProps) {
  const defaultMessage = profileName
    ? `Hello, I am inquiring regarding ${profileName} via Adaah Hyderabad.`
    : 'Hello, I would like to inquire about companions in Hyderabad via Adaah.';

  const message = customText || defaultMessage;
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappRaw}?text=${encodeURIComponent(message)}`;

  const sizeClasses = {
    sm: 'h-9 px-3 text-xs rounded-xl gap-1.5',
    md: 'h-10 px-4 text-xs sm:text-sm rounded-xl gap-2',
    lg: 'h-12 px-5 text-sm sm:text-base rounded-xl gap-2.5',
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact via WhatsApp"
      className={`inline-flex items-center justify-center font-semibold bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-sm transition-all duration-200 active:scale-[0.98] cursor-pointer select-none whitespace-nowrap ${
        sizeClasses[size]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {showIcon && (
        <>
          {/* Mobile icon or text symbol */}
          <span className="inline sm:hidden text-sm leading-none" aria-hidden="true">
            💬
          </span>
          {/* Desktop icon */}
          <MessageCircle className="hidden sm:inline-block w-4 h-4 text-white shrink-0" aria-hidden="true" />
        </>
      )}
      <span className="truncate">WhatsApp</span>
    </a>
  );
}
