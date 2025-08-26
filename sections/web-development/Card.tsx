'use client'
import gsap from "gsap"
import { useEffect, useRef } from "react"
import ScrollTrigger from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { Link } from "@/navigation";

gsap.registerPlugin(ScrollTrigger);

export const Card = (props:{title:string,content:string,url:string}) => {
   const ref = useRef(null);
   useEffect(() => {
    gsap.fromTo(ref.current,
      {
        y:50,
        opacity:0
      }, {
        y:0,
        opacity:1,
        ease:"power2.out",
        scrollTrigger:{
          trigger:ref.current,
          start:"top 80%",
          toggleActions:'play reverse play reverse',
        }
      }
    )
   })
    return (
        <div ref={ref} className="flex flex-col items-center md:items-end opacity-80">
      <div className="flex flex-col gap-10 p-5 md:p-10 w-full md:w-3/8 business rounded-2xl">
        <Image src={props.url} alt={props.title || 'Web Development Card Image'} className='w-[30%] h-[20%]' width={200} height={120} style={{height:'20%', width:'30%'}} />
        <h2 className='text-3xl font-bold'>{props.title}</h2>
        <p className='text-stone-700 text-md'>{props.content}</p>
        <div className="flex justify-center"> 
          <Link href={'/plans-pricing'}>
          <button className='rounded-md bg-red-800 text-gray-100 text-lg font-semibold w-fit hover:bg-red-700 hover:cursor-pointer px-4 py-3'>Schedule Now</button>
          </Link>
        </div>
       </div>
      </div>
    )
}