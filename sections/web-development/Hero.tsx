'use client'
import { useRef,useEffect, useState } from "react";
import gsap from "gsap";
import { Link } from "@/navigation";
import Image from 'next/image';

const Hero = () => {
    const ref1 = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    if (ref1.current) {
      gsap.from(ref1.current, {
        y: 200,
        opacity: 0,
        duration: 1,
        ease: "elastic.inOut",
      });
    }
  }, []);
    return (
        <section className="webdev w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-12 px-5 md:px-10 lg:px-20 md:min-h-[90vh]">
        <div className="flex-1 flex flex-col gap-6">
          <span ref={ref1} className="uppercase text-sm tracking-widest text-red-700 font-semibold text-center md:text-left">Going Beyond the Possible</span>
          <h1 className="text-3xl md:text-5xl font-bold text-stone-900 leading-tight text-center md:text-left">
            Web designing & development <br className="hidden md:block" /> the smart way.
          </h1>
          <p className="text-lg text-stone-700 max-w-xl text-center md:text-left">
            Website design & development services that drive leads & sales.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link href={'/contact'}>
            <button
              className={[
                'w-fit text-white font-semibold px-6 py-3 rounded-full transition-transform duration-300 inline-block',
                isHovered ? 'bg-red-700 -translate-y-1 cursor-pointer' : 'bg-red-800'
              ].join(' ')}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Schedule a Demo
            </button>
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end mt-8 md:mt-0">
          {/* Placeholder for hero image/illustration */}
          <div className="flex items-center justify-center">
            <Image src="/web-development/hero.webp" alt="Web Development Hero" width={600} height={400} style={{height:'auto', width:'100%'}} />
          </div>
        </div>
      </section>
    )
}

export default Hero;