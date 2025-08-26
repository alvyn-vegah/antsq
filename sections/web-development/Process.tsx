'use client'
import clsx from 'clsx';
import { useState } from 'react';

const Process = () => {
    const [hovered, setHovered] = useState([false, false, false, false, false]);
    
const processes = [
    {
      step: '01',
      title: 'Briefing',
      desc: 'We start by understanding your goals, audience, and requirements to craft a tailored strategy.',
    },
    {
      step: '02',
      title: 'Planning',
      desc: 'We outline the project scope, create a roadmap, and define milestones for a smooth workflow.',
    },
    {
      step: '03',
      title: 'Design',
      desc: 'Our designers create visually stunning and user-friendly interfaces that reflect your brand.',
    },
    {
      step: '04',
      title: 'Development',
      desc: 'We build your website using modern technologies, ensuring performance, security, and scalability.',
    },
    {
      step: '05',
      title: 'Launch',
      desc: 'After thorough testing, we launch your site and provide ongoing support as needed.',
    },
  ];
    return (
        <section className="w-full max-w-7xl mx-auto py-12 md:pl-10 lg:pl-20">
        <h3 className="text-2xl md:text-4xl lg:text-6xl font-bold text-stone-900 px-5 lg:px-20 mb-8 text-center md:text-left">Our Web Development Process</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-5 px-5 lg:px-20 md:min-h-[50vh] w-full">
          {processes.map((step, idx) => (
            <div key={step.step} className={clsx(
              'flex flex-col md:flex-row md:items-center h-[40vh] md:h-fit w-full transition-transform duration-200',
              hovered[idx] ? '-translate-y-1 cursor-pointer' : '',
              idx % 2 !== 0 && 'md:mt-20'
            )}
            onMouseEnter={() => setHovered(h => h.map((v, i) => i === idx ? true : v))}
            onMouseLeave={() => setHovered(h => h.map((v, i) => i === idx ? false : v))}
            >
              <div className="bg-gray-50/50 relative rounded-2xl flex flex-col shadow-md px-4 lg:px-8 pt-10 min-h-[40vh] justify-center md:pt-20 py-10 w-full text-center md:text-left md:min-h-[60vh] lg:min-h-[60vh]">
                <p
                  className=" text-5xl lg:text-7xl absolute top-0 left-1/2 -translate-x-1/2 md:translate-0 md:top-0 md:left-2 font-extrabold text-transparent stroke-[#b91c1c] stroke-2 mb-2"
                  style={{ WebkitTextStroke: "2px #b91c1c" }}
                >
                  {step.step}
                </p>
                <p className="text-xl md:text-2xl font-bold text-[#B71C1C] py-2">
                  {step.title}
                </p>
                <p className="text-black text-xs md:text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
}

export default Process;