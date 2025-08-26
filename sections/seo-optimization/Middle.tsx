'use client'
import Image from 'next/image';
import { Link } from '@/navigation';
import { useState } from 'react';

type PropType = {
   title:string,
   description:string,
   buttonText:string
}

export const Middle = (props:{data:PropType[]}) => {
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);
    return (
        <div className="flex flex-col gap-20 py-10 2xl:py-0 px-5 md:px-10 lg:px-20 primarybg">
             {/* banner & details */}
            <div className="flex flex-col md:flex-row items-center pb-10 min-h-[40vh]">
             <div className="flex flex-col gap-10 h-3/4 w-full md:w-1/2  bg-white/50 bg-opacity-50 rounded-lg p-10">
            <div className="flex flex-col gap-4">
                <p className="font-bold text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl">{props.data[0].title}</p>
                <p className="text-neutral-600 text-md md:text-lg 2xl:text-2xl">{props.data[0].description}</p>
            </div>
            <Link href={'/contact'} className='py-2 transition-transform duration-200'>
            <span
              className={[
                'rounded-full text-sm md:text-lg 2xl:text-3xl px-7 shadow-2xl py-3 w-fit transition-transform duration-300 inline-block',
                isHovered1 ? 'bg-orange-600 -translate-y-1 cursor-pointer' : 'bg-orange-700',
                'text-gray-100'
              ].join(' ')}
              onMouseEnter={() => setIsHovered1(true)}
              onMouseLeave={() => setIsHovered1(false)}
            >
              {props.data[0].buttonText}
            </span>
            </Link>            
            </div>
            <div className="w-full md:w-1/2 flex justify-end items-center ">
                <Image src={'/seo/arrow.webp'} alt="SEO Arrow" className="w-7/8 max-h-fit p-5 md:p-10" width={400} height={400} style={{height:'auto', width:'100%'}} />
            </div>
            </div>
                    {/* two */}
            <div className="flex flex-col md:flex-row items-center pb-10 min-h-[40vh]">
            <div className="w-full hidden md:flex md:w-1/2 justify-start items-center">
                <Image src={'/seo/stocks.webp'} alt="SEO Stocks" className="w-7/8 max-h-fit p-5 md:p-10" width={400} height={400} style={{height:'auto', width:'100%'}} />
            </div>
             <div className="flex flex-col gap-10 h-3/4 w-full md:w-1/2  bg-white/50 bg-opacity-50 rounded-lg p-10">
            <div className="flex flex-col gap-4">
                <p className="font-bold text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl">{props.data[1].title}</p>
                <p className="text-neutral-600 text-md md:text-lg 2xl:text-2xl">{props.data[1].description}</p>
            </div>
            <Link href={'/contact'} className='py-2 transition-transform duration-200'>
            <span
              className={[
                'rounded-full text-sm md:text-lg 2xl:text-3xl px-7 shadow-2xl py-3 w-fit transition-transform duration-300 inline-block',
                isHovered2 ? 'bg-orange-600 -translate-y-1 cursor-pointer' : 'bg-orange-700',
                'text-gray-100'
              ].join(' ')}
              onMouseEnter={() => setIsHovered2(true)}
              onMouseLeave={() => setIsHovered2(false)}
            >
              {props.data[1].buttonText}
            </span>
            </Link>            </div>
            <div className="w-full md:w-1/2 flex md:hidden justify-start items-center">
                <Image src={'/seo/stocks.webp'} alt="SEO Stocks" className="w-7/8 max-h-fit p-5 md:p-10" width={400} height={400} style={{height:'auto', width:'100%'}} />
            </div>
            </div>
              {/* three */}
            <div className="flex flex-col md:flex-row items-center pb-10 min-h-[40vh]">
             <div className="flex flex-col gap-10 h-3/4 w-full md:w-1/2  bg-white/50 bg-opacity-50 rounded-lg p-10">
            <div className="flex flex-col gap-4">
                <p className="font-bold text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl">{props.data[2].title}</p>
                <p className="text-neutral-600 text-md md:text-lg 2xl:text-2xl">{props.data[2].description}</p>
            </div>
            <Link href={'/contact'} className='py-2 transition-transform duration-200'>
            <span
              className={[
                'rounded-full text-sm md:text-lg 2xl:text-3xl px-7 shadow-2xl py-3 w-fit transition-transform duration-300 inline-block',
                isHovered3 ? 'bg-orange-600 -translate-y-1 cursor-pointer' : 'bg-orange-700',
                'text-gray-100'
              ].join(' ')}
              onMouseEnter={() => setIsHovered3(true)}
              onMouseLeave={() => setIsHovered3(false)}
            >
              {props.data[2].buttonText}
            </span>
            </Link>            </div>
            <div className="relative w-full md:w-1/2 flex justify-end items-center ">
                <img src={'/seo/search.webp'} className="w-7/8 max-h-fit p-5 md:p-10 z-10" />
                <img src={'/seo/seo-img-bg.svg'} className="absolute w-1/2 -top-10 -left-4 max-h-fit p-5 md:p-10 z-0 opacity-30" />
            </div>
            </div>
                {/* four */}
             <div className="relative flex flex-col md:flex-row items-center min-h-[40vh]">
             <div className="w-full hidden md:flex md:w-1/2 justify-start items-center ">
                <Image src={'/seo/calendar.webp'} alt="SEO Calendar" className="w-7/8 max-h-fit p-5 md:p-10" width={400} height={400} style={{height:'auto', width:'100%'}} />
            </div>
            <div className="flex flex-col gap-10 h-3/4 w-full md:w-1/2 bg-white/50 bg-opacity-50 rounded-lg p-10">
            <div className="flex flex-col gap-4">
                <p className="font-bold text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl">{props.data[3].title}</p>
                <p className="text-neutral-600 text-md md:text-lg 2xl:text-2xl">{props.data[3].description}</p>
            </div>
            <Link href={'/contact'} className='py-2 transition-transform duration-200'>
            <span
              className={[
                'rounded-full text-sm md:text-lg 2xl:text-3xl px-7 shadow-2xl py-3 w-fit transition-transform duration-300 inline-block',
                isHovered4 ? 'bg-orange-600 -translate-y-1 cursor-pointer' : 'bg-orange-700',
                'text-gray-100'
              ].join(' ')}
              onMouseEnter={() => setIsHovered4(true)}
              onMouseLeave={() => setIsHovered4(false)}
            >
              {props.data[3].buttonText}
            </span>
            </Link>
            </div>
            <div className="w-full md:w-1/2 flex md:hidden justify-start items-center ">
                <Image src={'/seo/calendar.webp'} alt="SEO Calendar" className="w-7/8 max-h-fit p-5 md:p-10" width={400} height={400} style={{height:'auto', width:'100%'}} />
            </div>
            <img src="/seo/bg-drop-seo.svg" alt="background image" className="absolute h-[250px] w-[250px] opacity-30 z-0 -top-40 -left-60" />
            </div>
        </div>
    )
}