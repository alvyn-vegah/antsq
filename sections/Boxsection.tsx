'use client'
import Herobox from "@/customComponents/Herobox";
import gsap from "gsap";
import { useEffect } from "react";

type PropType = {
    title:string,
    description:string,
    buttonText:string,
  }

const Boxsection = (props:{data:PropType[]}) => {
    useEffect(() => {
    gsap.fromTo('.division',{
        y:'20vh'
    },{
        y:"0vh",
        duration:0.5,
        ease:"power1.out",
        scrollTrigger:{
            trigger:'.division',
            start:"top 80%",
            toggleActions:'play none none none'
        }
    })
    },[])
    return (
        <div className="primarybg">
      <div className="division flex flex-col md:flex-row gap-5 h-fit px-5 sm:px-10 md:px-10 lg:px-20 py-10">
      <Herobox title={props?.data[0].title} content={props?.data[0]?.description}  buttonText={props?.data[0].buttonText} />
      <Herobox title={props?.data[1].title} content={props?.data[1]?.description} buttonText={props?.data[1].buttonText} />
      <Herobox title={props?.data[2].title} content={props?.data[2]?.description} buttonText={props?.data[2].buttonText} />
      </div>
     </div>
    )
}

export default Boxsection;