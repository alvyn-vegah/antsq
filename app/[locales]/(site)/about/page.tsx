'use client'
import { Footerbanner } from "@/sections/about/Footerbanner";
import { Hero } from "@/sections/about/Hero";
import Middle from "@/sections/about/Middle";
import Footersection from "@/sections/Footersection";
import { Seo } from "@/customComponents/seo/Seo";
import { useTranslations } from "next-intl";

const Page = () => {
  const hero = useTranslations('AboutPage.hero')
  const marketSection = useTranslations('AboutPage.marketingSection')
  const unitySection = useTranslations('AboutPage.unitySection')
  const contactSection = useTranslations('AboutPage.contactSection')
  const heroContent = {
    subtitle:hero('subtitle'),
    title:hero('title').split("|"),
    description:hero("description"),
    buttonText:hero('buttonText')
  }
  const marketingDescription = marketSection('description')
  const contactData = {
    unityTitle:unitySection('title'),
    contactSection:{
      description:contactSection('description'),
      buttonText:contactSection('buttonText')
    }
  }
    return (
        <>
        <Seo
  title="About Us"
  subtitle="Antsq"
  keywords={[
    "about Antsq",
    "digital agency background",
    "marketing agency team",
    "our mission and vision",
    "who we are - Antsq"
  ]
  }
  description="Learn more about Antsq, our mission, team, and the passion behind our digital marketing and web development solutions."
/>

        <section className="md:pt-[10vh] primarybg">
         <Hero data={heroContent} />
        <Middle data={marketingDescription} />
         <Footerbanner data={contactData} />
         <Footersection />
        </section>
        </>
    )
}
export default Page;