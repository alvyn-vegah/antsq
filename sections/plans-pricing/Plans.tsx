'use client'
import { useState } from 'react';
import { Plancard } from '@/customComponents/plans-pricing/Plancard';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/controllers/queries/products';
import { CartItemPayload } from '@/lib/types/cartItem';
import type { packages } from '@/customComponents/plans-pricing/plan-helper';

type planType = {
  starterPackage:packages,
  growthPackage:packages,
  topTierPackage:packages,
  customPackage:packages,
}

type PropType = {
  title:string,
  subtitle:string,
  buttonText:string[],
  discount:string,
  planTypes:planType,
  cartStatus:string[],
}

// function addTwentyPercent(value: string) {
//   const num = Number(value);
//   return Math.round(num * 1.2).toString();
// }

export const Plans = (props:{data:PropType}) => {
  const [t1,t2] = props.data.buttonText;
    const [isYearly,setIsYearly] = useState(false);
    const {data:products} = useQuery<CartItemPayload[]>({
      queryKey:['products'],
      queryFn:getProducts
    })

    return (
        <section className='primarybg px-5 md:px-3 lg:px-10 w-full h-full'>
          <div className='flex flex-col justify-center items-center gap-5 pt-5'>
            <h2 className='text-4xl 2xl:text-5xl font-bold text-red-800'>{props.data.title}</h2>
            <h5 className='text-lg 2xl:text-2xl font-semibold text-stone-700/80'>{props.data.subtitle}</h5>
          </div>
         <div className="relative flex justify-center pb-10 mt-20">
        {/* Main Toggle Container */}
        <div className="relative business rounded shadow-2xl shadow-stone-400 w-fit">
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
          className={`absolute -top-8 bg-green-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transition-all duration-300 ${
            isYearly 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-2'
          }`}
        >
          {props.data.discount}
        </div>
      </div>

        <div className="flex flex-col md:flex-row gap-2 items-stretch">
        <Plancard isYearly={isYearly} obj={props.data.planTypes.starterPackage} cartStatus={props.data.cartStatus} data={products && products[0]}  />
        <Plancard isYearly={isYearly} obj={props.data.planTypes.growthPackage} cartStatus={props.data.cartStatus}  data={products && products[1]} />
        <Plancard isYearly={isYearly} obj={props.data.planTypes.topTierPackage} cartStatus={props.data.cartStatus} data={products && products[2]} />
        <Plancard isYearly={isYearly} obj={props.data.planTypes.customPackage} cartStatus={props.data.cartStatus} data={products && products[3]} />
        </div>
      </section>
    )
}