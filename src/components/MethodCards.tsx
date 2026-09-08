import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { BookOpen, Target, Sparkles, ChevronDown, Check } from 'lucide-react';

interface MethodItem {
  id: string;
  title: string;
  summary: string;
  notebookPage: {
    whyItWorks: string;
    keyTechnique: string;
    parentOutcome: string;
  };
  icon: React.ElementType;
}

export const MethodCards: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('step-by-step');
  const shouldReduceMotion = useReducedMotion();

  const methods: MethodItem[] = [
    {
      id: 'step-by-step',
      title: '1. Step-by-Step Breakdown',
      summary: 'Deconstructing tricky topics like algebra & trigonometry into clear, manageable steps.',
      icon: BookOpen,
      notebookPage: {
        whyItWorks: 'Many students struggle because classroom speeds move past foundational gaps. We isolate the exact sticking point—whether factorising quadratics or rearranging formulas—and build from first principles until it becomes second nature.',
        keyTechnique: 'Visual step diagrams & clear written formula rules in student notebook.',
        parentOutcome: 'No more staring at homework feeling helpless—students leave with clear step guides.'
      }
    },
    {
      id: 'exam-confidence',
      title: '2. Building Exam Confidence',
      summary: 'Past paper practice, exam technique, and stress-free problem solving.',
      icon: Target,
      notebookPage: {
        whyItWorks: 'Knowing maths is only half the battle; reading mark schemes and managing time is the other. We practice real Edexcel, AQA & OCR questions together so there are zero surprises on exam day.',
        keyTechnique: 'Decoding command words (e.g. "Show that", "Hence find") & mark scheme allocation.',
        parentOutcome: 'Students enter exam rooms calm, knowing exactly how to earn method marks.'
      }
    },
    {
      id: 'patience-pacing',
      title: '3. Patience & Pacing',
      summary: "No rushed questions, tailored to the student's unique learning speed.",
      icon: Sparkles,
      notebookPage: {
        whyItWorks: 'In a class of 30, asking "why" can feel intimidating. Here, every question is welcomed. Tia adapts her explanation style using alternative analogies or visual proofs until the concept truly clicks.',
        keyTechnique: 'Multi-angle explanations & supportive, non-judgmental atmosphere.',
        parentOutcome: 'Rebuilds self-belief and turns anxiety into quiet, steady competence.'
      }
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F9F9F7] border-b border-[#E5E5E5]">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-[720px] mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4A7C59] mb-2">
            <span>Our Teaching Method</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2D2D2D]">
            How Tia makes maths click
          </h2>
          <p className="text-[18px] text-[#666666] leading-[1.6] mt-2">
            Tap any method below to open the notebook page and see the rationale behind our patient approach.
          </p>
        </div>

        {/* Method Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {methods.map((method, idx) => {
            const isExpanded = expandedId === method.id;
            const Icon = method.icon;

            return (
              <motion.div
                key={method.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className={`bg-white rounded border transition-all duration-200 overflow-hidden cursor-pointer ${
                  isExpanded
                    ? 'border-2 border-[#4A7C59] shadow-sm'
                    : 'border-[#E5E5E5] hover:border-[#4A7C59]/60'
                }`}
                onClick={() => toggleExpand(method.id)}
              >
                {/* Card Header Top */}
                <div className="p-5 sm:p-6 bg-white border-b border-[#E5E5E5]/60 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded bg-[#F9F9F7] border border-[#E5E5E5] text-[#4A7C59]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#F9F9F7] text-[#666666] border border-[#E5E5E5]">
                      {isExpanded ? 'Notebook Open' : 'Tap to Open'}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#2D2D2D]">
                    {method.title}
                  </h3>

                  <p className="text-sm text-[#666666] leading-relaxed mt-2">
                    {method.summary}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-[#4A7C59] pt-2 border-t border-[#E5E5E5]/40">
                    <span>{isExpanded ? 'Hide Details' : 'View Notebook Page'}</span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Notebook Page Expansion */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="bg-[#F9F9F7] border-t border-[#E5E5E5] p-5 sm:p-6 text-xs text-[#2D2D2D] relative overflow-hidden"
                    >
                      {/* Notebook lines subtle texture */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2 border-b border-[#E5E5E5] font-serif font-bold text-[#4A7C59]">
                          <BookOpen className="w-4 h-4" />
                          <span>Notebook Excerpt: Why It Works</span>
                        </div>

                        <div>
                          <p className="text-[#666666] leading-relaxed text-sm">
                            {method.notebookPage.whyItWorks}
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded border border-[#E5E5E5] space-y-2">
                          <div className="font-medium text-[#2D2D2D] flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#4A7C59]" />
                            <span>Key Technique:</span>
                          </div>
                          <p className="text-[#666666] text-xs">
                            {method.notebookPage.keyTechnique}
                          </p>
                        </div>

                        <div className="text-[#4A7C59] font-medium text-xs pt-1 italic">
                          Parent Outcome: "{method.notebookPage.parentOutcome}"
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
