import { packages } from "./seo-plan-helper"
import Image from "next/image"
import { useState } from "react";
import { CartItemPayload } from "@/lib/types/cartItem";
import { toast } from "sonner";
import clsx from 'clsx';
import useCart from '@/globalState/cart';
import { ShoppingCart,ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const SeoPlancard = (props:{obj:packages,isYearly:boolean,isMiddle:boolean, loggedIn?: boolean,data?:CartItemPayload}) => {
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
        <div className={clsx(
          'business border-1 border-red-700 flex flex-col w-full md:min-w-1/4 rounded-t-2xl pb-10 relative',
          props.isMiddle && 'md:top-10'
        )}>
        {/* header */}
         {
            props?.obj?.header && 
            <div className="flex flex-col bg-red-800 rounded-t-2xl text-gray-100 items-center">
            <div className="flex flex-col items-center py-3">
            <p className='text-3xl font-semibold'>{props.obj.header?.ant}</p>
            <p className='text-xl font-semibold'>{props.obj.header.package}</p>
            <p className='text-sm font-semibold text-gray-100/80'>(SEO)</p>
            </div>
            <div className='darker-peach w-full flex justify-center items-center p-5'>
            <Image src={props.obj.header.url}  alt="image" height={120} width={120} className='w-[40%] h-[60%] md:w-fit md:h-[160px]' />
            </div>
            <span className='py-3 flex items-center gap-2'>
             <span className='font-bold text-4xl'>
             {props.obj.header.monthlyPrice!="Sign Up" && <sup className="text-2xl px-1">$</sup>}
             { props.isYearly ? props.obj.header.yearlyPrice : props.obj.header.monthlyPrice }
             </span>
             {props.obj.header.monthlyPrice != 'Sign Up' && <span className='font-light'>/ {props.isYearly ? 'Year' : 'Month'}</span> }
            </span>
         </div>
         }
         {/* tail */}
         <div className="flex flex-col h-full justify-between" >
         <div>
            <p className="p-5">{props?.obj?.header?.desc}</p>
         {props?.obj?.data?.map((data,idx) => (
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
         <div className="flex justify-center mt-4">
         {
            !isInCart ? 
              <Dialog>
                <DialogTrigger asChild>
                <div
                className={clsx(
                  'text-md font-semibold transition-transform duration-200 rounded-sm min-w-3/4 p-3 w-fit flex justify-center items-center gap-3 hover:-translate-y-1',
                  isInCart ? 'bg-red-400/50 hover:bg-red-400/80 text-black cursor-pointer' : 'bg-red-800 text-gray-200 cursor-pointer',
                  !isInCart && 'hover:bg-red-700 hover:-translate-y-1'
                )}
                aria-disabled={false}
              >
                <span>{isInCart ? 'Remove from cart' : 'Add to cart'}</span>
                {isInCart ? <ShoppingCart className="text-black h-fit inline" /> : <ShoppingCart className="text-gray-50 h-fit inline" />}
              </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] primarybg">
                  <DialogHeader>
                    <DialogTitle>Choose the right plan for your business.</DialogTitle>
                    <DialogDescription className="text-sm">
                     {/* <p>Select yearly plan to avail flat 20% discount.</p> */}
                     <span>
                      <span className="flex justify-center">
                      <span className="text-red-800 font-semibold pr-1">{props?.obj?.header?.package}</span><span className="text-sm">— {props.obj.header.subTitle}</span>
                      </span>
                      <br/>
                      <div className="flex gap-2">
                     <div className="flex flex-col transition-transform duration-200 hover:-translate-y-1 gap-1 business shadow-2xl w-1/2 rounded-sm text-xs items-center py-4">
                       <p className="text-red-800 text-xl font-semibold">Annual Plan</p>
                       {/* <p className="line-through">${props?.obj?.header?.actualYearlyPrice}/year</p> */}
                       <p className="font-bold text-red-800">${props?.obj?.header?.yearlyPrice}/year</p>
                       <span className="bg-green-700 text-white text-xs rounded-full px-2 py-1">save 20%</span>
                     </div>
                     <div className="flex flex-col gap-1 transition-transform duration-200 hover:-translate-y-1 bg-gray-50/30 shadow-2xl w-1/2 rounded-sm text-xs items-center justify-between py-4">
                       <div className="flex flex-col items-center">
                       <p className="text-red-800 text-xl font-semibold">Monthly Plan</p>
                       <p className="font-bold text-red-800 pt-2">${props?.obj?.header?.monthlyPrice}/month</p>
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
                  isInCart ? 'bg-red-400/50 hover:bg-red-400/80 text-black cursor-pointer' : 'bg-red-800 text-gray-200 cursor-pointer',
                  !isInCart && 'hover:bg-red-700 hover:-translate-y-1'
                )}
                aria-disabled={false}
              >
                <span>{isInCart ? 'Remove from cart' : 'Add to cart'}</span>
                {isInCart ? <ShoppingCart className="text-black h-fit inline" /> : <ShoppingCart className="text-gray-50 h-fit inline" />}
              </div>
          }
        </div>
         </div>
        </div>
    )
}