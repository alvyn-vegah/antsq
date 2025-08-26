'use client'
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { Link } from "@/navigation";
import clsx from 'clsx';

type PropType = {
  subTitle:string,
  title:string,
  description:string,
  buttonText:string
}

const Herosection = (props:{data:PropType}) => {
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
        <div className={clsx('md:pt-[10vh] flex flex-col w-full business')}>
            <div className='min-h-[90vh] flex flex-col md:flex-row px-10 md:px-20 md:pl-20 md:pr-5 py-10 relative'>
                {/* left div */}
                <div className="flex flex-col justify-around items-center md:items-start gap-10 w-full md:w-1/2">
                  <div className="flex flex-col items-center md:items-start gap-5">
                    <p ref={ref1} className="text-red-700 text-lg 2xl:text-2xl font-semibold hidden md:block text-center md:text-left">{props.data.subTitle}</p>
                    <p className="font-bold text-4xl md:text-5xl 2xl:text-8xl text-center md:text-left" style={{letterSpacing:"4px"}}>{props.data.title}</p>
                    <p className="font-semibold text-sm md:text-lg 2xl:text-3xl text-stone-900/80 text-center md:text-left" style={{letterSpacing:"1px"}}>{props.data.description}</p>
                  </div>
                 <Link
                   href="/plans-pricing"
                   className={[
                     "rounded-full font-montserrat font-semibold shadow-amber-800 shadow-md text-white w-fit text-xl 2xl:text-4xl z-20 flex gap-1 items-center px-7 2xl:px-10 py-2 2xl:py-6 transition-transform duration-300",
                     isHovered ? "bg-red-700 -translate-y-1 cursor-pointer" : "bg-red-800"
                   ].join(' ')}
                   onMouseEnter={() => setIsHovered(true)}
                   onMouseLeave={() => setIsHovered(false)}
                 >
                      {props.data.buttonText}
                 </Link>
                </div>
                <div className="w-full md:w-2/3 flex justify-start items-center">
                <Image src={'/business/hero.webp'} alt={props.data.title || 'Business Hero Image'} className="w-full md:w-[58vw] h-fit" width={1200} height={800} style={{height:'auto'}} />
                </div>
            </div>
            <div className="relative h-[10vh] pt-10">
            <Image src={'/landing/wave-1.png'} alt="Wave background separator 1" width={1920} height={400} className="w-full h-[400px] absolute bottom-0 opacity-100 z-10" />
      <Image src={'/landing/wave-2.png'} alt="Wave background separator 2" width={1920} height={400} className="w-full h-[400px] absolute bottom-0 opacity-50 z-10" />
      <Image src={'/landing/wave-3.png'} alt="Wave background separator 3" width={1920} height={400} className="w-full h-[400px] absolute bottom-0 opacity-30 z-10" />
            </div>
        </div>
    )
}

export default Herosection;