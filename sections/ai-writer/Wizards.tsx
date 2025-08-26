'use client'
import Image from 'next/image';
import { useState } from 'react';

type wizType = {
  title:string,
  description:string,
}

type PropType = {
  title:string,
  subtitle:string,
  wizards:wizType[]
}

export const Wizards = (props:{data:PropType}) => {
    const [hovered, setHovered] = useState([false, false, false, false]);
    return (
        <div className="flex flex-col w-full items-center px-5 md:px-10 lg:px-20 primarybg">
        <div className="flex flex-col gap-10 w-full lg:w-3/4">
        <h1 className="text-4xl md:text-5xl font-bold text-center">{props.data.title}</h1>
        <p className="text-sm text-center text-stone-800/70">{props.data.subtitle}</p>
        {/* boxes */}
        <div className="flex flex-col md:flex-row gap-5">
          {[
            { src: "/ai-writer/sound.svg", alt: "Icon for Blog Wizard" },
            { src: "/ai-writer/email.svg", alt: "Icon for Email Wizard" },
            { src: "/ai-writer/cart.svg", alt: "Icon for Ecommerce Wizard"},
            { src: "/ai-writer/rocket.svg", alt: "Icon for Startup Wizard"},
          ].map((wizard, idx) => (
            <div
              key={wizard.alt}
              className={[
                "flex flex-col p-5 items-center justify-center business rounded-2xl gap-3 transition-transform duration-200",
                hovered[idx] ? "-translate-y-1 cursor-pointer" : ""
              ].join(' ')}
              onMouseEnter={() => setHovered(h => h.map((v, i) => i === idx ? true : v))}
              onMouseLeave={() => setHovered(h => h.map((v, i) => i === idx ? false : v))}
            >
              <Image src={wizard.src} alt={wizard.alt} width={100} height={100} className="w-1/8 md:w-1/3" />
              <h3 className="text-red-900 font-bold text-2xl text-center" dangerouslySetInnerHTML={{ __html: props.data.wizards[idx].title }} />
              <p className="text-md text-stone-600 text-center">{props.data.wizards[idx].description}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
    )
}