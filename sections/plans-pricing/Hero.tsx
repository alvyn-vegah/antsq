'use client'
import gsap from "gsap";
import { useEffect } from "react";
import Image from "next/image";

type PropType = {
  title:string,
  subtitle:string,
  description:string
  additionalText:string,
  note:string,
}

const Hero = (props:{data:PropType}) => {
    const tl = gsap.timeline();
    useEffect(() => {
    tl.from('.sub-head',{
        y:20,
        opacity:0,
        duration:0.8,
        ease:"power1"
    })
    tl.from('.heading',{
        y:20,
        opacity:0,
        duration:0.5,
        ease:"power1"
    },0.2)
    },[])
    return (
      <div className="min-h-screen w-full relative flex items-start 2xl:items-center justify-center pt-10 px-10 sm:px-20">
      <Image src={'/landing/wave-1.png'} alt="Wave background separator 1" width={1920} height={400} className="w-full h-[400px] absolute bottom-0 opacity-100 z-10" />
      <Image src={'/landing/wave-2.png'} alt="Wave background separator 2" width={1920} height={400} className="w-full h-[400px] absolute bottom-0 opacity-50 z-10" />
      <Image src={'/landing/wave-3.png'} alt="Wave background separator 3" width={1920} height={400} className="w-full h-[400px] absolute bottom-0 opacity-30 z-10" />
      <Image id="bg" src={'/landing/back.jpg'} alt="Hero section background" layout="fill" objectFit="cover" className="absolute min-h-[100vh] top-0 left-0 -z-10" />
      <div className="absolute w-full h-full inset-0 bg-[#f7c2b9] opacity-30 z-0" />
      <div className="flex flex-col items-center md:pt-10 gap-4 z-20">
        <h1 className="heading text-5xl md:text-6xl 2xl:text-7xl font-extrabold text-stone-800 text-center px-5 border-b-2 border-[#B71C1C] py-5">{props.data.title}</h1>
        <h2 className="sub-head text-2xl md:text-4xl 2xl:text-5xl font-bold text-stone-900 text-center mt-2 mb-4">{props.data.subtitle}</h2>
        <p className="text-lg md:text-xl text-stone-700 text-center max-w-3xl mb-6">
          {props.data.description}
        </p>
        <h3 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-stone-900 text-center mb-2 z-50">{props.data.additionalText}</h3>
        <p className="text-xl 2xl:text-2xl text-stone-800 text-center z-50 font-semibold">{props.data.note}</p>
        </div>
    </div>
    )
}

export default Hero;