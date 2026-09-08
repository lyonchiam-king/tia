import React from 'react';
import heroImg from '../assets/images/hero_tutoring_space_1788895973533.jpg';

interface HeroProps {
  onCheckAvailability: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCheckAvailability }) => {
  return (
    <section className="relative w-full bg-[#F9F9F7] pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#E5E5E5]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text Content Area (Max width 720px equivalent) */}
          <div className="lg:col-span-7 space-y-6 max-w-[720px]">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E5E5E5] rounded-full text-xs font-semibold text-[#4A7C59] tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#4A7C59]"></span>
              Sale, Cheshire &amp; Online Tutoring
            </div>

            <h1 className="font-serif font-bold text-[#2D2D2D] text-3xl sm:text-4xl md:text-5xl leading-[1.1] tracking-tight">
              GCSE Maths that finally makes sense.
            </h1>

            <p className="text-[18px] text-[#666666] leading-[1.6] max-w-[620px]">
              Patient, tailored tutoring in Sale and online that builds confidence, not just grades.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onCheckAvailability}
                className="bg-[#4A7C59] text-white font-semibold text-base px-6 py-3.5 rounded hover:bg-[#3A6346] active:bg-[#2D4D36] transition-all text-center shadow-none cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4A7C59]"
              >
                Check Availability
              </button>

              <div className="text-xs text-[#666666] flex flex-col justify-center px-1">
                <span className="font-medium text-[#2D2D2D]">Based at School Road, Sale (M33)</span>
                <span>1-on-1 &amp; Small Focused Groups</span>
              </div>
            </div>
          </div>

          {/* Hero Image Area */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-lg overflow-hidden border border-[#E5E5E5] bg-white aspect-[16/10] sm:aspect-[4/3] shadow-none">
              <img
                src={heroImg}
                alt="Tia's Maths Tutoring study workspace with organized GCSE revision notes and calculator"
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded border border-[#E5E5E5] text-xs text-[#2D2D2D]">
                <p className="font-semibold font-serif">19B School Road, Sale</p>
                <p className="text-[#666666] text-[11px]">Quiet, focused learning space in Sale town centre</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
