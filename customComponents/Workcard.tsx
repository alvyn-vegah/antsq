import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Prosto_One } from "next/font/google";
import { useState } from "react";

const Workcard = (props:{url:string,title:string,content:string,reverse:boolean,buttonText:string}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    return (
        <div id="landingpage_card" className="flex flex-col md:flex-row bg-gradient-to-br from-white to-gray-50">
         {props.reverse ? (
            <>
            <div className="flex flex-col gap-4 p-10 justify-start bg-gray-50 shadow-2xl w-full md:w-1/2 min-h-[60vh] max-h-full">
             <p className="font-bold text-4xl 2xl:text-6xl w-2/3 font-poppins">{props.title}</p>
             <p className="w-full md:w-2/3 2xl:w-full text-lg 2xl:text-3xl font-noto">{props.content}</p>
             <Link href={'/plans-pricing'}>
             <button
               className={[
                 "rounded-full px-5 py-3 font-montserrat text-xl 2xl:text-4xl text-white w-fit transition-transform duration-300",
                 isHovered ? "bg-red-700 -translate-y-1 cursor-pointer" : "bg-red-800"
               ].join(' ')}
               onMouseEnter={() => setIsHovered(true)}
               onMouseLeave={() => setIsHovered(false)}
             >
               {props.buttonText}
             </button>
             </Link>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center">
            <img src={props.url} className="max-h-[40vh] md:max-h-[60vh] max-w-3/4"/>
            </div>
            </>
         ) : (
         <>
         <div className="w-full flex justify-center items-center md:w-1/2 min-h-[60vh]">
         <img src={props.url} className="max-h-[40vh] md:max-h-[60vh] max-w-3/4" />
         </div>
         <div className="flex flex-col gap-4 p-10 justify-start bg-gray-50 shadow-2xl min-h-[60vh] w-full md:w-1/2">
          <p className="font-bold text-4xl 2xl:text-6xl w-2/3 2xl:w-full font-poppins">{props.title}</p>
          <p className="w-full md:w-2/3 text-lg 2xl:text-3xl font-noto">{props.content}</p>
          <Link href={'/plans-pricing'}>
          <div
            className={["rounded-full flex gap-2 px-7 py-3 font-montserrat text-xl 2xl:text-4xl text-white w-fit transition-transform duration-300",
              isHovered2 ? "bg-red-700 -translate-y-1 cursor-pointer" : "bg-red-800"
            ].join(' ')}
            onMouseEnter={() => setIsHovered2(true)}
            onMouseLeave={() => setIsHovered2(false)}
          >
            {props.buttonText}
          </div>
          </Link>
         </div>
         </>
         )}
        </div>
    )
}

export default Workcard;