'use client'
import { SeoPlancard } from "@/customComponents/plans-pricing/SeoPlancard";
import { useState, useRef } from "react"
import { BasicPack, PremiumPack, StandardPack,packages } from "@/customComponents/plans-pricing/seo-plan-helper";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CartItemPayload } from "@/lib/types/cartItem";
import { getProducts } from "@/controllers/queries/products";
import { useQuery } from "@tanstack/react-query";
gsap.registerPlugin(ScrollTrigger);

BasicPack.header.url = 'hammerAnt.png';
PremiumPack.header.url = 'craftsman.png';
StandardPack.header.url = 'spannerAnt.png';

type planType = {
  seedAnt:packages,
  metaAnt:packages,
  optimizerAnt:packages,
}

type PropType = {
  title:string,
  subtitle:string,
  buttonText:string[],
  additionalText:string,
  discount20:string,
  discount10:string,
  planTypes:planType,
  cartStatus:string[],
}

export const SeoPlans = (props:{data:PropType}) => {
  const [t1,t2] = props.data.buttonText;
    const [isYearly,setIsYearly] = useState(true);
    const ref = useRef(null);
    const {data:products} = useQuery<CartItemPayload[]>({
        queryKey:['products'],
        queryFn:getProducts
      })
    return (
        <section className="primarybg w-full py-20">
         <div className="flex flex-col gap-10 w-full items-center">
            <div className="flex flex-col gap-10 w-full">
                <div className="flex flex-col gap-2">
                <h1 ref={ref} className="text-4xl 2xl:text-5xl font-bold text-center py-10 text-red-800 px-10">{props.data.title}</h1>
                <p className="text-center text-lg 2xl:text-2xl text-stone-600">
                  {props.data.subtitle}
                </p>
                </div>
                <p className="text-lg 2xl:text-xl font-semibold text-stone-700/80 text-center">{props.data.additionalText}</p>
            </div>
         </div>

<div className="relative flex justify-center pb-10 mt-10">
        {/* Main Toggle Container */}
        <div className="relative business shadow-stone-400 rounded shadow-2xl w-fit">
          <div className="flex items-center relative">
            {/* Sliding Background */}
            <div
              className={`absolute top-1 bottom-1 primarybg rounded shadow-md transition-all duration-300 ease-in-out ${
                isYearly ? 'left-1/2 right-1' : 'left-1 right-1/2'
              }`}
            />
            
            {/* Monthly Option */}
            <button
              onClick={() => setIsYearly(false)}
              className={`relative hover:cursor-pointer z-10 px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${
                !isYearly 
                  ? 'text-gray-900'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {t1}
            </button>
            
            {/* Yearly Option */}
            <button
              onClick={() => setIsYearly(true)}
              className={`relative hover:cursor-pointer z-10 px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${
                isYearly 
                  ? 'text-gray-900' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {t2}
            </button>
          </div>
        </div>

        {/* Savings Badge */}
        <div
          className={`absolute -top-8 bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg transition-all duration-300 ${
            isYearly 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-2'
          }`}
        >
          {props.data.discount20}
        </div>
        <div
          className={`absolute -top-8 bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg transition-all duration-300 ${
            !isYearly 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-2'
          }`}
        >
          {props.data.discount10}
        </div>
      </div>

         <div className="px-5 lg:px-10 flex flex-col md:flex-row gap-5">
         <SeoPlancard
         isMiddle={false}
            isYearly={isYearly}
            obj={props.data.planTypes.seedAnt}
            data={products && products[3]}
             />
            <SeoPlancard
            isMiddle={true}
            isYearly={isYearly}
            obj={props.data.planTypes.metaAnt}
            data={products && products[4]}
             />
            <SeoPlancard
            isMiddle={false}
            isYearly={isYearly}
            obj = {props.data.planTypes.optimizerAnt}
            data={products && products[5]}
             />
         </div>
        </section>
    )
}