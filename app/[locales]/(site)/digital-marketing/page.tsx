"use client"
import React, { useState,useRef,useEffect } from "react"
import Footersection from "@/sections/Footersection"
import { Link } from "@/navigation";
import OfferPopup from "@/customComponents/Offerpopup"
import { useTranslations } from "next-intl";

export default function AIMarketingHero() {
  const hero = useTranslations('digitalMarketingPage.hero');
  const marketing = useTranslations('digitalMarketingPage.marketingIntelligence');
  const whyChooseSection = useTranslations('digitalMarketingPage.whyChooseSection');
  const resultsSection = useTranslations('digitalMarketingPage.resultsSection');
  const heroContent = {
    title:hero('title'),
    description:hero('description'),
    stats:[0,1,2,3].map((i) => ({
      value:hero(`stats.${i}.value`),
      label:hero(`stats.${i}.label`),
    })),
    buttons:[0,1].map((i) => ({
      text:hero(`buttons.${i}.text`),
      type:hero(`buttons.${i}.type`),
    }))
  }
  const marketingContent = {
    title:marketing('title'),
    badge:marketing('badge'),
    metrics:[0,1,2].map((i) => ({
      label:marketing(`metrics.${i}.label`),
      value:marketing(`metrics.${i}.value`),
      change:marketing(`metrics.${i}.change`),
      changeType:marketing(`metrics.${i}.changeType`),
    })),
    note:marketing('note'),
  }
  const whyChooseContent = {
    title:whyChooseSection('title'),
    subtitle:whyChooseSection('subtitle'),
    features:[0,1,2].map((i) => ({
      title:whyChooseSection(`features.${i}.title`),
      description:whyChooseSection(`features.${i}.description`),
    }))
  }
  const resultsContent = {
    title:resultsSection('title'),
    stats:[0,1,2,3].map((i) => ({
      label:resultsSection(`stats.${i}.label`),
      value:resultsSection(`stats.${i}.value`),
    })),
  }
  
  const [isOpen,setIsOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
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
    {isOpen && (
        <OfferPopup toggleFunction={() => togglePopup()} />
      )}
    <section className={`w-full primarybg text-stone-900 px-4 md:px-20 pt-[15vh] pb-20 ${
          isOpen ? "filter blur-xs pointer-events-none select-none" : ""
        }`}>
      <div className="max-w-full mx-auto grid md:grid-cols-2 items-center gap-10">
        <div>
          <h1 className="text-3xl md:text-5xl 2xl:text-7xl font-bold mb-6">
            {heroContent.title}
          </h1>
          <p className="text-stone-700/80 text-lg 2xl:text-2xl mb-8">
            {heroContent.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 2xl:pt-10">
            {heroContent.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white text-red-800 rounded-xl p-4 2xl:p-8 text-center shadow hover:shadow-md transition"
              >
                <div className="text-2xl 2xl:text-3xl font-bold">{stat.value}</div>
                <div className="text-sm 2xl:text-xl text-stone-800/80 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href={'/plans-pricing'}>
            <span
              className="bg-red-800 text-white hover:bg-red-700 font-semibold px-6 py-3 2xl:text-2xl rounded-full shadow-md"
            >
              {heroContent.buttons[0].text}
            </span>
            </Link>
            <Link  href="/contact">
            <span
              className="border-2 border-red-800 text-red-800 bg-gray-50/90 hover:text-white 2xl:text-2xl hover:bg-red-800 font-semibold px-6 py-3 rounded-full transition"
            >
              {heroContent.buttons[1].text}
            </span>
            </Link>
          </div>
        </div>
        
        {/* marketing */}

        <div className="bg-white text-red-800 rounded-2xl p-6 shadow-lg relative 2xl:py-10">
          <span className="absolute -top-4 -right-4 bg-red-700 text-white text-xs 2xl:text-lg font-bold px-3 py-1 rounded-full">
            🤖 {marketingContent.badge}
          </span>
          <div className="border-b border-red-100 pb-4 mb-4 2xl:text-4xl flex justify-between items-center">
            <h3 className="font-bold">{marketingContent.title}</h3>
          </div>

          {marketingContent.metrics.map((item, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-red-100 last:border-none">
              <span className="text-sm 2xl:text-xl text-stone-800/80">{item.label}</span>
              <span className="font-bold">
                {item.value}
                <span className="ml-1 text-green-600 text-xs 2xl:text-xl">↗ {item.value}</span>
              </span>
            </div>
          ))}

          <div className="text-xs 2xl:text-lg text-center text-stone-800/80 mt-4">
            {marketingContent.note}
          </div>
        </div>
      </div>
    </section>
    {/* WHY CHOOSE US SECTION */}
    <section className="w-full primarybg text-red-800 px-4 md:px-8 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl 2xl:text-6xl font-bold mb-6">
            {whyChooseContent.title}
          </h2>
          <p className="text-lg 2xl:text-2xl text-stone-800/80 max-w-2xl mx-auto mb-12">
            {whyChooseContent.subtitle}
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {whyChooseContent.features.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-50/90 2xl:p-10 rounded-xl border border-red-100 shadow-sm hover:shadow-lg transition"
              >
                <h3 className="text-xl 2xl:text-3xl font-semibold mb-2">{item.title}</h3>
                <p className="text-stone-800/80 text-sm 2xl:text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUCCESS METRICS SECTION */}
      <section className="w-full darker-peach text-red-800 px-4 md:px-8 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl 2xl:text-6xl font-bold mb-10">
            {resultsContent.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {resultsContent.stats.map((stat, i) => (
              <div
                key={i}
                className=" backdrop-blur-sm rounded-xl py-8 px-6 border border-white/20 text-red-800 bg-gray-50/80 shadow-lg"
              >
                <div className="text-3xl 2xl:text-4xl font-bold mb-2">{stat.value}</div>
                <p className="text-sm 2xl:text-lg text-stone-900/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    <Footersection />
    </>
  )
}
