'use client'
import { ArrowRight } from "lucide-react";
import { useState } from "react";

type PropType = {
   title:string,
   description:string,
   namePlaceholder:string,
   emailPlaceholder:string,
   buttonText:string,
}

const Newsletter = (props:{data:PropType}) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <section className="w-full px-5 md:px-20 primarybg min-h-[70vh] py-10">
        <div className="rounded-xl shadow-2xl p-10 bg-gray-50/50 flex flex-col gap-20">
         <div className="flex flex-col gap-4 items-center">
            <p className="font-bold text-2xl md:text-4xl lg:text-5xl 2xl:text-6xl text center text-red-800">{props.data.title}</p>
            <p className="text-slate-600/80 font-semibold text-lg 2xl:text-3xl w-full md:max-w-3/4 text-center">{props.data.description}</p>
         </div>
         <div className="flex flex-col md:flex-row gap-5 md:gap-10 w-full justify-between">
            <input className="bg-[#FFCDC3] px-7 py-4 2xl:py-8 rounded-full w-full 2xl:text-3xl" placeholder={props.data.namePlaceholder} />
            <input className="bg-[#FFCDC3] px-7 py-4 2xl:py-8 rounded-full w-full 2xl:text-3xl" placeholder={props.data.emailPlaceholder} />
            <button
              className={[
                'rounded-full w-full flex gap-2 items-center justify-center text-white px-7 py-4 2xl:py-8 2xl:text-3xl transition-all duration-300',
                isHovered ? 'bg-red-700 -translate-y-2 cursor-pointer' : 'bg-red-800'
              ].join(' ')}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {props.data.buttonText} <ArrowRight className="text-white" size={28} />
            </button>
         </div>
        </div>
        </section>
    )
}
 
export default Newsletter;