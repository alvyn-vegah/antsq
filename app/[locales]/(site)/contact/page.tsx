'use client'
import Footersection from "@/sections/Footersection";
import Hero from "@/sections/contact/Hero";
import { Seo } from "@/customComponents/seo/Seo";
import { useState,useRef,useEffect } from "react";
import OfferPopup from "@/customComponents/Offerpopup";
import { useTranslations } from "next-intl";

const Page = () => {
  const contactPage = useTranslations('ContactPage');
  const hero = useTranslations('ContactPage.hero');
  const heroContent = {
    title:hero('title'),
    description:hero('description'),
    features:hero.raw('features'),
    buttonText:hero('buttonText'),
    contactForm:contactPage.raw('contactForm'),
    contactInfo:contactPage.raw('contactInfo'),
    socialSection:contactPage.raw('socialSection'),
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
  title="Contact Us"
  subtitle="Antsq"
  keywords={[
    "contact digital marketing agency",
    "get in touch with Antsq",
    "Antsq contact form",
    "reach out to marketing experts",
    "contact web development team"
  ]}
  description="Get in touch with the Antsq team for personalized digital solutions, free consultations, or service inquiries."
/>
{isOpen && (
        <OfferPopup toggleFunction={() => togglePopup()} />
      )}
        <section className={`relative ${
          isOpen ? "filter blur-xs pointer-events-none select-none" : ""
        }`}>
          <Hero data={heroContent} />
         <Footersection />
        </section>
        </>
    )
}

export default Page;