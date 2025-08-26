"use client";

import { useEffect, useRef,useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footersection from "@/sections/Footersection";
import { Link } from "@/navigation";
import OfferPopup from "@/customComponents/Offerpopup";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

type stepType = {
  number:string,
  title:string,
  description:string,
}

export default function Home() {
  const hero = useTranslations("webDevelopmentPage.hero");
  const servicesSection = useTranslations("webDevelopmentPage.servicesSection");
  const processSection = useTranslations("webDevelopmentPage.processSection");
  const heroContent = {
    subtitle:hero('subtitle'),
    title:hero('title'),
    description:hero('description'),
    technologies:hero.raw('technologies'),
    buttons:[0,1].map((e) => ({
      text:hero(`buttons.${e}.text`),
      type:hero(`buttons.${e}.type`)
    }))
  }
  const servicesContent = {
     title:servicesSection('title'),
     subtitle:servicesSection('subtitle'),
     services:[0,1,2,3,4,5].map((e) => ({
      title:servicesSection(`services.${e}.title`),
      description:servicesSection(`services.${e}.description`),
      features:servicesSection.raw(`services.${e}.features`)
     }))
  }
  const processContent = {
    title:processSection('title'),
    subtitle:processSection('subtitle'),
    steps:processSection.raw('steps'),
  }
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.utils.toArray(".fade-in-section").forEach((el) => {
      const element = el as HTMLElement;
      gsap.fromTo(
        element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

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

  const serviceIcons = [ "🤖", "⚡", "🎨", "🚀", "📊", "🔧" ]

  return (
    <main className="primarybg text-[#333]">
      {/* Hero Section */}
      {isOpen && (
        <OfferPopup toggleFunction={() => togglePopup()} />
      )}
      <section ref={heroRef} className={`pt-40 px-6 md:px-20 grid md:grid-cols-2 gap-10 items-center${
          isOpen ? "filter blur-xs pointer-events-none select-none" : ""
        }`}>
        <div>
          <p className="text-red-700 2xl:text-3xl uppercase font-semibold tracking-wide mb-2">
            {heroContent.subtitle}
          </p>
          <h1 className="text-4xl md:text-5xl 2xl:text-7xl font-bold leading-tight mb-4">
            {heroContent.title}
          </h1>
          <p className="text-gray-600 2xl:text-2xl mb-6">
            {heroContent.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {heroContent.technologies.map(
              (label:string, idx:number) => (
                <span key={idx} className="bg-white border-2 border-[#f0e6e1] text-red-800 rounded-full 2xl:text-xl px-4 py-1 2xl:px-10 2xl:py-4 font-semibold shadow-sm hover:bg-red-800 hover:text-white transition">
                  {label}
                </span>
              )
            )}
          </div>

          <div className="flex gap-4 flex-wrap pt-5 2xl:pt-10">
           <Link href={'/contact'}>
           <span
              className="bg-red-800 text-white px-6 py-3 2xl:px-10 2xl:py-4 2xl:text-xl rounded-full font-semibold hover:bg-[#c54545] transition shadow-lg">
              {heroContent.buttons[0].text}
            </span>
           </Link>
           <Link href={'/plans-pricing'}>
           <span
              className="border-2 border-red-800 text-red-800 px-6 py-3 2xl:px-10 2xl:py-4 2xl:text-xl rounded-full font-semibold hover:bg-red-800 hover:text-white transition">
              {heroContent.buttons[1].text}
            </span>
           </Link>
          </div>
        </div>

        <div className="relative">
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:rotate-0 transition-transform rotate-y-[-10deg]">
            <div className="flex space-x-2 mb-4">
              <div className="w-3 h-3 bg-red-800 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <pre className="text-sm 2xl:text-2xl text-gray-700">
{`import { AI } from 'antsq-dev';
import { React, Node } from 'stack';

const buildApp = AI.accelerate({
  framework: 'MERN',
  deployment: 'cloud-native',
  optimization: 'smart'
});

// 70% faster development ⚡`}
            </pre>
            <div className="absolute -bottom-4 -right-4 bg-red-700 text-white w-20 h-20 2xl:w-30 2xl:h-30 flex items-center justify-center text-4xl 2xl:text-6xl rounded-full animate-bounce">
              🐜
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" className="primarybg py-20 px-6 md:px-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl 2xl:text-6xl font-bold mb-4">{servicesContent.title}</h2>
          <p className="text-gray-600 2xl:text-3xl">
            {servicesContent.subtitle}
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {servicesContent.services.map((service, i) => (
            <div
              key={i}
              className="fade-in-section bg-gray-50/50 border border-[#f0e6e1] rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="text-4xl mb-4">{serviceIcons[i]}</div>
              <h3 className="text-xl 2xl:text-3xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 2xl:text-xl mb-4">{service.description}</p>
              <ul className="text-sm 2xl:text-lg text-gray-600 list-disc list-inside space-y-1">
                {service.features.map((feat:string, idx:number) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} id="process" className="primarybg py-20 px-6 md:px-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl 2xl:text-6xl md:text-4xl font-bold mb-4">{processContent.title}</h2>
          <p className="text-gray-600 2xl:text-3xl">
            {processContent.subtitle}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto before:absolute before:inset-y-0 before:left-1/2 before:w-1 before:bg-gradient-to-b before:from-red-800 before:to-red-700">
          {processContent?.steps?.map((step:stepType, index:number) => (
            <div
              key={index}
              className={`fade-in-section flex flex-col md:flex-row items-center mb-20 relative ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-1/2 2xl:text-2xl transform -translate-x-1/2 z-10 bg-red-800 text-white w-14 h-14 2xl:w-20 2xl:h-20 rounded-full flex items-center justify-center font-bold border-4 border-white">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="bg-gray-50 p-6 px-15 rounded-xl shadow-md md:w-1/2 z-0 mx-6">
                <h3 className="text-lg 2xl:text-4xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 2xl:text-2xl">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footersection />
    </main>
  );
}