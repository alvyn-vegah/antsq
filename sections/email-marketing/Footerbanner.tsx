'use client'
import { ChevronRight } from "lucide-react";
import { Link } from "@/navigation";
import { useState } from "react";

type buttons = {
  text:string,
  type:string,
}

type PropType = {
  title:string,
  description:string,
  buttons:buttons[]
}

const Footerbanner = (props:{data:PropType}) => {
    const [isHoveredContact, setIsHoveredContact] = useState(false);
    const [isHoveredPricing, setIsHoveredPricing] = useState(false);
    return (
        <div className="bannerDiv relative business py-10 flex justify-center">
      <div className="banner flex flex-col w-2/3 justify-center gap-10">
      <div className="flex flex-col gap-5  z-10">
        <p className="font-bold text-4xl 2xl:text-6xl text-red-800 text-center overflow-hidden">{props.data.title}</p>
        <p className="font-semibold text-xl 2xl:text-2xl text-stone-800 text-center">{props.data.description}</p>
      </div>
       <div className="flex flex-col md:flex-row items-center md:justify-center gap-10">
       <Link href={'/contact'}>
        <button
          className={[
            'flex items-center rounded-full text-xl 2xl:text-3xl font-bold px-8 py-4 transition-transform duration-300 outline-3 outline-red-800',
            isHoveredContact ? 'bg-gray-100/50 -translate-y-1 cursor-pointer text-red-800 outline-red-800' : 'bg-red-800 text-gray-50'
          ].join(' ')}
          onMouseEnter={() => setIsHoveredContact(true)}
          onMouseLeave={() => setIsHoveredContact(false)}
        >
          <ChevronRight size={28} />{props.data.buttons["0"].text}
        </button>
        </Link>
        <Link href={'/plans-pricing'}>
        <button
          className={[
            'flex items-center text-red-800 2xl:text-3xl font-bold outline-3 py-4 outline-red-800 rounded-full text-xl px-8 transition-transform duration-300',
            isHoveredPricing ? 'bg-red-800 -translate-y-1 cursor-pointer text-white' : 'bg-gray-100/50'
          ].join(' ')}
          onMouseEnter={() => setIsHoveredPricing(true)}
          onMouseLeave={() => setIsHoveredPricing(false)}
        >
          <ChevronRight size={30} />{props.data.buttons["1"].text}
        </button>
        </Link>
       </div>
      </div>
      <img src="/email-marketing/footer-banner-wave.png" alt="background image" className="w-full h-full md:h-full absolute opacity-100 z-0 left-0 -top-[400px] hidden md:block md:-top-65" />
     </div>
    )
}

export default Footerbanner;