import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ServiceItem } from '../types';
import { X, CheckCircle, Clock, MapPin, ArrowRight } from 'lucide-react';

import gcseImg from '../assets/images/gcse_tutoring_card_1788895986045.jpg';
import onlineImg from '../assets/images/online_sessions_card_1788896000547.jpg';
import inPersonImg from '../assets/images/in_person_tuition_card_1788896013459.jpg';
import planningImg from '../assets/images/study_planning_card_1788896028864.jpg';

interface OfferingsGridProps {
  onSelectOffering: (offeringName: string) => void;
}

export const OfferingsGrid: React.FC<OfferingsGridProps> = ({ onSelectOffering }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const services: ServiceItem[] = [
    {
      id: 'gcse-tutoring',
      name: '1. GCSE Tutoring',
      tags: ['Exam focus', 'Confidence'],
      image: gcseImg,
      shortDesc: 'Targeted preparation for Higher & Foundation GCSE maths curriculums (Edexcel, AQA, OCR).',
      fullDesc: 'Comprehensive coverage of key GCSE maths modules including Algebra, Geometry, Statistics, Trigonometry, and Probability. Sessions focus on identifying student weaknesses, working through step-by-step problem sets, and mastering exam technique.',
      keyBenefits: [
        'Foundation (grades 1-5) and Higher tier (grades 4-9) specialization',
        'Past exam paper walk-throughs & mark scheme analysis',
        'Clear formula cheat-sheets & exam time management strategies'
      ],
      suitableFor: 'Year 10 & Year 11 students preparing for upcoming mocks or final GCSE examinations.'
    },
    {
      id: 'online-sessions',
      name: '2. Online Sessions',
      tags: ['Flexible', 'Home comfort'],
      image: onlineImg,
      shortDesc: 'Live 1-on-1 interactive virtual lessons with digital whiteboarding and saved notes.',
      fullDesc: 'High-engagement online tutoring using clean digital whiteboards where both Tia and the student write out solutions together in real time. All session whiteboards and worked solutions are saved into a downloadable PDF after every session.',
      keyBenefits: [
        'No travel needed—study comfortably from home in Manchester or beyond',
        'Interactive digital whiteboard with shared note writing',
        'Instant digital PDF copy of all worked examples emailed after session'
      ],
      suitableFor: 'Students with busy extracurricular schedules or those who thrive learning in their home study space.'
    },
    {
      id: 'in-person-tuition',
      name: '3. In-Person Tuition',
      tags: ['Sale based', 'Focused environment'],
      image: inPersonImg,
      shortDesc: 'Quiet, dedicated learning environment located at First Floor, 19B School Road, Sale.',
      fullDesc: 'Face-to-face tutoring in a clean, quiet, and welcoming study environment right in Sale town centre. Designed to eliminate home distractions and provide hands-on, face-to-face guidance with pen, paper, and physical study materials.',
      keyBenefits: [
        'Convenient Sale location near local schools and transport',
        'Quiet, distraction-free environment dedicated to focused learning',
        'Direct pen-and-paper feedback and physical revision resources'
      ],
      suitableFor: 'Parents looking for structured face-to-face learning near Sale, Trafford, and Cheshire.'
    },
    {
      id: 'study-planning',
      name: '4. Study Planning',
      tags: ['Organisation', 'Routine'],
      image: planningImg,
      shortDesc: 'Structured weekly revision timetables and topic tracking to eliminate last-minute cramming.',
      fullDesc: 'A realistic, manageable revision plan tailored to the student’s weekly routine. Tia breaks down the entire GCSE syllabus into achievable weekly goals, ensuring every topic is reviewed systematically before exams.',
      keyBenefits: [
        'Custom weekly revision schedule aligned with exam board dates',
        'Topic confidence tracker to measure progress over time',
        'Effective revision strategies that build long-term memory retention'
      ],
      suitableFor: 'Students feeling overwhelmed by the volume of revision material who need clear structure.'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-[#E5E5E5]" id="offerings">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-[720px] mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4A7C59] mb-2">
            <span>What We Offer</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#2D2D2D]">
            Structured tuition for every learning style
          </h2>
          <p className="text-[18px] text-[#666666] leading-[1.6] mt-2">
            Select any service to view comprehensive details, benefits, and location availability.
          </p>
        </div>

        {/* Grid of 4 Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              layoutId={`card-container-${service.id}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: idx * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="bg-[#F9F9F7] rounded border border-[#E5E5E5] overflow-hidden flex flex-col justify-between hover:border-[#4A7C59] transition-all cursor-pointer group"
              onClick={() => setSelectedService(service)}
            >
              <div>
                {/* Image Area */}
                <div className="aspect-[4/3] w-full overflow-hidden bg-white border-b border-[#E5E5E5] relative">
                  <motion.img
                    layoutId={`card-image-${service.id}`}
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white text-[#4A7C59] border border-[#E5E5E5]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.h3
                    layoutId={`card-title-${service.id}`}
                    className="font-serif font-bold text-base text-[#2D2D2D] group-hover:text-[#4A7C59] transition-colors"
                  >
                    {service.name}
                  </motion.h3>

                  <p className="text-xs text-[#666666] leading-relaxed line-clamp-3">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  className="w-full text-xs font-semibold text-[#4A7C59] bg-white border border-[#E5E5E5] group-hover:border-[#4A7C59] py-2 px-3 rounded transition-all flex items-center justify-between cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Expansion with layoutId */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0"
                onClick={() => setSelectedService(null)}
              />

              <motion.div
                layoutId={`card-container-${selectedService.id}`}
                className="bg-white rounded-lg border border-[#E5E5E5] max-w-[640px] w-full max-h-[90vh] overflow-y-auto relative z-10 shadow-lg p-6 sm:p-8 space-y-6"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#F9F9F7] text-[#2D2D2D] hover:bg-[#E5E5E5] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#4A7C59]"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Image Header */}
                <div className="aspect-[16/9] w-full rounded border border-[#E5E5E5] overflow-hidden bg-[#F9F9F7]">
                  <motion.img
                    layoutId={`card-image-${selectedService.id}`}
                    src={selectedService.image}
                    alt={selectedService.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Tags & Title */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {selectedService.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs font-semibold px-2.5 py-1 rounded bg-[#F9F9F7] text-[#4A7C59] border border-[#E5E5E5]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.h3
                    layoutId={`card-title-${selectedService.id}`}
                    className="font-serif font-bold text-2xl text-[#2D2D2D]"
                  >
                    {selectedService.name}
                  </motion.h3>
                </div>

                <p className="text-sm text-[#666666] leading-relaxed">
                  {selectedService.fullDesc}
                </p>

                {/* Benefits List */}
                <div className="bg-[#F9F9F7] p-4 rounded border border-[#E5E5E5] space-y-2.5">
                  <h4 className="font-serif font-bold text-sm text-[#2D2D2D]">Key Features:</h4>
                  <ul className="space-y-2 text-xs text-[#2D2D2D]">
                    {selectedService.keyBenefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-[#4A7C59] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suitable For */}
                <div className="text-xs text-[#666666]">
                  <span className="font-semibold text-[#2D2D2D]">Who this is for: </span>
                  {selectedService.suitableFor}
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3 border-t border-[#E5E5E5]">
                  <button
                    onClick={() => {
                      const serviceName = selectedService.name;
                      setSelectedService(null);
                      onSelectOffering(serviceName);
                    }}
                    className="flex-1 bg-[#4A7C59] text-white font-semibold text-sm py-3 px-4 rounded hover:bg-[#3A6346] active:bg-[#2D4D36] transition-all text-center cursor-pointer focus-visible:ring-2 focus-visible:ring-[#4A7C59]"
                  >
                    Inquire About This Service
                  </button>

                  <button
                    onClick={() => setSelectedService(null)}
                    className="bg-[#F9F9F7] text-[#2D2D2D] border border-[#E5E5E5] font-semibold text-sm py-3 px-4 rounded hover:bg-[#E5E5E5] transition-all cursor-pointer"
                  >
                    Back
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
