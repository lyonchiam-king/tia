import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BadgesStrip } from './components/BadgesStrip';
import { MethodCards } from './components/MethodCards';
import { OfferingsGrid } from './components/OfferingsGrid';
import { Pathfinder } from './components/Pathfinder';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingMobileBar } from './components/FloatingMobileBar';
import { PathfinderSelection } from './types';

export default function App() {
  const [pathfinderSelection, setPathfinderSelection] = useState<PathfinderSelection | null>(null);
  const [selectedOffering, setSelectedOffering] = useState<string | null>(null);
  
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePathfinderComplete = (selection: PathfinderSelection) => {
    setPathfinderSelection(selection);
    scrollToContact();
  };

  const handleOfferingSelect = (offeringName: string) => {
    setSelectedOffering(offeringName);
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] text-[#2D2D2D] font-sans antialiased pb-20 sm:pb-0 selection:bg-[#4A7C59]/20 selection:text-[#2D2D2D]">
      
      {/* 1. Header */}
      <Header onNavigateContact={scrollToContact} />

      <main>
        {/* 2. Hero Section */}
        <Hero onCheckAvailability={scrollToContact} />

        {/* 3. Badges Strip */}
        <BadgesStrip />

        {/* 4. Method Cards (Signature Moment: Notebook Page Expansion) */}
        <MethodCards />

        {/* 5. What They Offer (4 Offerings Grid + Shared-element Modal) */}
        <OfferingsGrid onSelectOffering={handleOfferingSelect} />

        {/* 6. Interactive Pathfinder */}
        <Pathfinder onCompleteSelection={handlePathfinderComplete} />

        {/* 7. Reviews & Verified Proof */}
        <ReviewsSection />

        {/* 8. Contact Form & Location Details */}
        <ContactSection
          ref={contactRef}
          pathfinderSelection={pathfinderSelection}
          selectedOffering={selectedOffering}
        />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* 10. Floating Bar on Mobile */}
      <FloatingMobileBar />

    </div>
  );
}
