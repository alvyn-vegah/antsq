'use client'
import Footersection from "@/sections/Footersection";
import Hero from "@/sections/plans-pricing/Hero";
import { Plans } from "@/sections/plans-pricing/Plans";
import { SeoPlans } from "@/sections/plans-pricing/SeoPlans";
import { Seo } from "@/customComponents/seo/Seo";
import { useTranslations } from "next-intl";

const Page = () => {
  const hero = useTranslations('pricingPage.hero');
  const socialMediaSection = useTranslations('pricingPage.socialMediaSection');
  const seoSection = useTranslations('pricingPage.seoSection');
  const heroContent = {
    title:hero('title'),
    subtitle:hero('subtitle'),
    description:hero('description'),
    additionalText:hero('additionalText'),
    note:hero('note'),
  }
  const socialMediaContent = {
    title:socialMediaSection('title'),
    subtitle:socialMediaSection('subtitle'),
    buttonText:socialMediaSection.raw('buttonText'),
    discount:socialMediaSection('discount'),
    planTypes:socialMediaSection.raw('planTypes'),
    cartStatus:socialMediaSection('cartStatus').split('|'),
  }
  const seoContent = {
    title:seoSection('title'),
    subtitle:seoSection('subtitle'),
    buttonText:seoSection.raw('buttonText'),
    discount20:seoSection('discount20'),
    discount10:seoSection('discount10'),
    additionalText:seoSection('additionalText'),
    planTypes:seoSection.raw('planTypes'),
    cartStatus:seoSection('cartStatus').split('|'),
  }
  
  return (
    <>
    <Seo
  title="Plans & Pricing"
  subtitle="Antsq"
  keywords={[
    "digital marketing pricing",
    "SEO service cost",
    "web development plans",
    "affordable marketing packages",
    "pricing for graphic design services"
  ]
  }
  description="Explore our transparent and flexible pricing plans for digital marketing, web development, and design services at Antsq."
/>
    <section className="w-full min-h-[80vh] flex flex-col items-center justify-start overflow-hidden">
      <Hero data={heroContent} />
      <Plans data={socialMediaContent} />
      <SeoPlans data={seoContent} />
      <Footersection />
    </section>
    </>
  );
};

export default Page;