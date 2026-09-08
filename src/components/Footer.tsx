import React from 'react';
import { MapPin, Phone, MessageCircle, FileSpreadsheet } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E5E5E5] py-12 text-xs text-[#666666]">
      <div className="max-w-[1200px] mx-auto px-6 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & Mission */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-[#2D2D2D]">
              Tia's Maths Tutoring
            </h3>
            <p className="leading-relaxed">
              Patient, tailored GCSE maths tutoring in Sale, Cheshire and online that builds confidence, not just grades. Specialist in Edexcel, AQA &amp; OCR curriculums.
            </p>
          </div>

          {/* Real Contact & Location */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#2D2D2D]">
              Tutoring Room &amp; Address
            </h4>
            <div className="space-y-2">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                <span>
                  First Floor, 19B School Rd, Cheshire, Sale M33 7XX, UK
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#4A7C59] shrink-0" />
                <a href="tel:+447402786523" className="hover:text-[#4A7C59] font-medium tabular-nums">
                  +44 7402 786523
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links & Owner Spreadsheet */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#2D2D2D]">
              Owner &amp; Parent Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://maps.google.com/?q=First+Floor,+19B+School+Rd,+Sale+M33+7XX,+UK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#4A7C59] underline"
                >
                  Google Maps Location →
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/447402786523"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#4A7C59] underline flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#4A7C59]" />
                  Direct WhatsApp Chat
                </a>
              </li>
              <li className="pt-2 border-t border-[#E5E5E5]/60">
                <a
                  href="/api/enquiries/csv"
                  className="text-[#4A7C59] font-bold hover:underline flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  Owner Enquiry Spreadsheet (CSV)
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#666666]">
          <p>© {new Date().getFullYear()} Tia's Maths Tutoring. All rights reserved. First Floor, 19B School Rd, Sale M33 7XX.</p>
          <p>GCSE Maths Specialist • Sale, Trafford &amp; Online</p>
        </div>

      </div>
    </footer>
  );
};
