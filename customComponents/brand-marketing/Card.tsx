'use client'
import { ArrowRightCircle } from 'lucide-react';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Link } from '@/navigation';
gsap.registerPlugin(ScrollTrigger)

interface CardProps {
  title: string;
  description: string;
  buttonText?: string;
}

const Card = ({ title, description, buttonText = "Request a Quote" }: CardProps) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
       gsap.from(ref.current,{
         y:20,
         opacity:0,
         duration:0.7,
         ease:"power1.inOut",
         scrollTrigger:{
          trigger:ref.current,
          start:"top 70%",
          toggleActions:"play none none none"
         }
       })
    },[])
  return (
    <div ref={ref} className="w-full md:w-1/3 cardbg flex flex-col items-center justify-between gap-5 p-7 rounded-xl">
      <div className="flex flex-col gap-4">
      <p className="text-3xl 2xl:text-4xl font-bold text-center">{title}</p>
      <p className="text-md 2xl:text-xl text-center">{description}</p>
      </div>
      <Link href={'/contact'}>
      <div
        className={[
          "text-md 2xl:text-2xl lg:text-xl flex justify-center items-center gap-2 font-bold text-gray-100 rounded-full w-full px-3 2xl:px-10 lg:px-5 py-2 lg:py-3 transition-transform duration-300",
          isHovered ? "bg-red-700 -translate-y-1 cursor-pointer" : "bg-red-800"
        ].join(' ')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p>{buttonText}</p> <ArrowRightCircle className="text-white" size={28}/>
      </div>
      </Link>
    </div>
  );
};

export default Card;
