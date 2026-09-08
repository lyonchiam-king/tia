import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { GraduationCap, Laptop, HeartHandshake } from 'lucide-react';

export const BadgesStrip: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const badges = [
    {
      icon: GraduationCap,
      label: 'GCSE Specialist',
      detail: 'Focused specifically on Edexcel, AQA & OCR GCSE curriculums'
    },
    {
      icon: Laptop,
      label: 'In-Person & Online',
      detail: 'Face-to-face in Sale (M33) or interactive virtual sessions'
    },
    {
      icon: HeartHandshake,
      label: 'Patient Approach',
      detail: 'Tailored explanations that build true understanding & confidence'
    }
  ];

  return (
    <section className="bg-white border-b border-[#E5E5E5] py-6">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="flex items-start gap-3.5 p-4 rounded bg-[#F9F9F7] border border-[#E5E5E5]"
              >
                <div className="p-2 rounded bg-white border border-[#E5E5E5] text-[#4A7C59] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-sm text-[#2D2D2D]">
                    {badge.label}
                  </h2>
                  <p className="text-xs text-[#666666] leading-relaxed mt-0.5">
                    {badge.detail}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
