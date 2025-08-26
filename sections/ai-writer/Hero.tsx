'use client'
import { ArrowRight } from "lucide-react";
import { Link } from "@/navigation";
import { ReactNode, useState } from "react";

type PropType = {
  title:string[],
  description:ReactNode,
  buttonText:string,
}

const Hero = (props:{data:PropType}) => {
  const [t1,t2,t3] = props.data.title;
    const [isHovered, setIsHovered] = useState(false);
    return (
      <div className="min-h-screen w-full relative flex items-end 2xl:items-center justify-center pt-10 px-10 sm:px-20">  
      <img src={'/landing/heropic-1.svg'} className="opacity-30 w-[70px] h-[70px]  md:w-[150px] md:h-[150px] absolute top-18 inset-x-auto z-10" />
      <img src={'/landing/heropic-2.svg'} className="heropic2 w-[80px] h-[80px]  md:w-[120px] md:h-[120px]  absolute top-16 left-[-80]" />
      <img src={'/landing/heropic-3.svg'} className="w-[12%] h-[150px] absolute bottom-10 z-20" />
      <img src={'/landing/wave-1.png'} className="w-full h-[400px] absolute bottom-0 opacity-100 z-10" />
      <img src={'/landing/wave-2.png'} className="w-full h-[400px] absolute bottom-0 opacity-50 z-10" />
      <img src={'/landing/wave-3.png'} className="w-full h-[400px] absolute bottom-0 opacity-30 z-10" />
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden z-0">
  <img
    src={'/landing/back.jpg'}
    className="w-full h-full object-cover scale-110"
    style={{ transformOrigin: 'center' }}
  />
</div>

      <div className="absolute w-full h-full inset-0 bg-[#f7c2b9] opacity-30 z-5" />
      <div className="w-full max-w-screen-full mx-auto flex flex-col gap-10 items-center md:items-stretch md:flex-row justify-between z-30">
        <div className="w-full sm:w-4/5 lg:w-1/2 flex flex-col items-center md:items-start justify-center gap-7 z-30 md:py-5">
        <p className="font-bold text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl text-center md:text-left">{t1} <span className="text-red-700 m-0 p-0">{t2}</span> {t3}</p>        
        <hr className="border-red-700 w-2/3" />
        <p className="text-center md:text-left text-lg 2xl:text-2xl">{props.data.description}</p>
        <Link href={'/plans-pricing'}>
        <button
  className={[
    'rounded-full shadow-amber-800 flex shadow-md transition-transform duration-300 text-white w-fit px-8 py-3 items-center gap-2 text-xl z-30',
    isHovered ? 'bg-red-700 -translate-y-1 cursor-pointer' : 'bg-red-800'
  ].join(' ')}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  Get Started <ArrowRight className="text-white size-6" />
</button>
        </Link>
        </div>
        <div className="w-full sm:w-2/3 h-full flex items-start justify-end">
          <img src={'/ai-writer/hero.png'} className="w-6/7 h-full pb-5" />
        </div>
     </div>
    </div>
    )
}

export default Hero;