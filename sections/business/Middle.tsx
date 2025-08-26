'use client'
import Image from 'next/image';
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from '@/navigation';
gsap.registerPlugin(ScrollTrigger)

type cardType = {
  title:string,
  description:string,
  buttonText:string
}

type PropType = {
  heading:string,
  cards:cardType[],
}

export const Middle = (props:{data:PropType}) => {
  const [c1,c2] = props.data.cards[0].title.split("|");
  const [c3,c4] = props.data.cards[1].title.split("|");
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    useEffect(() => {
        gsap.from(ref1.current, {
            opacity:"0",
            y:"150",
            duration:0.8,
            ease:"power1.out",
            scrollTrigger:{
                trigger:ref1.current,
                start:"top 80%",
                toggleActions:'play none none none'
            }
        })
        gsap.from(ref2.current,{
            opacity:"0",
            y:"150",
            duration:0.8,
            ease:"power1.out",
            scrollTrigger:{
                trigger:ref2.current,
                start:"top 80%",
                toggleActions:'play none none none'
            }
        })
        gsap.from(ref3.current,{
            opacity:"0",
            y:"150",
            duration:0.8,
            ease:"power1.out",
            scrollTrigger:{
                trigger:ref3.current,
                start:"top 80%",
                toggleActions:'play none none none'
            }
        })
        },[])
    return (
        <div className="flex flex-col py-20 px-5 lg:px-10 primarybg overflow-x-hidden overflow-y-hidden">
          <h1 className='text-3xl text-center text-red-800 font-bold 2xl:text-7xl'>{props.data.heading}</h1>
{/* one */}
             <div ref={ref1} className="flex flex-col md:flex-row items-center pb-10 min-h-[40vh]">
             <div className="flex flex-col gap-4 2xl:gap-10 h-3/4 w-full md:w-1/2  bg-white/50 bg-opacity-50 rounded-lg p-10">
            <div className="flex flex-col gap-5 2xl:gap-9">
                <p className="font-bold text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl">{c1} <br className="hidden md:block"/>{c2}</p>
                <p className="text-neutral-600 text-lg md:text-xl 2xl:text-2xl">{props.data.cards[0].description}</p>
            </div>
            <Link href={'/contact'} className='py-2 transition-transform duration-200'>
            <span
              className={[
                'rounded-full text-sm md:text-lg 2xl:text-2xl shadow-2xl py-3 w-fit px-7 transition-transform duration-300',
                isHovered1 ? 'bg-orange-600 -translate-y-1 cursor-pointer' : 'bg-orange-700',
                'text-gray-100'
              ].join(' ')}
              onMouseEnter={() => setIsHovered1(true)}
              onMouseLeave={() => setIsHovered1(false)}
            >
              {props.data.cards[0].buttonText}
            </span>
            </Link>
            </div>
            <div className="w-full md:w-1/2 flex justify-end items-center ">
                <Image src={'/seo/arrow.webp'} alt="SEO Arrow" className="w-7/8 max-h-fit p-5 md:p-10" width={400} height={400} style={{height:'auto', width:'100%'}} />
            </div>
            </div>
{/* two */}
            <div ref={ref2} className="flex flex-col items-center md:flex-row pb-10 min-h-[40vh]">
            <div className="w-full md:w-1/2 hidden md:flex justify-start items-center">
                <Image src={'/seo/stocks.webp'} alt="SEO Stocks" className="w-7/8 max-h-fit p-5 md:p-10" width={400} height={400} style={{height:'auto', width:'100%'}} />
            </div>
            <div className="relative flex flex-col gap-4 2xl:gap-10 h-3/4 justify-between w-full md:w-1/2 bg-white/50 bg-opacity-50 rounded-lg p-10">
            <div className="flex flex-col gap-4 2xl:gap-10">
                <p className="font-bold text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl">{c3}<br className="hidden md:block"/>  {c4}</p>
                <p className="text-neutral-700 text-sm md:text-lg 2xl:text-2xl opacity-80">{props.data.cards[1].description}</p>
            </div>
            <Link href={'/contact'} className='py-2 transition-transform duration-200'>
            <span
              className={[
                'rounded-full text-sm md:text-lg 2xl:text-2xl shadow-2xl py-3 w-fit px-7 transition-all duration-300 inline-block',
                isHovered2 ? 'bg-orange-600 -translate-y-1 cursor-pointer' : 'bg-orange-700',
                'text-gray-100'
              ].join(' ')}
              onMouseEnter={() => setIsHovered2(true)}
              onMouseLeave={() => setIsHovered2(false)}
            >
              {props.data.cards[1].buttonText}
            </span>
            </Link>            <img src="/business/bg-drop.svg" alt="background image" className="w-[300px] h-fit opacity-50 absolute -top-40  -right-65" />
            </div>
            <div className="w-full md:w-1/2 flex md:hidden justify-start items-center  ">
                <Image src={'/seo/stocks.webp'} alt="SEO Stocks" className="w-7/8 max-h-fit p-5 md:p-10" width={400} height={400} style={{height:'auto', width:'100%'}} />
            </div>
            </div>
{/* three */}
            <div ref={ref3} className="flex flex-col md:flex-row items-center pb-10 min-h-[40vh]">
             <div className="flex flex-col gap-4 2xl:gap-10 h-3/4 w-full md:w-1/2  bg-white/50 bg-opacity-50 rounded-lg p-10">
            <div className="flex flex-col gap-4 2xl:gap-10">
                <p className="font-bold text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl">{props.data.cards[2].title}</p>
                <p className="text-neutral-600 text-lg md:text-xl 2xl:text-2xl">{props.data.cards[2].description}</p>
            </div>
            <Link href={'/contact'} className='py-2 transition-transform duration-200'>
            <span
              className={[
                'rounded-full text-sm md:text-lg 2xl:text-2xl shadow-2xl py-3 w-fit px-7 transition-all duration-300 inline-block',
                isHovered3 ? 'bg-orange-600 -translate-y-1 cursor-pointer' : 'bg-orange-700',
                'text-gray-100'
              ].join(' ')}
              onMouseEnter={() => setIsHovered3(true)}
              onMouseLeave={() => setIsHovered3(false)}
            >
              {props.data.cards[2].buttonText}
            </span>
            </Link>            
            </div>
            <div className="w-full md:w-1/2 flex justify-end items-center ">
                <Image src={'/business/calendar.webp'} alt="Business Calendar" className="w-7/8 max-h-fit p-5 md:p-10" width={400} height={400} style={{height:'auto', width:'100%'}} />
            </div>
            </div>
        </div>
    )
}

export default Middle;