'use client'
import { Link } from "@/navigation";
import { useState } from "react";

type PropType = {
  title:string,
  subtitle1:string,
  subTitle2:string,
  buttonText:string,
  rightSideTitle:string,
  rightSubTitles:string[],
}

export const Hero = (props:{data:PropType}) => {
  const [t1,t2] = props.data.title.split("|");
  const [t3,t4] = props.data.subTitle2.split("|");
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex flex-col md:flex-row w-full min-h-[100vh] gap-8">
      {/* Left Column */}
      <div className="relative w-full md:w-1/2 flex flex-col items-center md:items-start md:justify-center gap-5 py-10">
        <h1 style={{letterSpacing:'2px'}} className="text-2xl md:text-4xl 2xl:text-7xl font-extrabold text-black text-center md:text-left">
          {t1}
          <br className="hidden md:block" />
          {t2}
        </h1>
        <p className="text-sm lg:text-lg 2xl:text-2xl text-stone-800 text-center md:text-left">
          {props.data.subtitle1}
        </p>
        <p className="text-sm lg:text-lg 2xl:text-2xl text-stone-800 text-center md:text-left">
          {t3}
          <br />
          {t4}
        </p>
        <Link
          href={'/plans-pricing'}
          className={[
            'rounded-full text-sm md:text-lg 2xl:text-3xl px-7 2xl:px-10 shadow-2xl py-3 w-fit z-20 transition-transform duration-300',
            isHovered ? 'bg-red-700 -translate-y-1 cursor-pointer' : 'bg-red-800',
            'text-gray-100'
          ].join(' ')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {props.data.buttonText}
        </Link>
        <img src="/seo/bg-drop.svg" alt="background image" className="absolute opacity-20 w-[200px] bottom-0 -left-30" />
      </div>
      {/* Right Column */}
      <div className="w-full md:w-1/2 flex flex-col justify-start gap-10 z-20 pb-10 md:pb-0 py-10 md:py-20">
        <h2 className="text-2xl md:text-3xl 2xl:text-5xl font-bold text-black text-center md:text-left">
          {props.data.rightSideTitle}
        </h2>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 items-center">
        <ul className="text-lg md:text-xl text-black space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
  <li>
    <span className="inline-block min-w-fit 2xl:text-3xl pr-4 border-b border-[#b71c1c] pb-3">
      {props.data.rightSubTitles[0]}
    </span>
  </li>
  <li>
    <span className="inline-block min-w-fit pr-4 2xl:text-3xl border-b border-[#b71c1c] pb-3">
    {props.data.rightSubTitles[1]}
    </span>
  </li>
  <li>
    <span className="inline-block min-w-fit pr-4 2xl:text-3xl border-b border-[#b71c1c] pb-3">
    {props.data.rightSubTitles[2]}
    </span>
  </li>
</ul>
        <div className="flex justify-end w-1/2">
      <img src="/seo/seoAnt.png" alt="" className="w-full" />
      </div>
        </div>
      </div>
    </div>
  );
};


