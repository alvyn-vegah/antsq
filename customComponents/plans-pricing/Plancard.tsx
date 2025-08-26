'use client'
import { ChevronRight, ShoppingCart } from "lucide-react"
import { packages } from "./plan-helper"
import { toast } from "sonner"
import { useState } from "react";
import { CartItemPayload } from "@/lib/types/cartItem";
import { Link } from "@/navigation";
import clsx from 'clsx';
import useCart from "@/globalState/cart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip } from 'antd';

export const Plancard = (props:{obj:packages,isYearly:boolean,loggedIn?:boolean,data?:CartItemPayload,cartStatus?:string[]}) => {
  const {cartItems,addToCart,removeFromCart} = useCart();
  const [hovered, setHovered] = useState(Array(props.obj.data.length).fill(false));

  // Check if the current package is in the cart by id
  const isInCart = props.data && cartItems.some(item => item.id === props.data?.id);

  const addMonthlyPlanToCart = () => {
    if(props.data) {
      addToCart({...props.data,monthlyPrice: props.data.monthlyPrice || '0',isyearly:false});
      toast("Item has been added to cart", {
        description: `Item: ${props.data.plan}`,
      })
    }
  };
  const addYearlyPlanToCart = () => {
    if(props.data) {
      addToCart({...props.data,monthlyPrice: props.data.monthlyPrice || '0',isyearly:true});
      toast("Item has been added to cart", {
        description: `Item: ${props.data.plan}`,
      })
    }
  };

  const handleRemoveFromCart = () => {
    if(props.data) {
      removeFromCart(props.data.id!);
      toast("Item has been removed from the cart", {
        description: `Item: ${props.data.plan}`,
      })
    }
  };

  return (
    <div className="business flex flex-col w-full h-full shadow-xl md:min-w-1/6 rounded-t-2xl pb-10">
      {/* header */}
      {props.obj.header &&
        <div className="flex flex-col h-full bg-red-800 rounded-t-2xl text-gray-100 items-center">
          <div className="flex flex-col items-center py-3">
            <p className='text-3xl font-semibold text-center'>{props.obj.header?.ant}</p>
            <p className='text-lg'>{props.obj.header.package}</p>
            <p className="text-xs text-slate-300">
  {props.obj.header.description && `(${props.obj.header.description})`}
</p>          </div>
          <div className='darker-peach w-full flex justify-center items-center p-5'>
            <img src={props.obj.header.url} alt="image" className='w-[40%] h-[60%] md:w-fit md:h-[150px]' />
          </div>
          <span className='py-3 flex items-center gap-2'>
            <span className='font-bold text-4xl'>
              {props.obj.header.monthlyPrice!="na" && <sup className="text-2xl px-1">$</sup>}
              {props.isYearly && props.obj.header.monthlyPrice!='na' && props.obj.header.yearlyPrice}
              {!props.isYearly && props.obj.header.monthlyPrice!='na' && props.obj.header.monthlyPrice}
              {props.obj.header.monthlyPrice=='na' &&
              <Link href={'/contact'}>
              <div className='rounded px-4 py-2 bg-gray-50/80 w-full hover:cursor-pointer hover:bg-gray-50 transition-colors duration-300 text-red-700 text-sm'>
                {props.obj.header.yearlyPrice}
              </div>
              </Link>
              }
            </span>
            {props.obj.header.monthlyPrice != 'na' && <span className='font-light'>/ {props.isYearly ? 'Year' : 'Month'}</span> }
          </span>
        </div>
      }
      {/* tail */}
      <div className="flex flex-col flex-grow h-full justify-between">
        <div className="py-3 h-full">
          {props.obj.data.map((data,idx:number) => (
            <div key={idx} className="flex flex-col px-5 py-2 gap-4 h-fit">
              <div className="flex gap-5 items-center h-fit">
                <div className="flex gap-4 min-w-[1em]">
                  <img src={data.img} alt="icon for service plan" className='h-[1.5em]' />
                </div>
                <span
                  className={[
                    "text-xs flex break-words flex-col md:text-sm transition-transform duration-200 transform origin-right",
                    hovered[idx] ? "text-red-800 scale-102 cursor-pointer" : ""
                  ].join(' ')}
                  onMouseEnter={() => setHovered(h => h.map((v, i) => i === idx ? true : v))}
                  onMouseLeave={() => setHovered(h => h.map((v, i) => i === idx ? false : v))}
                >
                  {data.content}
                    <Tooltip title={data?.tooltipContent} color="#f6bbb5" className="text-white">
                    <div className="w-[15px] h-[15px] flex items-center justify-center rounded-full bg-gray-400">
                          <span className="text-white text-xs font-semibold">!</span>
                    </div>
                    </Tooltip>
                </span>
              </div>
              {idx < props.obj.data.length - 1 && <hr className='border-1 border-red-200' />} 
            </div>
          ))}
        </div>
        <div className="flex justify-center w-full">
        {
            props.obj.header.package == "Custom Package" ? 
            <Link href={'/web-form'}>
            <div
                className={clsx('text-md font-semibold transition-transform px-8 bg-red-800 hover:bg-red-700 text-gray-50 hover:cursor-pointer duration-200 rounded-sm min-w-3/4 p-3 w-full flex items-center gap-3 hover:-translate-y-1')}
            >
                Tell us more
              </div> 
            </Link>
            : 
            (!isInCart ? 
              <Dialog>
                <DialogTrigger asChild>
                <div
                className={clsx(
                  'text-md font-semibold transition-transform duration-200 rounded-sm min-w-3/4 p-3 flex justify-center items-center gap-3 hover:-translate-y-1',
                  isInCart ? 'bg-red-400/50 hover:bg-red-400/80 text-black cursor-pointer' : 'bg-red-800 text-gray-200 cursor-pointer',
                  !isInCart && 'hover:bg-red-700 hover:-translate-y-1'
                )}
                aria-disabled={false}
              >
                <span>{isInCart ? props.cartStatus && props.cartStatus[1] : props.cartStatus && props.cartStatus[0]}</span>
                {isInCart ? <ShoppingCart className="text-black h-fit inline" /> : <ShoppingCart className="text-gray-50 h-fit inline" />}
              </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] primarybg">
                  <DialogHeader>
                    <DialogTitle>Choose the right plan for your business.</DialogTitle>
                    <DialogDescription className="text-sm">
                     <span>
                      <span className="flex justify-center">
                      <span className="text-red-800 font-semibold pr-1">{props.obj.header.package}</span><span className="text-sm">—{props.obj.header.description}</span>
                      </span>
                      <br/>
                     <div className="flex gap-2">
                     <div className="flex flex-col transition-transform duration-200 hover:-translate-y-1 gap-1 business shadow-2xl w-1/2 rounded-sm text-xs items-center py-4">
                       <p className="text-red-800 text-xl font-semibold">Annual Plan</p>
                       <p className="line-through">${props.obj.header.actualYearlyPrice}/year</p>
                       <p className="font-bold text-red-800">${props.obj.header.yearlyPrice}/year</p>
                       <span className="bg-green-700 text-white text-xs rounded-full px-2 py-1">save 20%</span>
                     </div>
                     <div className="flex flex-col gap-1 transition-transform duration-200 hover:-translate-y-1 bg-gray-50/30 shadow-2xl w-1/2 rounded-sm text-xs items-center justify-between py-4">
                       <div className="flex flex-col items-center">
                       <p className="text-red-800 text-xl font-semibold">Monthly Plan</p>
                       <p className="font-bold text-red-800 pt-2">${props.obj.header.monthlyPrice}/month</p>
                       </div>
                       <span className="bg-red-800 text-white text-xs rounded-full px-2 py-1">Billed Monthly</span>
                     </div>
                     </div>
                     </span>
                    </DialogDescription>
                  </DialogHeader>
                  <div className={'flex gap-5 justify-between'}>
                    <span onClick={addYearlyPlanToCart} className="px-5 py-3 flex items0-center rounded-sm group text-sm border-1 border-red-800 text-red-800 hover:cursor-pointer hover:bg-red-800 hover:text-white">Go with yearly plan <ChevronRight className="text-red-800 group-hover:text-white h-5" /></span>
                    <span onClick={addMonthlyPlanToCart} className="px-5 py-3 group flex items0-center rounded-sm text-sm border-1 border-stone-900 hover:border-red-800 text-stone-900/90 hover:cursor-pointer hover:text-white hover:bg-red-800">Go monthly <ChevronRight className="text-stone-900/90 h-5 group-hover:text-white" /></span>
                  </div>
                  </DialogContent>
            </Dialog>
            : 
            <div
                onClick={handleRemoveFromCart}
                className={clsx(
                  'text-md font-semibold transition-transform duration-200 rounded-sm min-w-3/4 p-3 w-fit flex justify-center items-center gap-3 hover:-translate-y-1',
                  isInCart ? 'bg-red-400/50 hover:bg-red-400/80 text-black cursor-pointer' : 'hover:bg-red-700 hover:-translate-y-1'
                )}
                aria-disabled={false}
              >
                <span>{isInCart ? props.cartStatus && props.cartStatus[1] : props.cartStatus && props.cartStatus[0]}</span>
                {isInCart ? <ShoppingCart className="text-black h-fit inline" /> : <ShoppingCart className="text-gray-50 h-fit inline" />}
              </div>
              )
          }
        </div>
      </div>
    </div>
  );
}