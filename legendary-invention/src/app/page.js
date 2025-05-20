'use client';

import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import GameCarousel from "@/components/GameCarousel";
import LetsPlaySection from "@/components/LetsPlaySection";
import LiveStatsSection from "@/components/LiveStatsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import UpcomingTournaments from "@/components/UpcomingTournaments";
import NewsUpdates from "@/components/NewsUpdates";
import ProvablyFairSection from "@/components/ProvablyFairSection";
import SBTCIntegration from "@/components/SBTCIntegration";
import RebarShieldIntegration from "@/components/RebarShieldIntegration";
import RebarDataAnalytics from "@/components/RebarDataAnalytics";
import BIP300Integration from "@/components/BIP300Integration";
import LightningNetworkVisualizer from "@/components/LightningNetworkVisualizer";
import { useState, useEffect } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  
  // Ensure components render only on client-side to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <div className="bg-[#070005] overflow-x-hidden w-full">
      <HeroSection />
      <LiveStatsSection />
      <FeatureSection />
      
      {/* Bitcoin technology integrations */}
      {isClient && (
        <>
          <ProvablyFairSection />
          <SBTCIntegration />
          <RebarShieldIntegration />
          <RebarDataAnalytics />
          <BIP300Integration />
          <LightningNetworkVisualizer />
        </>
      )}
      
      <GameCarousel />
      <HowItWorksSection />
      <UpcomingTournaments />
      <TestimonialsSection />
      <NewsUpdates />
      <LetsPlaySection />
    </div>
  );
}
