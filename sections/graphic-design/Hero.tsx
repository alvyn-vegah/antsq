'use client'
import gsap from "gsap";
import { useRouter } from "@/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { Link } from "@/navigation";
import clsx from 'clsx';

type PropType = {
  subtitle:string,
  title:string,
  description:string,
  additionalText:string,
  buttonText:string,
}

const Hero = (props:{data:PropType}) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
        gsap.from('#leftDiv',{
            x:-200,
            opacity:0,
            duration:1,
            ease:"power1.inOut"
        })
        gsap.from('#rightDiv',{
            x:200,
            opacity:0,
            duration:0.8,
            ease:"power1.inOut"
        })
      }, []);
    return (
        <div className={clsx('md:pt-[10vh] flex flex-col w-full business bg-gradient-to-tr from-[#f9c5bf] via-[#fadedb] to-[#f8f5f5] z-[60]')}>
            <div className='min-h-[100vh] flex flex-col md:flex-row px-10 md:px-20 md:pl-20 md:pr-5 py-10 relative'>
                {/* left div */}
                <div className="flex flex-col justify-around items-center md:items-start h-fit gap-20 w-full md:w-1/2">
                  <div id="leftDiv" className="flex flex-col items-center md:items-start gap-5">
                    <p id="childTitle" className="text-red-700 text-lg 2xl:text-3xl font-semibold hidden md:block text-center md:text-left">{props.data.subtitle}</p>
                    <p className="font-bold text-4xl md:text-5xl 2xl:text-7xl text-center md:text-left" style={{letterSpacing:"2px"}}>{props.data.title}</p>
                    <p className="text-lg 2xl:text-3xl 2xl:max-w-xl text-stone-800 text-center md:text-left">{props.data.description}</p>
                    {props.data.additionalText && <p className="text-lg 2xl:text-3xl text-stone-800 text-center md:text-left">{props.data.additionalText}</p>}
                  </div>
                  <Link
                    href={'/plans-pricing'}
                    className={[
                      'text-gray-100 text-lg 2xl:text-4xl font-semibold w-fit shadow-2xl rounded-full px-7 2xl:px-10 py-2 2xl:py-6 transition-transform duration-300 inline-block',
                      isHovered ? 'bg-red-700 -translate-y-1 cursor-pointer' : 'bg-red-800'
                    ].join(' ')}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {props.data.buttonText}
                  </Link>
                </div>

                <div id="rightDiv" className="w-full md:w-2/3 flex justify-start items-center">
                <Image src="/graphic-design/hero.webp" alt={props.data.title || 'Graphic Design Hero Image'} className="w-full md:w-[58vw] h-fit" width={1200} height={800} style={{height:'auto'}} />
                </div>
            </div>
            <div className="relative h-[10vh] pt-10">
            <img src={'/landing/wave-1.png'} className="w-full h-[400px] absolute bottom-0" />
                <img src={'/landing/wave-2.png'} className="w-full h-[400px] absolute bottom-0 opacity-69" />
                <img src={'/landing/wave-3.png'} className="w-full h-[400px] absolute bottom-0 opacity-50" />
            </div>
        </div>
    )
}

export default Hero;