'use client'
import { CircleArrowRight } from "lucide-react";
import { Link } from "@/navigation";
import { useState } from "react";

type PropType = {
  unityTitle:string,
  contactSection:{
    description:string,
    buttonText:string,
  }
}

export const Footerbanner = (props:{data:PropType}) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="flex flex-col gap-20 items-center px-5 lg:px-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              {props.data.unityTitle}
            </h2>
            <div className="flex flex-col gap-5 md:flex-row p-10 min-h-[30vh] w-full lg:w-3/4 rounded-2xl bg-red-800">
             <div className="w-full md:w-1/2 text-gray-50 text-lg font-semibold">
             {props.data.contactSection.description}
             </div>
             <div className="w-full md:w-1/2 flex justify-center items-center">
             <Link href={'/contact'}>
             <button
               className={[
                 'flex gap-2 font-bold text-black bg-gray-100 rounded-md px-5 py-2 items-center text-lg transition-transform duration-200',
                 isHovered ? '-translate-y-1 cursor-pointer' : ''
               ].join(' ')}
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
             >
               {props.data.contactSection.buttonText}<CircleArrowRight size={28} />
             </button>
             </Link>
             </div>
            </div>
         </div>
    )
}