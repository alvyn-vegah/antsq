'use client'
import Image from 'next/image';
import { packages } from "./pricing-data"
import { useState } from 'react';
import { CartItemPayload } from '@/lib/types/cartItem';
import clsx from 'clsx'


export const  PricingCard = (props:{obj:packages,id:string,loggedIn:boolean,data?:CartItemPayload,buttonText:string}) => {
  const [hovered, setHovered] = useState(Array(props.obj.data.length).fill(false));
    return (
        <div className='business flex flex-col w-full md:w-1/3 rounded-t-2xl pb-10 relative'>
        {/* header */}
         {
            props.obj && 
            <div className="flex flex-col bg-red-800 rounded-t-2xl text-gray-100 items-center">
            <div className="flex flex-col items-center py-3">
            <p className='text-3xl font-semibold'>{props.obj.package}</p>
            </div>
            <div className='darker-peach w-full flex justify-center items-center p-5'>
            <Image src={props.obj.url} alt={`Illustration for ${props.obj.package} package`} width={150} height={165} className='w-[40%] h-[60%] md:w-[30%] md:h-[165px]' />
            </div>
            <span className='py-3 flex items-start gap-2'>
             <span className='h-1/2'>$</span><span className="font-bold text-3xl flex items-center gap-2">{props.obj.price} <span className="font-light text-lg">/ Month</span></span>
            </span>
         </div>
         }
         {/* tail */}
         <div className="flex flex-col h-full justify-between" >
         <div className="h-fit pt-3">  
         {props.obj.data.map((data,idx) => (
            <div key={idx} className="flex flex-col px-5 py-2 gap-4">
            <div className="flex gap-5 items-center">
            <div className="flex gap-4">
              <Image src={data.img} alt={data.content} width={24} height={24} className='h-[1.5em] w-auto' />
            </div>
            <p
              className={["text-xs origin-right md:text-sm transition-all duration-200",
                hovered[idx] ? "text-red-800 scale-x-105 cursor-pointer" : ""
              ].join(' ')}
              onMouseEnter={() => setHovered(h => h.map((v, i) => i === idx ? true : v))}
              onMouseLeave={() => setHovered(h => h.map((v, i) => i === idx ? false : v))}
            >
              {data.content}
            </p>
            </div>
            {idx < props.obj.data.length - 1 && <hr className='border-1 border-red-200' />} 
          </div>
         ))}
         </div>
         <div className="flex justify-center py-5">
         <div
              className={clsx(
                'text-md font-semibold bg-red-800 text-gray-100 transition-transform duration-200 rounded-sm min-w-3/4 py-3 w-fit flex justify-center items-center gap-3 hover:bg-red-700 hover:-translate-y-1 hover:cursor-pointer'
              )}
              aria-disabled={false}
            >
              <span>{props.buttonText}</span>
            </div>
         </div>
         </div>
        </div>
    )
}