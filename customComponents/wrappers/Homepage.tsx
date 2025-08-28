'use client'
import React from "react";
import Footersection from "@/sections/Footersection";
import Footerbanner from "@/sections/Footerbanner";
import Lastsection from "@/sections/Lastsection";
import Midsection from "@/sections/Midsection";
import Explanatorysection from "@/sections/Explanatorysection";
import Boxsection from "@/sections/Boxsection";
import Herosubsection from "@/Herosubsection";
import Herosection from "@/sections/Herosection";
import { Seo } from "@/customComponents/seo/Seo";
import { useState,useRef,useEffect } from "react";
import OfferPopup from "@/customComponents/Offerpopup";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const heroSection = useTranslations("homePage.hero");
  const boxSection = useTranslations("homePage.boxSection");
  const explanatory = useTranslations("homePage.explanatory");
  const midSection = useTranslations("homePage.midSection");
  const lastSection = useTranslations("homePage.whatWeDo");
  const footerBanner = useTranslations("homePage.footerBanner");
  const heroContent = {
     title1:heroSection('title1'),
     title2:heroSection('title2'),
     subtitle:heroSection('subtitle'),
     buttonText:heroSection('buttonText'),
  }

  const cards = [0, 1, 2].map((i) => ({
    title: boxSection(`cards.${i}.title`),
    description: boxSection(`cards.${i}.description`),
    buttonText: boxSection(`cards.${i}.buttonText`),
  }));
  const midSectionCards = [0, 1, 2].map((i) => ({
    title: midSection(`cards.${i}.title`),
    description: midSection(`cards.${i}.description`),
    // buttonText: midSection(`cards.${i}.buttonText`),
  }));
  const lastSectionCards = [0, 1, 2,3,4,5].map((i) => ({
    title: lastSection(`flexItems.${i}.title`),
    description: lastSection(`flexItems.${i}.description`),
    buttonText: lastSection(`flexItems.${i}.buttonText`),
  }));
  const footerBannerContent = {
    title:footerBanner('title'),
    description:footerBanner('description'),
    button1:footerBanner('button1'),
    button2:footerBanner('button2')
  }

  const explanatoryContent = {
    title:explanatory('title'),
    description:explanatory('description'),
    buttonText:explanatory('buttonText'),
 }

  const boxContent = {
     title:boxSection('title'),
     sideHead:boxSection('sideHead'),
     sideDescription:boxSection('sideDescription'),
     cards:cards,
  }

  const midContent = {
    title:midSection('title'),
    cards:midSectionCards
  }
  const lastContent = {
    title:lastSection('title'),
    flexItems:lastSectionCards
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false);

useEffect(() => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (isDialogOpen) {
    document.body.style.marginRight = `${scrollbarWidth}px`;
  } else {
    document.body.style.marginRight = '';
  }

  return () => {
    document.body.style.marginRight = '';
  };
}, [isDialogOpen]);
  const [isOpen,setIsOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const togglePopup = () => {
    setIsOpen(!isOpen)
  }
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsOpen(true);
    }, 300000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  
  useEffect(() => {
    const script = document.createElement('script');
   script.src = 'https://cdn.jotfor.ms/agent/embedjs/01984c249cb2766a97effcfb14764f4843e5/embed.js?skipWelcome=1&maximizable=1';
   script.async = true;
   document.body.appendChild(script)
   return () => {
    document.body.removeChild(script)
   }
  },[])
  
  return (
    <>
    <Seo title="Antsq" subtitle="Digital Marketing Services" description="Antsq is your all-in-one digital growth partner, offering expert web development, SEO, brand reputation marketing, social media management, email campaigns, and stunning graphic design to help your business thrive online."  />
    {isOpen && (
        <OfferPopup toggleFunction={() => togglePopup()} />
      )}
    <section className={`w-full min-h-screen overflow-hidden ${
          isOpen ? "filter blur-xs pointer-events-none select-none" : ""
        }`}>
      {/* hero section */}
    <Herosection  data={heroContent} />
    {/* hero sub section */}
    <Herosubsection data={boxContent} />
     {/* box section */}
     <Boxsection data={boxContent.cards} />
     {/* explanatory section */}
     <Explanatorysection data={explanatoryContent} />
     {/* mid section part 1 */}
     <Midsection data={midContent} />
     {/* last section */}
     <Lastsection data={lastContent} />
     {/* pre footer banner */}
     <Footerbanner data={footerBannerContent} />
     {/* footer */}
     <Footersection />
    </section>
    </>
  );
}