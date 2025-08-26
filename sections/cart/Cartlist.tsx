"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CartItemPayload } from "@/lib/types/cartItem";
import useCart from "@/globalState/cart";

const Cartlist = () => {
  const { cartItems, removeFromCart,updateCart } = useCart();

  const sessionCartRaw = sessionStorage.getItem("cartItems");
const sessionCart = sessionCartRaw ? JSON.parse(sessionCartRaw) : [];

  type cartPayload = CartItemPayload & { isyearly?: boolean };

  // Local state to manage quantity
  const [quantities, setQuantities] = useState<Record<string, number>>({});

   useEffect(() => {
    const sessionCartRaw = sessionStorage.getItem("cartItems");
    if (sessionCartRaw) {
      const sessionCart = JSON.parse(sessionCartRaw);
      if (Array.isArray(sessionCart) && sessionCart.length > 0) {
        updateCart(sessionCart);
      }
    }
  }, [updateCart]);

  useEffect(() => {
    if (cartItems.length) {
      const initialQuantities = cartItems.reduce((acc: any, item: any) => {
        acc[item.id] = item.quantity || 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cartItems]);

  const handleRemove = (itemId: string) => {
    removeFromCart(itemId);
  };

  return (
    <div className="space-y-6">
      {cartItems.length < 1 ? (
        <p className="text-md text-stone-800/70 font-semibold text-center">
          Your cart is empty.
        </p>
      ) : (
        cartItems.map((item: cartPayload) => (
          <div
            key={item.id || item.plan}
            className="flex flex-col md:flex-row items-start md:items-end gap-4 pb-6 business rounded-md p-5"
          >
            <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
              <Image
                src={item.url}
                alt="cart item image"
                width={40}
                height={40}
              />
            </div>

            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <h3 className="font-semibold">{item.plan}</h3>
                <span>|</span>
                <p className="text-sm text-stone-800/90">{item.description}</p>
              </div>
              <p className="text-xs text-stone-800/80 pb-1">{item.subtitle}</p>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-red-800">
                  ${item?.isyearly ? `${item.yearlyPrice}/year` : `${item.monthlyPrice}/month`}
                </span>
                {item.actualPrice && (
                  <span className="text-sm text-gray-700/80 line-through">
                  ${item.isyearly && item.isyearly == true ? `${item.actualYearlyPrice}/month` : `${item.actualPrice}/month`}
                  </span>
                )}
                {item.discount && (
                  <span className="text-xs bg-red-800 text-white rounded-full px-2 py-1">
                    {item.discount} %
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end h-full justify-between gap-5">
              <AlertDialog>
                <AlertDialogTrigger>
                  <Trash2 className="text-red-800 h-5 hover:cursor-pointer" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will remove the purchase from your cart list.
                      Add it into cart again in order to purchase.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="hover:cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-800 text-white hover:cursor-pointer"
                      onClick={() => handleRemove(item.id || "")}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
       {/*  no need of quantity change */}
              {/* <div className="flex items-center gap-3">
                <button
                  onClick={() => item.id && handleQuantityChange(item.id, -1)}
                  className="p-1 hover:cursor-pointer"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-gray-100 rounded-full h-fit w-fit p-1">
                        <Minus size={16} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="darker-peach">
                      <p>Decrease plan duration</p>
                    </TooltipContent>
                  </Tooltip>
                </button>
                <span>{quantities[item.id || ""]}</span>
                <button
                  onClick={() => item.id && handleQuantityChange(item.id, 1)}
                  className="p-1 hover:cursor-pointer"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="bg-gray-100 rounded-full h-fit w-fit p-1">
                        <Plus size={16} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="darker-peach">
                      <p>Increase plan duration</p>
                    </TooltipContent>
                  </Tooltip>
                </button>
              </div> */}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cartlist;
