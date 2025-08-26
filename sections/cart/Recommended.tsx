'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { CartItemPayload } from "@/lib/types/cartItem";
import { getProducts } from "@/controllers/queries/products";
import useCart from "@/globalState/cart";
import { gsap } from "gsap"
    
const Recommended = () => {
    const TIMER_DURATION = 18 * 60 * 60 + 38 * 60; // 18 hours 38 minutes in seconds
    const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
    const [currentlyAddingId, setCurrentlyAddingId] = useState<string | null>(null);
    const {cartItems, addToCart} = useCart();
    function getOrSetTimerStart() {
        const key = "bundle-timer-start";
        const now = Date.now();
        let start = null;
        if (typeof window !== 'undefined') {
          start = localStorage.getItem(key);
          if (!start) {
            localStorage.setItem(key, now.toString());
            return now;
          }
          return parseInt(start, 10);
        }
        return now;
      }

      useEffect(() => {
        const tl = gsap.timeline({ repeat: -1 })
      
        tl.to("#loader-line", {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.out", // stretch forward
        }).to("#loader-line", {
          transformOrigin: "right",
          scaleX: 0,
          duration: 1,
          ease: "power2.in", // tail catches up
        })
      }, [])

    const {data: allProducts = [], isLoading} = useQuery({
      queryKey:['allProducts'],
      queryFn:getProducts,
    })
    
    const seoProducts = allProducts.slice(-3);
    // Filter out products already in the cart
    const recommendedProducts = Array.isArray(seoProducts)
      ? seoProducts.filter((product: CartItemPayload) =>
          !cartItems.some(cartItem => cartItem.id === product.id)
        )
      : [];

    useEffect(() => {
        function updateTime() {
          const start = getOrSetTimerStart();
          const now = Date.now();
          let elapsed = Math.floor((now - start) / 1000);
          let left = TIMER_DURATION - elapsed;
          if (left <= 0) {
            // Timer expired, reset
            if (typeof window !== 'undefined') {
              localStorage.setItem("bundle-timer-start", now.toString());
            }
            left = TIMER_DURATION;
          }
          setTimeLeft(left);
        }
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
      }, []);
    
      const hours = Math.floor(timeLeft / 3600);
      const minutes = Math.floor((timeLeft % 3600) / 60);
      const seconds = timeLeft % 60;
    return (
        <div className="bg-gray-50/80 rounded-2xl p-6 mt-8 shadow-sm w-full">
              <div className="flex items-center gap-2 mb-2 justify-center">
              {/* <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full"></span> */}
                <h2 className="text-2xl font-bold text-red-800">Recommended with Your Order</h2>
                {/* <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full"></span> */}
              </div>
              <span className="text-sm font-semibold text-center flex justify-center pb-5">
              💡<span className="font-semibold">92% of customers</span> who bought your services also added these
              </span>
              
              {/* Mega bundle deal */}
              <div className="bg-orange-100 rounded-t-lg p-4 mb-6 relative">
                <div className="text-center">
                  <h3 className="font-semibold">🎁 MEGA BUNDLE DEAL 🎁</h3>
                  <span className="text-sm block">Add any 1 service below = <span className="font-bold">20% extra discount</span> (Save $200+)</span>
                  <span className="text-xs text-red-800">
                    ⏰ Limited time: Expires in {hours}h {minutes}m {seconds}s
                  </span>
                </div>
<div className="w-full h-2 rounded shimmer-line mt-2" />
                </div>
              {/* Recommended items grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading ? (
                  <div className="col-span-2 text-center py-8">Loading recommendations...</div>
                ) : recommendedProducts.length > 0 ? (
                  recommendedProducts.map((item: CartItemPayload) => (
                    <div key={item.id || item.plan} className="border business rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <Image src={item.url} alt="" width={24} height={24} />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{item.plan}</h3>
                          </div>
                          <p className="text-sm text-gray-600">{item.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="font-semibold">${item.yearlyPrice}/yr</span>
                            <span className="text-sm text-stone-700 line-through">${item.actualYearlyPrice}/yr</span>
                          </div>
                          <button
                            className="mt-2 hover:cursor-pointer w-full bg-red-800 text-white rounded-lg py-2 hover:bg-red-700 transition-colors"
                            onClick={() => {
                              addToCart({...item,monthlyPrice: item.monthlyPrice || "0",isSeoBundle:true,isyearly:true});
                            }}
                            disabled={currentlyAddingId === (item.id || item.plan)}
                          >
                            {currentlyAddingId === (item.id || item.plan) ? "Adding..." : "+ Add & Save 20%"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-gray-500">No recommendations available.</div>
                )}
              </div>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p>⚡ Last chance! This exclusive 20% extra discount expires when you checkout</p>
                <p>💼 Professional tip: Customers who bundle services see 3x better results</p>
              </div>
            </div>
    )
}

export default Recommended;