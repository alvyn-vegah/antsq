'use client'
import { ArrowRightCircle } from "lucide-react";
import { Link } from "@/navigation";
import { useEffect } from "react";
import gsap from "gsap";

const Footerbanner = () => {
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
        <section className="w-full bg-gray-50/30 py-8 px-4 flex flex-col items-center shadow-2xl">
        <div className="flex flex-col md:w-3/4">
        <div className="bg-red-800 rounded-xl w-full flex flex-col md:flex-row items-center justify-between p-8 gap-6 min-h-[40vh]">
          <div className="text-white text-2xl md:text-4xl font-bold mb-4 md:mb-0 w-full md:w-1/2 text-center md:text-left">Ready to Build a stunning website that gets you customers</div>
          <div className="w-full md:w-1/2 flex justify-center">
          <Link href={'/plans-pricing'}>
          <button className="bg-white text-stone-900 flex gap-2 items-center duration-200 hover:cursor-pointer hover:-translate-y-1 font-semibold px-6 py-3 rounded transition-all text-lg">Get Started <ArrowRightCircle size={26} /> </button>
          </Link>
          </div>
        </div>
        </div>
      </section>
    )
}

export default Footerbanner;