import React from 'react';
import { Phone, MapPin, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onNavigateContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateContact }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F9F9F7]/95 backdrop-blur-sm border-b border-[#E5E5E5] transition-colors">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Name */}
        <a href="#" className="flex flex-col text-left group">
          <span className="font-serif font-bold text-lg sm:text-xl text-[#2D2D2D] group-hover:text-[#4A7C59] transition-colors">
            Tia's Maths Tutoring
          </span>
          <span className="text-xs text-[#666666] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#4A7C59]" /> Sale, Manchester (M33)
          </span>
        </a>

        {/* Action Links */}
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="tel:+447402786523"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#2D2D2D] hover:text-[#4A7C59] transition-colors py-1 px-2 rounded focus-visible:ring-2 focus-visible:ring-[#4A7C59]"
            title="Call Tia directly"
          >
            <Phone className="w-4 h-4 text-[#4A7C59]" />
            <span className="tabular-nums">+44 7402 786523</span>
          </a>

          <a
            href="https://wa.me/447402786523?text=Hi%20Tia,%20I'd%20like%20to%20inquire%20about%20GCSE%20maths%20tutoring."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-[#F9F9F7] text-[#4A7C59] border border-[#4A7C59] px-3 py-1.5 rounded hover:bg-[#4A7C59] hover:text-white transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>

          <button
            onClick={onNavigateContact}
            className="bg-[#4A7C59] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#3A6346] active:bg-[#2D4D36] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4A7C59]"
          >
            Check Availability
          </button>
        </div>
      </div>
    </header>
  );
};
