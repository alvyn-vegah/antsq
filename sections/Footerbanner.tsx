'use client'
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { Link } from "@/navigation";

type Proptype = {
  title:string,
  description:string,
  button1:string,
  button2:string
}

const Footerbanner = (props:{data:Proptype}) => {
  const [isHoveredContact, setIsHoveredContact] = useState(false);
  const [isHoveredPricing, setIsHoveredPricing] = useState(false);
  useEffect(() => {
   gsap.fromTo('.banner',{
            y:"10vh",
            opacity:0,
   },{
    opacity:1,
      y:"0vh",
      duration:1,
      ease:"power1.inOut",
      scrollTrigger:{
         trigger:'.bannerDiv',
         start:"top 80%",
         toggleActions:"play none none none"
      }
   })
  },[])
    return (
        <div className="bannerDiv bg-red-800 py-10 flex justify-center">
      <div className="banner flex flex-col w-2/3 justify-center gap-10">
      <div className="flex flex-col gap-5">
        <p className="font-bold text-4xl 2xl:text-5xl text-gray-100 text-center overflow-hidden font-poppins">{props.data.title}</p>
        <p className="font-semibold text-xl 2xl:text-2xl text-gray-200 font-noto text-center">{props.data.description}</p>
      </div>
       <div className="flex flex-col md:flex-row items-center md:justify-center gap-10 font-montserrat">
        <Link href={'/contact'}>
        <button
          className={[
            "text-red-800 flex items-center bg-gray-50 transition-transform duration-300 rounded-full text-xl py-4 px-8",
            isHoveredContact ? "bg-[#FFEEEB] -translate-y-1 cursor-pointer" : ""
          ].join(' ')}
          onMouseEnter={() => setIsHoveredContact(true)}
          onMouseLeave={() => setIsHoveredContact(false)}
        >
          <ChevronRight size={28} />
          {props.data.button1}
        </button>
        </Link>
        <Link href={'/plans-pricing'}>
        <button
          className={[
            "text-white flex items-center py-4 px-8 bg-red-800 border-2 border-white rounded-full text-xl transition-transform duration-300",
            isHoveredPricing ? "bg-gray-100 -translate-y-1 cursor-pointer text-red-700" : ""
          ].join(' ')}
          onMouseEnter={() => setIsHoveredPricing(true)}
          onMouseLeave={() => setIsHoveredPricing(false)}
        >
          <ChevronRight size={30} />
          {props.data.button2}
        </button>
        </Link>
       </div>
      </div>
     </div>
    )
}

export default Footerbanner;