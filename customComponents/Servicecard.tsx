'use client'
import gsap from "gsap";
import { useEffect } from "react";
// import ScrollTrigger from "gsap/ScrollTrigger";

const Servicecard = (props:{src:string,title:string,content:string}) => {
    useEffect(() => {
        gsap.fromTo('.serviceImg',{
            scale:"0"
        },{
            scale:"0.8",
            duration:0.8,
            ease:"power1.out",
            scrollTrigger:{
                trigger:'.servicecard',
                start:"top 80%",
                toggleActions:'play none none none'
            }
        })
        },[])
    return (
        <div className="servicecard relative flex flex-col gap-4 w-full md:w-1/3 min-h-[40vh] md:min-h-[60vh] 2xl:min-h-[50vh] bg-gray-50/60 items-center justify-end py-10 md:py-5 p-5 lg:p-10 rounded-3xl shadow-2xl">
      <img className="serviceImg md:absolute md:top-[-90] mx-auto max-h-1/2 w-1/2 md:max-h-[200px] md:w-[200px] 2xl:max-h-[250px] 2xl:w-[250px]" src={props.src} />
      <p className="text-xl 2xl:text-4xl font-bold text-center sm:w-1/2 md:w-full font-roboto md:pt-10">{props.title}</p>
      <p className="text-center 2xl:text-xl sm:w-1/2 md:w-full font-poppins">{props.content}</p>
     </div>
    )
}

export default Servicecard;