'use client'
import { Colorboxes } from "@/customComponents/brand-marketing/Colorboxes"
import { useEffect,useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type stepType = {
  title:string,
  description:string,
}

type PropType = {
  subtitle:string,
  title:string,
  description:string,
  additionalText:string,
  processSubtitle:string,
  closingDescription:string,
  steps:stepType[]
}

export const Lastsection = (props:{data:PropType}) => {
  const ref = useRef(null);
  useEffect(() => {
     gsap.to(ref.current,{
      x:150,
      scrollTrigger:{
        trigger:ref.current,
        start:"top bottom",
        end:"bottom top",
        scrub:true,
        markers:false
      }
     })
  },[])
    return (
        <section className="w-full py-10 primarybg z-10">
    <div className="relative max-w-5xl mx-auto flex flex-col items-center px-5 md:px-20">
      <p className="text-2xl md:text-2xl 2xl:text-3xl font-semibold text-red-700 opacity-70 text-center mb-4">
        {props.data.subtitle}
      </p>
      <p className="text-4xl md:text-5xl 2xl:text-6xl font-bold text-center mb-8">
        {props.data.title}
      </p>
      <p className="text-lg md:text-xl 2xl:text-2xl text-center mb-4">
        {props.data.description}
      </p>
      <p className="text-lg md:text-xl 2xl:text-2xl text-center mb-4">
        {props.data.additionalText}
      </p>
      <p className="text-lg md:text-xl 2xl:text-3xl text-center font-bold">
        {props.data.processSubtitle}
      </p>
      <div ref={ref} className="absolute -left-30 inset-0 flex justify-center items-center pointer-events-none select-none">
    <h1
      className="text-[10vw] font-extrabold text-transparent uppercase"
      style={{
        WebkitTextStroke: "1.5px #aaa",
        opacity: 0.5,
        lineHeight: "1",
      }}
    >
      BRAND REPUTATION
    </h1>
  </div>
    </div>
   <Colorboxes data={props.data.steps} />
   <div className="flex justify-center w-full py-5 px-5 md:px-10">
   <p className="text-center text-stone-900/80 text-lg 2xl:text-xl w-full md:w-2/3">{props.data.closingDescription}</p>
   </div>
  </section>
    )
}