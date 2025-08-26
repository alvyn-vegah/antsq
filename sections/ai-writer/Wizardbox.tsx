'use client'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input";
import clsx from 'clsx';
gsap.registerPlugin(ScrollTrigger)

export const Wizardbox = (props:{title:string,desc:string,url:string,icon:string,reverse:boolean}) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
       gsap.from(ref.current, {
         y:20,
         opacity:0,
         duration:0.7,
         ease:"power1.inOut",
         scrollTrigger:{
          trigger:ref.current,
          start:"top 70%",
          toggleActions:"play none none none"
         }
       })
    },[])
    return (
        <div ref={ref} className="flex flex-col items-center md:flex-row gap-10 w-full px-5 md:px-10 lg:px-20 py-10">
        <div className={clsx(
          'hidden w-full md:w-[65%]',
          props.reverse ? 'md:flex' : 'md:hidden'
        )}>
        <Image src={props.url} alt={`Illustration for ${props.title}`} width={800} height={600} className="rounded-2xl shadow-2xl h-fit" />
        </div>
        <div className="flex flex-col gap-5 w-full md:w-[35%]">
         <div className="flex w-full items-center gap-4">
             <Image src={props.icon} alt={`Icon for ${props.title}`} width={100} height={100} className="w-1/8" />
             <h3 className="text-3xl font-bold">{props.title}</h3>
         </div>
         <div className="flex w-full md:w-3/4 text-justify">{props.desc}</div>
         <div className="flex justify-center md:justify-start">
         <Sheet>
                <SheetTrigger asChild>
                    <button className="text-gray-100 bg-red-800 hover:bg-red-700 transition-transform duration-200 hover:-translate-y-1 hover:cursor-pointer rounded-full px-5 py-2 w-fit">Get Started</button>
                </SheetTrigger>
                <SheetContent className="business min-w-[50vw] overflow-y-auto z-100 p-5">
                    <SheetHeader>
                        <SheetTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-800">Let's Grow Your Business Online</SheetTitle>
                        <SheetDescription className="text-gray-600 text-lg sm:text-xl">
                        Submit your details and we will get back to you.
                        </SheetDescription  >
                    </SheetHeader>
                    <div className="py-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="First Name" className="bg-white" />
                            <Input placeholder="Last Name" className="bg-white" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input type="email" placeholder="Email" className="bg-white" />
                            <Input type="tel" placeholder="Phone Number" className="bg-white" />
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-gray-800">Choose Service</h4>
                            <div className="space-y-2 text-sm text-gray-700">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="service1" name="service1" className="accent-red-800" />
                                    <label htmlFor="service1">Business Social Media Management</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="service2" name="service2" className="accent-red-800" />
                                    <label htmlFor="service2">Search Engine Optimization & Marketing</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="service3" name="service3" className="accent-red-800" />
                                    <label htmlFor="service3">Brand Reputation Management</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="service4" name="service4" className="accent-red-800" />
                                    <label htmlFor="service4">Email Marketing</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="service5" name="service5" className="accent-red-800" />
                                    <label htmlFor="service5">Graphic Design</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="service6" name="service6" className="accent-red-800" />
                                    <label htmlFor="service6">Web Development</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="service7" name="service7" className="accent-red-800" />
                                    <label htmlFor="service7">Other</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="font-semibold mb-2 block text-gray-800">Message</label>
                            <textarea id="message" name="message" rows={4} className="w-full border rounded-md p-2 bg-white" placeholder="Message"></textarea>
                        </div>
                        <div>
                            <button
                              className={[
                                'w-full text-white py-2 rounded-md transition-transform duration-300 inline-block',
                                isHovered ? 'bg-red-700 -translate-y-1 cursor-pointer' : 'bg-red-800'
                              ].join(' ')}
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                            >
                              Send Message
                            </button>
                        </div>
                    </div>
                </SheetContent>
             </Sheet>
         </div>
        </div>
        <div className={clsx(
          'flex w-full md:w-[65%]',
          props.reverse ? 'md:hidden' : 'md:block'
        )}>
        <Image src={props.url} alt={`Illustration for ${props.title}`} width={800} height={600} className="rounded-2xl shadow-2xl h-fit" />
        </div>
        </div>
    )
}