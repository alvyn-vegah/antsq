'use client'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import { useEffect,useRef } from "react";
import Image from 'next/image';

const Middle = (props:{data:string}) => {
    const orangeBg = useRef(null);
    const circleBg = useRef(null);
    const img = useRef(null);
    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger:{
                trigger:orangeBg.current,
                start:"top 80%",
                toggleActions:"play none none none",
            }
        })
    tl.from(orangeBg.current,{
        x:-150,
        duration:1,
        ease:"power2.inOut",
    })
    gsap.to(circleBg.current,{
        rotation:-90,
        duration:1,
        ease:"power2.inOut",
        scrollTrigger:{
            trigger:circleBg.current,
            start:"top 80%",
            toggleActions:"play none play none",
            scrub:true
        }
    })
    gsap.to(img.current,{
        y:-100,
        duration:1.5,
        ease:"power2.inOut",
        scrollTrigger:{
            trigger:img.current,
            start:"top bottom%",
            toggleActions:"play none play none",
            scrub:true
        }
    })
    },[])
    return (
        <div className="w-full bg-[#fbeeed] py-12 px-4 flex flex-col lg:flex-row items-center justify-center gap-8">
        {/* Left: Illustration */}
        <div className="relative flex-shrink-0 w-full max-w-md flex items-center justify-center mb-8 lg:mb-0 py-20 md:py-0">
          {/* Orange background shape */}
          <div className="absolute -left-10 -top-10 w-[350px] h-[350px] rounded-tl-[200px] rounded-br-[100px] opacity-80 -z-10 hidden md:block" />
          {/* Dummy illustration image */}
          <Image
          ref={img}
            src="/about/middle.png"
            alt="AntsQ Marketing"
            className="w-full mx-auto left-0 z-20"
            width={800}
            height={400}
            style={{width:'100%', height:'auto'}}
          />
           <img
           ref={circleBg}
            src="/about/circle-pattern.png"
            alt="background illustration"
            className="w-64 md:w-80 mx-auto absolute z-10 opacity-70"
          />
           <img
           ref={orangeBg}
            src="/about/orange-bg.png"
            alt="background design"
            className="w-64 h-80 md:w-80 absolute -left-30 z-0 opacity-70"
          />
        </div>
        {/* Right: Text */}
        <div className="max-w-2xl text-center lg:text-left">
          <p className="text-lg md:text-xl text-[#3a1818]">
            {props.data}
          </p>
        </div>
      </div>
    )
}

export default Middle;