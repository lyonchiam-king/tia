import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { PathfinderSelection } from '../types';
import { Check, Sparkles, MessageCircle, ArrowDown } from 'lucide-react';

interface PathfinderProps {
  onCompleteSelection: (selection: PathfinderSelection) => void;
}

export const Pathfinder: React.FC<PathfinderProps> = ({ onCompleteSelection }) => {
  const shouldReduceMotion = useReducedMotion();

  const [selection, setSelection] = useState<PathfinderSelection>({
    yearGroup: 'Year 11 (Exam Year)',
    struggleArea: 'Algebra & Equations',
    mode: 'In-Person (Sale, M33)'
  });

  const yearGroupOptions = [
    'Year 9 (Building Foundations)',
    'Year 10 (GCSE Prep)',
    'Year 11 (Exam Year)',
    'Adult / Resit'
  ];

  const struggleAreaOptions = [
    'Algebra & Equations',
    'Geometry & Trigonometry',
    'Word Problems & Reasoning',
    'Exam Speed & Confidence'
  ];

  const modeOptions = [
    'In-Person (Sale, M33)',
    'Online (Zoom)',
    'Flexible / Hybrid'
  ];

  // Dynamic recommendation text
  const getRecommendation = () => {
    let modeText = selection.mode.includes('In-Person')
      ? 'face-to-face sessions at 19B School Road, Sale'
      : selection.mode.includes('Online')
      ? 'interactive online tutoring with digital whiteboard notes'
      : 'a flexible combination of Sale in-person and online sessions';

    return `For a student in ${selection.yearGroup} working through ${selection.struggleArea}, we recommend starting with a diagnostic assessment during ${modeText}. Tia will break down ${selection.struggleArea} step-by-step to rebuild foundational confidence ahead of mock and final GCSE exams.`;
  };

  const getWhatsAppUrl = () => {
    const text = `Hi Tia, I used the site Pathfinder: My child is in ${selection.yearGroup}, struggling with ${selection.struggleArea}, and we'd prefer ${selection.mode}. Do you have availability?`;
    return `https://wa.me/447402786523?text=${encodeURIComponent(text)}`;
  };

  const handleApplyToForm = () => {
    onCompleteSelection(selection);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F9F9F7] border-b border-[#E5E5E5]" id="pathfinder">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-[720px] mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4A7C59] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Finder</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2D2D2D]">
            Find the right tutoring path for your child
          </h2>
          <p className="text-[18px] text-[#666666] leading-[1.6] mt-2">
            Select your options below to see our recommendation and pre-fill your inquiry message instantly.
          </p>
        </div>

        {/* 3-Step Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Steps Controls (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Year Group */}
            <div className="bg-white p-5 rounded border border-[#E5E5E5] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4A7C59]">
                  Step 1: Year Group
                </span>
                <span className="text-xs text-[#666666]">
                  Current: <strong className="text-[#2D2D2D]">{selection.yearGroup}</strong>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {yearGroupOptions.map(option => {
                  const isSelected = selection.yearGroup === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelection(prev => ({ ...prev, yearGroup: option }))}
                      className={`min-h-[44px] px-3.5 py-2.5 rounded text-xs font-semibold text-left transition-all flex items-center justify-between border cursor-pointer ${
                        isSelected
                          ? 'bg-[#4A7C59] text-white border-[#4A7C59]'
                          : 'bg-[#F9F9F7] text-[#2D2D2D] border-[#E5E5E5] hover:border-[#4A7C59]/60'
                      }`}
                    >
                      <span>{option}</span>
                      {isSelected && <Check className="w-4 h-4 shrink-0 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Struggle Area */}
            <div className="bg-white p-5 rounded border border-[#E5E5E5] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4A7C59]">
                  Step 2: Key Focus Area
                </span>
                <span className="text-xs text-[#666666]">
                  Selected: <strong className="text-[#2D2D2D]">{selection.struggleArea}</strong>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {struggleAreaOptions.map(option => {
                  const isSelected = selection.struggleArea === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelection(prev => ({ ...prev, struggleArea: option }))}
                      className={`min-h-[44px] px-3.5 py-2.5 rounded text-xs font-semibold text-left transition-all flex items-center justify-between border cursor-pointer ${
                        isSelected
                          ? 'bg-[#4A7C59] text-white border-[#4A7C59]'
                          : 'bg-[#F9F9F7] text-[#2D2D2D] border-[#E5E5E5] hover:border-[#4A7C59]/60'
                      }`}
                    >
                      <span>{option}</span>
                      {isSelected && <Check className="w-4 h-4 shrink-0 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Mode Preference */}
            <div className="bg-white p-5 rounded border border-[#E5E5E5] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#4A7C59]">
                  Step 3: Session Location
                </span>
                <span className="text-xs text-[#666666]">
                  Mode: <strong className="text-[#2D2D2D]">{selection.mode}</strong>
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {modeOptions.map(option => {
                  const isSelected = selection.mode === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelection(prev => ({ ...prev, mode: option }))}
                      className={`min-h-[44px] px-3.5 py-2.5 rounded text-xs font-semibold text-left transition-all flex items-center justify-between border cursor-pointer ${
                        isSelected
                          ? 'bg-[#4A7C59] text-white border-[#4A7C59]'
                          : 'bg-[#F9F9F7] text-[#2D2D2D] border-[#E5E5E5] hover:border-[#4A7C59]/60'
                      }`}
                    >
                      <span>{option}</span>
                      {isSelected && <Check className="w-4 h-4 shrink-0 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Recommendation & Direct Action Box (Right 5 Cols) */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white p-6 rounded border-2 border-[#4A7C59] space-y-5 sticky top-20">
              
              <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-3">
                <h3 className="font-serif font-bold text-base text-[#2D2D2D] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#4A7C59]" />
                  Tailored Recommendation
                </h3>
                <span className="text-[11px] font-semibold text-[#4A7C59] bg-[#F9F9F7] px-2 py-0.5 rounded border border-[#E5E5E5]">
                  Updated Live
                </span>
              </div>

              {/* Chosen Summary Pills */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="px-2.5 py-1 rounded bg-[#F9F9F7] text-[#2D2D2D] border border-[#E5E5E5]">
                  Year: <strong>{selection.yearGroup}</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-[#F9F9F7] text-[#2D2D2D] border border-[#E5E5E5]">
                  Focus: <strong>{selection.struggleArea}</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-[#F9F9F7] text-[#2D2D2D] border border-[#E5E5E5]">
                  Mode: <strong>{selection.mode}</strong>
                </span>
              </div>

              <p className="text-sm text-[#2D2D2D] leading-relaxed bg-[#F9F9F7] p-4 rounded border border-[#E5E5E5]">
                {getRecommendation()}
              </p>

              <div className="space-y-3 pt-1">
                <button
                  onClick={handleApplyToForm}
                  className="w-full bg-[#4A7C59] text-white font-semibold text-sm py-3 px-4 rounded hover:bg-[#3A6346] active:bg-[#2D4D36] transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#4A7C59]"
                >
                  <span>Check Availability With These Options</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white text-[#4A7C59] border border-[#4A7C59] font-semibold text-sm py-3 px-4 rounded hover:bg-[#4A7C59] hover:text-white transition-all flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send as WhatsApp Message</span>
                </a>
              </div>

              <p className="text-[11px] text-[#666666] text-center">
                Pre-fills the contact form below or sends directly to Tia's WhatsApp.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
