'use client'
import { ArrowRight } from "lucide-react"
import { Link } from "@/navigation";
import { useState } from "react"

type Proptype = {
  title:string,
  description:string,
  buttonText:string,
}
const Explanatorysection = (props:{data:Proptype}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [one,two,three] = props?.data?.description?.split("|");
    return (
        <div className="primarybg px-5 sm:px-10 lg:px-20 flex flex-col md:flex-row justify-between py-10">
      <div className="flex flex-col gap-5 sm:gap-10 items-center w-full md:w-1/3">
      <p className="text-2xl sm:text-3xl md:text-4xl 2xl:text-6xl  md:text-left text-center font-bold font-poppins">{props?.data?.title}</p>
      <p className="w-full text-center 2xl:text-2xl md:text-left font-poppins">{one} <p className="font-bold inline">{two}</p>
{three}</p>
<div className="flex w-full justify-center md:justify-start py-5 sm:py-10 md:py-0">
    <Link href={'/contact'}>
    <div
          className={[
            "rounded-full font-montserrat font-semibold shadow-amber-800 shadow-md text-white w-fit text-xl 2xl:text-3xl z-30 flex gap-1 items-center px-6 py-5 transition-transform duration-300",
            isHovered ? "bg-red-700 -translate-y-1 cursor-pointer" : "bg-red-800"
          ].join(' ')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {props.data.buttonText} <ArrowRight className="text-white size-6" />
        </div>
    </Link>
</div>
      </div>
      <div className="flex w-full md:justify-end md:w-2/3">
      <img src={'/landing/banner2.jpg'} className="max-h-full md:h-fit md:w-8/9" />
      </div>
     </div>
    )
}

export default Explanatorysection