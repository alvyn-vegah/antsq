'use client'
import { Card } from "@/customComponents/graphic-design/Card";
import Hero from "@/sections/graphic-design/Hero";
import Footersection from "@/sections/Footersection";
import { Numbercards } from "@/sections/graphic-design/Numbercards";
import { Seo } from "@/customComponents/seo/Seo";
import Middle from "@/sections/graphic-design/Middle";
import Footerbanner from "@/sections/graphic-design/Footerbanner";
import { useState,useRef,useEffect } from "react";
import OfferPopup from "@/customComponents/Offerpopup";
import { useTranslations } from "next-intl";

const Page = () => {
  const hero = useTranslations('graphicDesign.hero');
  const brandLifeSection = useTranslations('graphicDesign.brandLifeSection');
  const featuresSection = useTranslations('graphicDesign.featuresSection');
  const capabilitiesSection = useTranslations('graphicDesign.capabilitiesSection');
  const processSection = useTranslations('graphicDesign.processSection');
  const ctaSection = useTranslations('graphicDesign.ctaSection');
  const [t1,t2,t3] = brandLifeSection('description').split('|');
  const heroContent = {
    subtitle:hero('subtitle'),
    title:hero('title'),
    description:hero('description'),
    additionalText:hero('additionalText'),
    buttonText:hero('buttonText'),
  }
  const brandLifeContent = {
    title:brandLifeSection('title'),
    description:brandLifeSection('description'),
  }
  const featuresContent = {
    features:[0,1,2,3,4,5].map((e) => ({
      title:featuresSection(`features.${e}.title`),
      description:featuresSection(`features.${e}.description`),
    }))
  }
  const capabilitiesContent = {
    title:capabilitiesSection('title'),
    description:capabilitiesSection('description'),
    servicesSlider:[0,1,2,3,4,5,6,7].map((e) => ({
      title:capabilitiesSection(`servicesSlider.${e}.title`),
      content:capabilitiesSection(`servicesSlider.${e}.content`),
      src:capabilitiesSection(`servicesSlider.${e}.src`),
    })),
    buttonText:capabilitiesSection('buttonText'),
  }
  const processContent = {
    title:processSection('title'),
    steps:[0,1,2,3].map((e) => ({
      number:processSection(`steps.${e}.number`),
      title:processSection(`steps.${e}.title`),
      description:processSection(`steps.${e}.description`),
    }))
  }
  const ctaContent = {
    title:ctaSection('title'),
    buttonText:ctaSection('buttonText'),
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
  title="Graphic Design Services"
  subtitle="Antsq"
  keywords={[
    "graphic design services",
    "branding and logo design",
    "custom graphic design",
    "social media creatives",
    "visual identity design"
  ]
  }
  description="From logos to social creatives, Antsq delivers visually stunning and brand-aligned graphic design solutions for all your needs."
/>

    <section className="overflow-x-hidden">
      <Hero data={heroContent} />
      {isOpen && (
        <OfferPopup toggleFunction={() => togglePopup()} />
      )}
      <section className={`p-5 md:p-10 lg:p-10 lg:px-20 primarybg ${
          isOpen ? "filter blur-xs pointer-events-none select-none" : ""
        }`}>
        {/* heading */}
        <div className="flex flex-col gap-5 md:px-5">
          <h3 className="text-4xl 2xl:text-6xl font-bold text-center">
            {brandLifeContent.title}
          </h3>
          <p className="text-lg 2xl:text-3xl text-stone-700 text-center">
            {t1}
            <br className="hidden md:block" /> {t2}
            <br className="hidden md:block" /> {t3}
          </p>
        </div>
        {/* cards */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 py-20">
          <Card
            title={featuresContent.features[0].title}
            content={featuresContent.features[0].description}
          />
          <Card
            title={featuresContent.features[1].title}
            content={featuresContent.features[1].description}
          />
          <Card
            title={featuresContent.features[2].title}
            content={featuresContent.features[2].description}
          />
          <Card
            title={featuresContent.features[3].title}
            content={featuresContent.features[3].description}
          />
          <Card
           title={featuresContent.features[4].title}
           content={featuresContent.features[4].description}
          />
          <Card
            title={featuresContent.features[5].title}
            content={featuresContent.features[5].description}
          />
        </div>
      </section>
      <Middle data={capabilitiesContent} />
      {/* cursor */}
      <Numbercards data={processContent} />
      {/* foot banner */}
      <Footerbanner data={ctaContent} />
      <Footersection />
    </section>
    </>
  );
};

export default Page;
