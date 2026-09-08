import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Quote, Star, CheckCircle } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const reviews = [
    {
      quote: "My daughter went from dreading maths homework to feeling genuinely confident before her GCSE mocks. Tia's patient, step-by-step explanations made concepts click that her school teachers hadn't been able to unlock.",
      parent: "Parent of Year 11 Student",
      location: "Sale, Trafford",
      proofTag: "Confidence Boost"
    },
    {
      quote: "Tia is exceptionally patient and tailored her explanations to my son's specific way of thinking. She breaks down complex algebra and trigonometry into clear, manageable steps without ever making him feel rushed.",
      parent: "Parent of Year 10 GCSE Student",
      location: "Cheshire",
      proofTag: "Patient, Tailored Explanations"
    },
    {
      quote: "A warm, welcoming, and thoroughly professional atmosphere at the School Road room. Tia is immensely knowledgeable, reliable, and deeply committed to her students' success.",
      parent: "Parent in Sale",
      location: "Sale Town Centre",
      proofTag: "Warm & Professional"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#E5E5E5]" id="reviews">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-[720px] mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4A7C59] mb-2">
            <span>Parent Testimonials</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2D2D2D]">
            What parents in Sale &amp; Manchester say
          </h2>
          <p className="text-[18px] text-[#666666] leading-[1.6] mt-2">
            Real feedback from local parents whose children transformed their understanding and confidence in GCSE maths.
          </p>
        </div>

        {/* Verified Proof Banner */}
        <div className="mb-8 p-4 rounded bg-[#F9F9F7] border border-[#E5E5E5] flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-[#2D2D2D]">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#4A7C59]" />
            <span>Parents praise confidence boosts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#4A7C59]" />
            <span>Patient, tailored explanations</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[#4A7C59]" />
            <span>Warm and professional environment</span>
          </div>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: idx * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="bg-[#F9F9F7] p-6 rounded border border-[#E5E5E5] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Quote className="w-6 h-6 text-[#4A7C59]" />
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white text-[#4A7C59] border border-[#E5E5E5]">
                    {rev.proofTag}
                  </span>
                </div>

                <div className="flex gap-0.5 text-[#4A7C59]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm text-[#2D2D2D] leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E5E5] text-xs">
                <div className="font-bold text-[#2D2D2D]">{rev.parent}</div>
                <div className="text-[#666666]">{rev.location}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
