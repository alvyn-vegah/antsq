"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Servicecard from "./Servicecard";
import { Link } from "@/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

type featureType = {
  title:string,
description:string,
}

type PropType = {
  features:featureType[],
  help:{
    title:string,
    animeText:string,
    description:string,
    buttonText:string,
  }
}

const Midsection = (props:{data:PropType}) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const imgRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false);
  const phrases = props?.data?.help?.animeText?.split('|');
  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setDisplayText((prev) =>
        isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);
      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000); // pause before deleting
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const typingTimer = setTimeout(handleType, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [displayText, isDeleting, loopNum]);

  useEffect(() => {
  gsap.from(imgRef.current,{
    y:150,
    opacity:0,
    duration:1,
    ease:"power2.inOut",
    scrollTrigger:{
      trigger:imgRef.current,
      start:"top 80%",
      toggleActions:"play none none none"
    }
  })
  },[])

  return (
    <div className="primarybg flex flex-col w-full md:py-10 md:pt-30 pb-20 gap-20 px-5 sm:px-10 md:px-20">
      <div className="flex flex-col md:flex-row gap-3 w-full md:justify-center">
        <Servicecard
          src="/ai-writer/card-one.png"
          title={props.data.features[0].title}
          desc={props.data.features[0].description}
        />
        <Servicecard
          src="/ai-writer/card-two.png"
          title={props.data.features[1].title}
          desc={props.data.features[1].description}
        />
        <Servicecard
          src="/ai-writer/card-three.png"
          title={props.data.features[2].title}
          desc={props.data.features[2].description}
        />
      </div>

      {/* Explanation Section */}
      <div className="flex flex-col md:flex-row w-full gap-2 md:gap-5">
        <div className="flex flex-col gap-5 w-full md:w-3/4 lg:w-2/3">
          <h1 className="text-3xl md:text-5xl font-extrabold text-center md:text-left">{props.data.help.title}</h1>
          <h1 className="text-3xl md:text-5xl text-center md:text-left font-bold text-red-800 min-h-[100px]">
            {displayText}
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-md w-full md:w-3/4  text-justify">
          {props.data.help.description}
          </p>  
          <div className="flex justify-center md:justify-start">
            <Link href={'/plans-pricing'}>
            <button
              className={[
                'text-white transition-transform duration-300 rounded-full px-6 py-2 text-lg shadow-2xl w-fit flex gap-2 items-center',
                isHovered ? 'bg-red-700 -translate-y-1 cursor-pointer' : 'bg-red-800'
              ].join(' ')}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {props.data.help.buttonText} <ArrowRight className="text-white" size={28} />
            </button>
            </Link>
          </div>
        </div>  
        <div ref={imgRef} className="flex w-full items-center justify-center">
          <Image
            src="/ai-writer/hero.png"
            alt="An illustration showing the AI writer generating content on a digital interface."
            width={1000}
            height={800}
            className="h-full w-1/2 md:max-h-fit md:w-fit bg-gray-50/30 shadow-2xl rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Midsection;
