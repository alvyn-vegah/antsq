'use client'
import Workcard from "@/customComponents/Workcard";
import { useState } from "react";
import { useEffect } from "react";

type flexItem = {
  title:string,
  description:string,
  buttonText:string,
}

type PropType = {
  title:string,
  flexItems:flexItem[]
}

const Lastsection = (props:{data:PropType}) => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      handleResize()
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className="primarybg flex flex-col items-center gap-20 py-20 md:px-5 lg:px-20">
      <p className="font-bold text-4xl md:text-5xl md:pb-15 font-poppins">{props.data.title}</p>
      <div className="flex flex-col">
        <Workcard reverse={false} url='/landing/advertise.jpg' title={props.data.flexItems[0].title} content={props.data.flexItems[0].description} buttonText={props.data.flexItems[0].buttonText} />
        <Workcard reverse={!isMobile} url="/landing/search.jpg" title={props.data.flexItems[1].title} content={props.data.flexItems[1].description} buttonText={props.data.flexItems[1].buttonText} />
        <Workcard reverse={false} url="/landing/tag.jpg" title={props.data.flexItems[2].title} content={props.data.flexItems[2].description} buttonText={props.data.flexItems[2].buttonText} />
        <Workcard reverse={!isMobile} url="/landing/email.jpg" title={props.data.flexItems[3].title} content={props.data.flexItems[3].description} buttonText={props.data.flexItems[3].buttonText} />
        <Workcard reverse={false} url="/landing/tag.jpg" title={props.data.flexItems[4].title}content={props.data.flexItems[4].description} buttonText={props.data.flexItems[4].buttonText} />
        <Workcard reverse={!isMobile} url="/landing/code.jpg" title={props.data.flexItems[5].title} content={props.data.flexItems[5].description} buttonText={props.data.flexItems[5].buttonText} />
      </div>
     </div>
    )
}

export default Lastsection;