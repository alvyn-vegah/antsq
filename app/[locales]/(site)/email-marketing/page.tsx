'use client'
import Herosection from "@/sections/email-marketing/Hero";
import { Last } from "@/sections/email-marketing/Last";
import { Middle } from "@/sections/email-marketing/Middle";
import Footerbanner from "@/sections/email-marketing/Footerbanner";
import Footersection from "@/sections/Footersection";
import { Seo } from "@/customComponents/seo/Seo";
import { useState,useRef,useEffect } from "react";
import OfferPopup from "@/customComponents/Offerpopup";
import { useTranslations } from "next-intl";

const Page = () => {
  const hero = useTranslations('EmailMarketingPage.hero');
  const whatIsSection = useTranslations('EmailMarketingPage.whatIsSection');
  const needSection = useTranslations('EmailMarketingPage.needSection');
  const reachCustomersSection = useTranslations('EmailMarketingPage.reachCustomersSection');
  const marketingEmailsSection = useTranslations('EmailMarketingPage.marketingEmailsSection');
  const benefitsSection = useTranslations('EmailMarketingPage.benefitsSection');
  const ctaSection = useTranslations('EmailMarketingPage.ctaSection');
  
  const heroContent = {
    subTitle: hero('subTitle'),
    title: hero('title'),
    description: hero('description'),
    buttonText: hero('buttonText'),
  };
  const  firstArray = whatIsSection('title').split('|')
  const middleSectionData = {
    "0":{
      title: firstArray,
      description: whatIsSection('description'),
    },
    "1":{
      title: needSection('title'),
      description: needSection('description'),
    },
    "2":{
      title: reachCustomersSection('title'),
      description: reachCustomersSection('description'),
    },
    "3":{
      title: marketingEmailsSection('title'),
      description: marketingEmailsSection('description'),
    }
  }
  const benefitsContent = {
    title: marketingEmailsSection('title'),
    description: marketingEmailsSection('description'),
    benefitsSection:{
      title: benefitsSection('title'),
      benefits:[0,1,2].map((e) => ({
        title: benefitsSection(`benefits.${e}.title`),
        description: benefitsSection(`benefits.${e}.description`),
      }))
    }
  }
  const ctaContent = {
    title: ctaSection('title'),
    description: ctaSection('description'),
    buttons:[0,1].map((e) => ({
      text: ctaSection(`buttons.${e}.text`),
      type: ctaSection(`buttons.${e}.type`),
    }))
  }
  const [isOpen,setIsOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    // Show popup every 5 minutes (300,000 ms)
    // setTimeout(() => setIsOpen(true),3000)
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
  title="Graphic Design Services"
  subtitle="Antsq"
  keywords={["email marketing", "email marketing services", "email campaigns", "email newsletters", "email deliverability", "email engagement"]}
  description="From logos to social creatives, Antsq delivers visually stunning and brand-aligned graphic design solutions for all your needs."
/>
{isOpen && (
        <OfferPopup toggleFunction={() => togglePopup()} />
      )}
        <section className={`w-full primarybg ${
          isOpen ? "filter blur-xs pointer-events-none select-none" : ""
        }`}>
          <Herosection
           data={heroContent}
           />
          <Middle data={middleSectionData} />
          <Last data={benefitsContent} />
          <Footerbanner data={ctaContent} />
          <Footersection />
        </section>
        </>
    )
}

export default Page;