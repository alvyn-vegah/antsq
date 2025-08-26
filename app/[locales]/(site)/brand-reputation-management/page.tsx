'use client'
import Cards from "@/sections/brand-marketing/Cards";
import { Lastsection } from "@/sections/brand-marketing/Lastsection";
import Footersection from "@/sections/Footersection";
import Herosection from "@/sections/business/Hero";
import { Seo } from "@/customComponents/seo/Seo";
import { useState,useRef,useEffect } from "react";
import OfferPopup from "@/customComponents/Offerpopup";
import { useTranslations } from "next-intl";

const Page = () => {
    const hero = useTranslations('brandReputationPage.hero')
    const servicesSection = useTranslations('brandReputationPage.servicesSection')
    const explanatorySection = useTranslations('brandReputationPage.explanatorySection')
    const processSection = useTranslations('brandReputationPage.processSection')
    const closingSection = useTranslations('brandReputationPage.closingSection')
    const heroContent = {
      title:hero('title'),
      
      popupText:hero('popupText'),
      buttonText:hero('buttonText'),
    }
    const serviceCards = [0,1,2].map((e) => ({
      title:servicesSection(`cards.${e}.title`),
      description:servicesSection(`cards.${e}.description`),
      buttonText:servicesSection(`cards.${e}.buttonText`),
    }))
    const processSteps = [0,1,2,3,4].map((e) => ({
      title:processSection(`steps.${e}.title`),
      description:processSection(`steps.${e}.description`),
    }))
    const explanatoryContent = {
      subtitle:explanatorySection('subtitle'),
      title: explanatorySection('title'),
      description: explanatorySection('description'),
      additionalText:explanatorySection('additionalText'),
      processSubtitle:processSection('title'),
      closingDescription:closingSection('description'),
      steps:processSteps
    }
    const [isOpen,setIsOpen] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const togglePopup = () => {
      setIsOpen(!isOpen);
    }
    useEffect(() => {
      // Show popup every 5 minutes (300,000 ms)
      setTimeout(() => setIsOpen(true),3000)
      intervalRef.current = setInterval(() => {
        setIsOpen(true);
      }, 300000);
  
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, []);
    return (
        <>
        <Seo
  title="Brand Reputation Management"
  subtitle="Antsq Services"
  keywords={["online reputation management", "brand reputation management", "reputation management services", "SEO reputation management"]}
  description="Safeguard your brand's image with Antsq's online reputation management services — proactive, reliable, and results-driven."
/>
{isOpen && (
        <OfferPopup toggleFunction={() => togglePopup()} />
      )}
        <section className={`w-full primarybg ${
          isOpen ? "filter blur-xs pointer-events-none select-none" : ""
        }`}>
        <Herosection data={heroContent} />
        <Cards data={serviceCards} />
        <Lastsection data={explanatoryContent} />
        <Footersection />
        </section>
        </>
    )
}

export default Page;
