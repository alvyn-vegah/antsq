'use client'
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger);
import { useRef,useEffect, useState } from "react";

type StepType = {
  number:string,
  title:string,
  description:string,
}

type PropType = {
  title:string,
  steps:StepType[]
}

export const Numbercards = (props:{data:PropType}) => {
    const ref = useRef(null);
    const [hovered, setHovered] = useState([false, false, false, false]);
    useEffect(() => {
    gsap.from(ref.current,{
        x:-150,
        duration:0.8,
        opacity:0,
        ease:"power2.inOut",
        scrollTrigger:{
            trigger:ref.current,
            start:"top 80%",
            toggleActions:"play none none none"
        }
    })
    },[])
    const steps = [
        {
          number: "01",
          title: "Introduction",
          description:
            "Have a conversation with our designated professional to ink down your thoughts and creativity into pictures of rolling frames.",
        },
        {
          number: "02",
          title: "Creation",
          description:
            "The designer will sculpt your ideas and project them for you for approval and modifications.",
        },
        {
          number: "03",
          title: "Right or Left",
          description:
            "Make your decision that drafts your preference and send back your revisions.",
        },
        {
          number: "04",
          title: "Final Product",
          description:
            "Tada!! Your Graphic Designer will put forth the final product with the required revisions & ideas garnished.",
        },
      ];
    return (
        <section className="primarybg py-12 px-2 md:px-0 w-full">
        <h2 className="text-3xl md:text-5xl 2xl:text-6xl font-bold text-center mb-20 text-black">
          {props.data.title}
        </h2>
        <div ref={ref} className="flex flex-col md:flex-row items-center justify-center gap-2 sm:px-5 lg:px-10 md:min-h-[50vh] w-full">
          {props.data.steps.map((step, idx) => (
            <div
              key={step.number}
              className="flex flex-col md:flex-row md:items-center h-fit w-full md:min-w-1/4 md:max-w-1/4 items-stretch"
            >
              <div
                className={[
                  "bg-gray-50/50 relative rounded-2xl flex flex-col shadow-2xl transition-all duration-200 px-4 lg:px-8 pt-10 md:pt-20 py-8 w-full text-center md:text-left md:min-h-[60vh] lg:min-h-[50vh]",
                  hovered[idx] ? "-translate-y-1 cursor-pointer" : ""
                ].join(' ')}
                onMouseEnter={() => setHovered(h => h.map((v, i) => i === idx ? true : v))}
                onMouseLeave={() => setHovered(h => h.map((v, i) => i === idx ? false : v))}
              >
                <p
                  className="text-5xl lg:text-7xl absolute top-0 sm:top-1 left-1/2 -translate-x-1/2 md:translate-0 md:top-0 md:left-2 stroke-[#790c0c] stroke-2 mb-2 text-[10vw] font-extrabold text-transparent uppercase"
                  style={{
                    WebkitTextStroke: "1.5px #991B1B",
                    opacity: 0.5,
                    lineHeight: "1",
                  }}
                >
                  {step.number}
                </p>
                <p className="text-xl md:text-2xl 2xl:text-4xl font-bold text-[#B71C1C] pt-4 sm:pt-10 md:pt-0 2xl:pt-10">
                  {step.title}
                </p>
                <p className="text-black 2xl:text-2xl text-base">{step.description}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden md:flex md:pl-2">
                  <img src="/graphic-design/right-arrow-red.png" alt="arrow image" className="min-w-[20px] lg:min-w-[40px] h-[30px] lg:h-[60px]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    )
}