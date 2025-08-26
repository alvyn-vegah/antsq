'use client'
import gsap from "gsap"
import { Link } from "@/navigation";
import { useEffect,useRef, useState } from "react"

type PropType = {
  subtitle:string,
  title:string[],
  description:string,
  buttonText:string,
}


export const Hero = (props:{data:PropType}) => {
  const [t1,t2,t3] = props.data.title;
  const ref = useRef(null)
  const lineRef = useRef(null);
  const tl = gsap.timeline();
  const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
    tl.from(ref.current,{
        y:20,
        opacity:0,
        duration:0.8,
        ease:"power1"
    })
    tl.to(lineRef.current,{
        scaleX:1,
        duration:5,
        ease:"power2.out"
    })
    },[])
  return (
    <section className="primarybg w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#8a232b] mb-2">{props.data.subtitle}</h2>
      <div className="flex flex-col items-center">
        <h1 ref={ref} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#3a1818] mb-2 flex items-center">
          {t1}<span className="text-[#f15a29]">{t2}</span> {t3}
        </h1>
        <div ref={lineRef} className="w-48 h-[1px] bg-[#8a232b] mb-6 scale-x-0 origin-left transition-transform" />
      </div>
      <p className="max-w-3xl text-center text-lg md:text-xl text-[#3a1818] mb-10">
        {props.data.description}
      </p>
      <Link href={'/plans-pricing'}>
      <button
        className={[
          'text-white text-xl font-medium px-5 md:px-10 py-2 md:py-4 rounded-full shadow-lg transition-transform duration-300 flex items-center gap-2 inline-block',
          isHovered ? 'bg-red-700 -translate-y-1 cursor-pointer' : 'bg-red-800'
        ].join(' ')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {props.data.buttonText}
        <span className="ml-2 text-2xl">→</span>
      </button>
      </Link>
    </section>
  );
}