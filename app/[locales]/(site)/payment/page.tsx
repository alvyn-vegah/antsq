'use client'
import { ShoppingCart,CreditCardIcon,Check,Lock, LoaderCircle } from "lucide-react";
import { Link } from "@/navigation";
import { Seo } from "@/customComponents/seo/Seo";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage, { CheckoutPageHandle } from "@/customComponents/Checkoutpage";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubCurr from "@/lib/convertToSubCurr";
import useCart from "@/globalState/cart";
import { useRef, useState,useEffect } from "react";
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
} from "@/components/ui/alert-dialog"
import { useRouter } from "@/navigation";
import { billingInfoType } from "@/lib/types/billing";

if(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("Public key is undefined")
  }
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const Page = () => {
    const [isClient,setIsClient] = useState(false);
    const [makingPayment,setMakingPayment] = useState(false);
    const [session_billingInformation,setSession_billingInformation] = useState<billingInfoType | null>(null);
    useEffect(() => setIsClient(true), []);
  const {getCartBreakdown,hasSeoDiscount} = useCart();
  const { subtotal, bundleDiscount } = getCartBreakdown();
  const router = useRouter();
  
  const checkoutRef = useRef<CheckoutPageHandle>(null);

  const initiatePayment = () => {
     checkoutRef.current?.submitPayment();
  }

  const hasDiscount = hasSeoDiscount();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const billingInfo = sessionStorage.getItem("billing-info");
      if (!billingInfo) {
        router.push("/shopping-cart");
      } else {
        setSession_billingInformation(JSON.parse(billingInfo));
      }
    }
  }, [router]);
  // Calculate tax manually on client side (actual tax is calculated on server)
  const discountedSubtotal = hasDiscount ? subtotal - bundleDiscount : subtotal;
  const manualTax = discountedSubtotal * 0.0825;
  const total = discountedSubtotal + manualTax;

  // Guard: don't render until billing info is loaded on client
  if (!isClient || session_billingInformation === null) {
    return null; // or a loading spinner
  }

    return (
        <>
      <Seo
        title="Shopping Cart - Antsq"
        subtitle="Antsq"
        keywords={[
          "shopping cart",
          "digital services",
          "social media management",
          "content creation"
        ]}
        description="Complete your purchase of premium digital marketing services with Antsq."
      />

      {/* Main container */}
      <div className="min-h-screen primarybg px-5 md:px-8 pt-15">
        {/* Progress bar */}
        <div className="w-full mx-auto mb-8 flex items-center justify-center gap-4 pt-10">
          <div className="flex items-center text-red-800 gap-1">

            <span className="bg-red-800 text-white rounded-full px-5 py-1 flex items-center gap-1"><ShoppingCart className=" h-5 w-5" /> Cart</span>
          </div>
          <div className="h-[2px] w-16 bg-red-800" />
          <div className="flex items-center text-gray-400">
          <span className="bg-red-800 text-white rounded-full px-5 py-1 flex items-center gap-1"><CreditCardIcon className=" h-5 w-5" /> Payment</span>
          </div>
          <div className="h-[2px] w-16 bg-gray-300" />
          <div className="flex items-center text-gray-400">
          <span className="bg-gray-100 text-stone-700 rounded-full px-5 py-1 flex items-center gap-1"><Check className=" h-5 w-5" /> Complete</span>
          </div>
        </div>
        {/* card details */}
      <div className="flex fle  x-col md:flex-row px-5 justify-between">
      <div className="bg-gray-50/50 rounded-2xl p-6 shadow-sm w-full md:w-1/2 sticky">
                <h2 className="text-xl font-bold mb-6 text-red-800">Payment Information</h2>
                
                {/* Payment options, integration comes with stripe components */}
                {/* enable payment options in stripe dashboard */}
                {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 w-full h-fit">
                  <button className="border duration-200 hover:-translate-y-1 focus:outline-red-800 focus:outline-2 focus:outline-offset-1 bg-gray-50/60 rounded-lg p-4 flex items-center justify-center gap-2 transition-all w-full">
                    <CreditCard />
                    <span>Credit Card</span>
                  </button>
                  <button className="border transition-transform duration-200 hover:-translate-y-1 focus:outline-red-800 focus:outline-2 focus:outline-offset-1 flex bg-gray-50/60 flex-col rounded-lg p-4 items-center justify-center gap-2">
                    <Image src="/checkout/paypal.png" alt="PayPal" width={70} height={60} />
                    <span>PayPal</span>
                  </button>
                  <button className="border transition-transform duration-200 hover:-translate-y-1 focus:outline-red-800 focus:outline-2 focus:outline-offset-1 bg-gray-50/60 rounded-lg p-4 flex flex-col items-center justify-center gap-2">
                    <Image src="/checkout/gpay.svg" alt="Google Pay" width={50} height={60} />
                    <span>Google Pay</span>
                  </button>
                  <button className="border transition-transform duration-200 hover:-translate-y-1 focus:outline-red-800 focus:outline-2 focus:outline-offset-1 bg-gray-50/60 rounded-lg p-4 flex flex-col items-center justify-center gap-2">
                    <Image src="/checkout/apple-payy.png" alt="Apple Pay" width={100} height={60}/>
                    <span>Apple Pay</span>
                  </button>
                </div> */}

                {/* Credit card form */}
                <div className="w-full">
                <Elements
          stripe={stripePromise}
          options={{
            mode:"payment",
            currency:"usd",
            amount:convertToSubCurr(1),
          }}
          >
           <CheckoutPage ref={checkoutRef} amount={2} />
          </Elements>
                </div>
              </div>
              {/*order summary */}
              <div className="lg:col-span-1 w-full md:w-1/3">
            <div className="primarybg rounded-2xl p-5 shadow-2xl sticky top-17 w-full">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{isClient ? `$${subtotal.toFixed(2)}` : '...'}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Bundle Discount</span>
                    <span>-{isClient ? `$${hasDiscount ? bundleDiscount.toFixed(2) : '0.00'}` : '...'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8.25%)</span>
                    <span>{isClient ? `$${isNaN(manualTax) ? '0.00' : manualTax.toFixed(2)}` : '...'}</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{isClient ? `$${isNaN(total) ? '0.00' : total.toFixed(2)}` : '...'}</span>
                  </div>
                </div>
              </div>
              
              <AlertDialog>
      <AlertDialogTrigger asChild>
      <button
                className="w-full bg-red-800 flex items-center justify-center hover:cursor-pointer gap-1 text-white rounded-lg py-3 mt-6 hover:bg-red-700 transition-colors"
                >
                {makingPayment ? <div className="flex items-center gap-1">
                  <p>Processing</p>
                  <LoaderCircle className="text-white h-4 w-4 animate-spin" />
                </div>
                : 
                <div className="flex items-center justify-center gap-2">
                  <p>Purchase Now</p>
                  <Lock className="text-white h-5 w-5" />
                </div>
                }
              </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
          <AlertDialogDescription>
          By proceeding, you agree to pay the total amount for this order. Please verify your items before continuing.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:cursor-pointer bg-slate-200 hover:bg-slate-100">Cancel</AlertDialogCancel>
          <AlertDialogAction className="hover:cursor-pointer bg-red-800 hover:bg-red-700" onClick={() => {
            initiatePayment();
            setMakingPayment(true);
          }}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
              
              <Link href={"/plans-pricing"}>
              <button type="submit" className="w-full border border-gray-300 rounded-lg py-3 mt-3 hover:cursor-pointer hover:bg-red-800 hover:text-gray-50 transition-colors">
                Continue Shopping
              </button>
              </Link>
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>🔒 Secure 256-bit SSL encryption</p>
              </div>
            </div>
          </div>
      </div>
      </div>
    </>
    )
}

export default Page;