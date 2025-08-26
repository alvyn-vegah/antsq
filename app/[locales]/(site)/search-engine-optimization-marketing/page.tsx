'use client'
import Footersection from "@/sections/Footersection";
import { Hero } from "@/sections/seo-optimization/Hero";
import { Middle } from "@/sections/seo-optimization/Middle";
import { Seo } from "@/customComponents/seo/Seo";
import { useState,useRef,useEffect } from "react";
import OfferPopup from "@/customComponents/Offerpopup";
import { useTranslations } from "next-intl";

const Page = () => {
  const seo = useTranslations('seo');
  const hero = useTranslations('seo.hero');
  const explanatory = useTranslations('seo.explanatory');
  const rightSubTitles = [0,1,2].map((e) => (hero(`rightSubTitles.${e}`)))
  const heroContent = {
    title:hero('title'),
    subtitle1:hero('subtitle1'),
    subTitle2:hero('subtitle2'),
    buttonText:hero('buttonText'),
    rightSideTitle:hero('rightSideTitle'),
    rightSubTitles:rightSubTitles
  }
  const explanatoryContent = {
    title1:explanatory('title1'),
    title2:explanatory('title2'),
  }
  const cardsTitle = seo('cardSection.title');
  const cards = [0,1,2,3].map((e) => ({
    title:seo(`cardSection.cards.${e}.title`),
    description:seo(`cardSection.cards.${e}.description`),
    buttonText:seo(`cardSection.cards.${e}.buttonText`),
  }))
  const [isOpen,setIsOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    // Show popup every 5 minutes (300,000 ms)
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
  title="SEO Services"
  subtitle="Antsq"
  keywords={[
    "SEO services",
    "search engine optimization",
    "on-page SEO",
    "technical SEO",
    "local SEO services",
    "SEO agency in India",
    "Google ranking services"
  ]
  }
  description="Rank higher and grow faster with Antsq’s result-oriented SEO services — keyword strategy, content optimization, technical audits, and more." />
{isOpen && (
        <OfferPopup toggleFunction={() => togglePopup()} />
      )}
        <section className={`${
          isOpen ? "filter blur-xs pointer-events-none select-none" : ""
        }`}>
        <div className="w-full relative">
        <div className="pt-[10vh] p-8 px-10 md:px-20 darker-peach ">
         <Hero data={heroContent} />
        </div>
        <img className="absolute bottom-0 opacity-100 w-full h-1/2" src="/landing/wave-1.png" alt="" />
           <img className="absolute bottom-0 w-full opacity-50 h-1/2" src="/landing/wave-2.png" alt="" />
           <img className="absolute bottom-0 w-full opacity-30 h-1/2" src="/landing/wave-3.png" alt="" />
        </div>
        {/* sub section heading */}
        <div className="primarybg flex flex-col items-center py-10">
        <div className="w-3/4 flex flex-col gap-10">
            <p className="text-xl 2xl:text-3xl font-semibold text-stone-800 text-center">{explanatoryContent.title1}</p>
            <p className="text-xl 2xl:text-3xl font-semibold text-stone-800/80 text-center">{explanatoryContent.title2}</p>
            <p className="text-4xl md:text-6xl 2xl:text-7xl text-stone-800 font-bold text-center pt-20">{cardsTitle}</p>
        </div>
        <Middle data={cards} />
        </div>
        <Footersection />
        </section>
        </>
    )
}

export default Page;