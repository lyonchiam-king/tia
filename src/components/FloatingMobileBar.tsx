import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Phone, MessageCircle } from 'lucide-react';

export const FloatingMobileBar: React.FC = () => {
  const [showBar, setShowBar] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Show bar once scrolled past 320px (hero section)
      if (window.scrollY > 320) {
        setShowBar(true);
      } else {
        setShowBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showBar && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E5E5E5] px-4 py-3 shadow-lg"
          style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))' }}
        >
          <div className="grid grid-cols-2 gap-3 max-w-[400px] mx-auto">
            {/* Call Tia */}
            <a
              href="tel:+447402786523"
              className="bg-[#F9F9F7] text-[#2D2D2D] border border-[#E5E5E5] font-semibold text-xs py-3 px-3 rounded text-center flex items-center justify-center gap-2 active:bg-[#E5E5E5] transition-all"
            >
              <Phone className="w-4 h-4 text-[#4A7C59]" />
              <span>Call Tia</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/447402786523?text=Hi%20Tia,%20I'd%20like%20to%20inquire%20about%20GCSE%20maths%20tutoring."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4A7C59] text-white font-semibold text-xs py-3 px-3 rounded text-center flex items-center justify-center gap-2 active:bg-[#2D4D36] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
