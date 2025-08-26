'use client'
import { Carousel } from "@/customComponents/graphic-design/Carousel";
import { Link } from "@/navigation";
import { useState } from "react";

type SliderDataType = {
  title: string;
  content:string,
  src:string,
}

type PropType = {
    title: string;
    description: string;
    servicesSlider:SliderDataType[],
    buttonText:string,
}

const Middle = (props:{data:PropType}) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="">
      <div className="flex flex-col gap-5 px-5 md:px-10 lg:px-20 primarybg py-10">
        <h2 className="text-3xl 2xl:text-5xl font-bold w-full md:w-1/2 text-center md:text-left">
          {props.data.title}
        </h2>
        <p className="text-stone-700 text-lg 2xl:text-2xl w-full md:w-3/4 text-center md:text-left px-2 md:px-0">
         {props.data.description}
        </p>
      </div>
      <div className="primarybg">
        <Carousel data={props.data.servicesSlider} />
      </div>
      <div className="flex justify-center primarybg">
        <Link href={'/contact'}>
        <button
          className={[
            'text-gray-100 shadow-2xl rounded-full text-lg 2xl:text-4xl px-8 py-3 2xl:px-10 2xl:py-6 w-fit transition-transform duration-300 inline-block',
            isHovered ? 'bg-red-700 -translate-y-2 cursor-pointer' : 'bg-red-800'
          ].join(' ')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {props.data.buttonText}
        </button>
        </Link>
      </div>
      </div>
    )
}

export default Middle;