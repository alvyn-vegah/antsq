'use client'
import { Link } from "@/navigation";
import { useState } from "react";
import { ArrowRightCircle } from "lucide-react";

type PropType = {
  title:string,
  buttonText:string,
}

const Footerbanner = (props:{data:PropType}) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <section className="w-full primarybg pt-8 2xl:pb-20 px-4 flex flex-col items-center shadow-2xl">
       <div className="flex flex-col bg-gray-50/50 w-full md:w-3/4">
       <div className="bg-red-800 rounded-xl  flex flex-col md:flex-row items-center justify-between p-8 gap-6 min-h-[40vh]">
          <div className="text-white text-2xl md:text-4xl 2xl:text-6xl font-bold mb-4 md:mb-0 w-full md:w-1/2 text-center md:text-left">{props.data.title}</div>
          <Link href={'/plans-pricing'}>
          <button
            className={[
              'bg-white text-stone-900 flex gap-2 2xl:text-4xl items-center font-semibold px-6 2xl:px-10 py-3 2xl:py-6 rounded transition-all duration-200 text-lg',
              isHovered ? '-translate-y-1 cursor-pointer' : ''
            ].join(' ')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {props.data.buttonText} <ArrowRightCircle size={26} />
          </button>
          </Link>
        </div>
       </div>
      </section>
    )
}

export default Footerbanner;