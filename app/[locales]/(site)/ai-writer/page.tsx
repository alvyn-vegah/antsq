
'use client'
import { Faq } from "@/sections/ai-writer/Faq";
import Hero from "@/sections/ai-writer/Hero";
import Midsection from "@/sections/ai-writer/Midsection";
import { WizardDetails } from "@/sections/ai-writer/WizardDetails";
import { Wizards } from "@/sections/ai-writer/Wizards";
import Footersection from "@/sections/Footersection";
import { Seo } from "@/customComponents/seo/Seo";
import Cards from "@/sections/ai-writer/Cards";
import { useState,useRef,useEffect } from "react";
import OfferPopup from "@/customComponents/Offerpopup";
import { useTranslations } from "next-intl";

type WizardProps = {
  title:string,
  description:string,
  buttonText:string,
}

const Page = () => {
  const hero = useTranslations('AIWriterPage.hero');
  const featuresSection = useTranslations('AIWriterPage.featuresSection');
  const helpSection = useTranslations('AIWriterPage.helpSection');
  const wizardsSection = useTranslations('AIWriterPage.wizardsSection');
  const wizardDetails =  useTranslations().raw('AIWriterPage.wizardDetails') as WizardProps[];
  const pricingSection = useTranslations('AIWriterPage.pricingSection');
  const faqSection = useTranslations('AIWriterPage.faqSection');
  const heroContent = {
    title:hero('title').split('|'),
    description:hero.rich('description',{
      span:(chunk) => <span className="font-bold">{chunk}</span>
    }),
    buttonText:hero('buttonText')
  }
  const middleSectionContent = {
    features:featuresSection.raw('features'),
    help:{
      title:helpSection('title'),
      animeText:helpSection('animeText'),
      description:helpSection('description'),
      buttonText:helpSection('buttonText'),
    }
  };
  const wizardsContent = {
    title:wizardsSection('title'),
    subtitle:wizardsSection('subtitle'),
    wizards:wizardsSection.raw('wizards')
  }
  const pricingContent = {
    title:pricingSection('title'),
    buttonText:pricingSection('buttonText'),
    plans:pricingSection.raw('plans')
  }
  const faqContent = {
    title:faqSection('title'),
    subtitle:faqSection('subtitle'),
    questions:faqSection.raw('questions')
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
  title="AI Writer Tool"
  subtitle="Antsq"
  keywords={[
    "AI content writer",
    "AI writing tool",
    "AI copy generator",
    "automated blog writing",
    "SEO content generation tool"
  ]
  }
  description="Discover Antsq's AI Writer - your intelligent assistant for generating high-quality, SEO-optimized content instantly."
/>
{isOpen && (
        <OfferPopup toggleFunction={() => togglePopup()} />
      )}
      <div  className={`${
          isOpen ? "filter blur-xs pointer-events-none select-none" : ""
        }`}>
        <Hero data = {heroContent} />
        <Midsection data={middleSectionContent} />
        <Wizards data={wizardsContent} />
        <WizardDetails data={wizardDetails} />
        <Cards data={pricingContent} />
         <Faq data={faqContent} />
         <Footersection />
      </div>
      </>
    )
}

export default Page;