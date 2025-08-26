"use client";

import { CheckCircle } from "lucide-react";
import { Link } from "@/navigation";
import { Seo } from "@/customComponents/seo/Seo";
import { ShoppingCart,CreditCardIcon,Check } from "lucide-react";
import { useEffect, useState } from "react";
import { addToSubscriptions } from "@/controllers/mutations/subscription";
import { CartItemPayload } from '@/lib/types/cartItem';
import { savePaymentInfo } from "@/controllers/mutations/savePaymentInfo";

type PurchasedCartItem = CartItemPayload & { purchaseDate: string };

const Page = () => {
  const [session_paymentIntent,setSession_paymentIntent] = useState({
    id: "",
    amount: 0,
    currency: "",
    status: "",
    created: 0,
    client_secret: "",
  })
  const [session_billingInfo,setSession_billingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  })
  const sessionCartItems = typeof window !== 'undefined' ? sessionStorage.getItem("cartItems") : null

  useEffect(() => {
    setSession_billingInfo(JSON.parse(sessionStorage.getItem("billing-info")!))
    setSession_paymentIntent(JSON.parse(sessionStorage.getItem("paymentIntent")!))
    const run = async () => {
      if (sessionCartItems) {
        const cartItems: CartItemPayload[] = JSON.parse(sessionCartItems);
        const now = new Date().toISOString();
        const purchasedCartItems: PurchasedCartItem[] = cartItems.map(item => ({
          ...item,
          purchaseDate: now,
        }));
        await addToSubscriptions({ cartItems: purchasedCartItems });
        await savePaymentInfo({billingInformation:session_billingInfo,paymentIntent:session_paymentIntent})
      }
    };
    run();
  }, []);

  return (
    <>
      <Seo
        title="Payment Success - Antsq"
        subtitle="Antsq"
        keywords={[
          "payment success",
          "digital services",
          "social media management",
          "content creation"
        ]}
        description="Your payment has been completed successfully. Thank you for choosing Antsq."
      />

      {/* Main container */}
      <div className="min-h-screen primarybg px-5 md:px-8 pt-15 flex flex-col justify-center items-center">
        {/* Progress bar */}
        <div className="w-full mx-auto flex items-center justify-center gap-4 pt-10">
          <div className="flex items-center text-red-800 gap-1">
            <span className="bg-red-800 text-white rounded-full px-5 py-1 flex items-center gap-1">
              <ShoppingCart className=" h-5 w-5" /> Cart
            </span>
          </div>
          <div className="h-[2px] w-16 bg-red-800" />
          <div className="flex items-center text-gray-400">
            <span className="bg-red-800 text-white rounded-full px-5 py-1 flex items-center gap-1">
              <CreditCardIcon className=" h-5 w-5" /> Payment
            </span>
          </div>
          <div className="h-[2px] w-16 bg-red-800" />
          <div className="flex items-center text-gray-400">
            <span className="bg-red-800 text-white rounded-full px-5 py-1 flex items-center gap-1">
              <Check className=" h-5 w-5" /> Complete
            </span>
          </div>
        </div>
        
        {/* card */}
        <div className="bg-white rounded-2xl shadow-xl border border-red-100 overflow-hidden w-3/4 mt-10">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Payment Successful!</h1>
            <p className="text-lg text-slate-600">Your payment has been completed successfully.</p>
          </div>

          {/* Payment Details */}
          <div className="px-8 py-8">
            <div className="space-y-6">
              {/* Transaction Info */}
              {
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="text-sm text-slate-800">{session_paymentIntent?.id || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-900">
                        {session_paymentIntent?.created ? new Date(session_paymentIntent.created * 1000).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-red-800 text-lg">
                        ${session_paymentIntent?.amount ? (session_paymentIntent.amount / 100).toFixed(2) : '0.00'}
                      </span>
                    </div>
                  </div>
                </div>
              }

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-4">{"What's Next?"}</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-800 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Your services will be activated in a short while.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-800 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Our team will contact to initiate services</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-800 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">You can view your subscriptions in your dashboard.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full">
                <Link href={'/subscriptions'} className="w-full">
                <button className="bg-red-800 text-white py-4 px-6 rounded-lg font-semibold hover:bg-red-700 hover:cursor-pointer transition-colors duration-200 shadow-md hover:shadow-lg w-full">
                  Go to Dashboard
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
