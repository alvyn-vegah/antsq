'use client'
import Herosection from "@/sections/business/Hero";
import Middle from "@/sections/business/Middle";
import Newsletter from "@/sections/business/Newsletter";
import Footersection from "@/sections/Footersection";
import { Seo } from "@/customComponents/seo/Seo";
import { useState,useRef,useEffect } from "react";
import OfferPopup from "@/customComponents/Offerpopup";
import { useTranslations } from "next-intl";

const Page = () => {
  const hero = useTranslations('business.hero');
  const cardSection = useTranslations('business.cardSection');
  const newsLetter = useTranslations('business.newsLetter');

  const heroContent = {
    popupText:hero('popupText'),
    title:hero('title'),
    subtitle:hero('subtitle'),
    buttonText:hero('buttonText')
  }
  const cardContent = {
    heading:cardSection('heading'),
    cards:[0,1,2].map((e) => ({
      title:cardSection(`${e}.title`),
      description:cardSection(`${e}.description`),
      buttonText:cardSection(`${e}.buttonText`),
    }))
  }
  const newsContent = {
    title:newsLetter('title'),
    description:newsLetter('description'),
      namePlaceholder: newsLetter('namePlaceholder'),
      emailPlaceholder: newsLetter('emailPlaceholder'),
      buttonText: newsLetter('buttonText')
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
  title="Social Media Management"
  subtitle="Antsq"
  keywords={["social media marketing", "social media management", "social analytics", "social listening", "community management"]}
  description="Elevate your online presence with Antsq’s social media management services — tailored strategies, consistent growth, and engaging content."
/>
{isOpen && (
        <OfferPopup toggleFunction={() => togglePopup()} />
      )}
        <section className={`w-full ${
          isOpen ? "filter blur-xs pointer-events-none select-none" : ""}`}>
        <Herosection data={heroContent} />
        <Middle data={cardContent} />
        <Newsletter data={newsContent} />
        <Footersection />
        </section>
        </>
    )
}

export default Page;