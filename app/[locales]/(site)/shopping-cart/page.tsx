'use client'
import { Seo } from "@/customComponents/seo/Seo"
import { ShoppingCart, CreditCardIcon, Check, Lock } from 'lucide-react'
import Cartlist from "@/sections/cart/Cartlist"
import { useQuery } from "@tanstack/react-query"
import Recommended from "@/sections/cart/Recommended"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { billingSchema, BillingFormValues } from '@/lib/zod-schema/billing';
import { Link } from "@/navigation";
import clsx from 'clsx'
import useCart from "@/globalState/cart"
import { useSession } from "next-auth/react"
import { useRouter } from "@/navigation"
import { getProducts } from "@/controllers/queries/products"
import { useEffect,useState } from "react"

let defaultValues: BillingFormValues | undefined = undefined;
if (typeof window !== "undefined") {
  const billingInfoRaw = sessionStorage.getItem("billing-info");
  if (billingInfoRaw) {
    try {
      defaultValues = JSON.parse(billingInfoRaw);
    } catch (e) {
      console.error(e);
    }
  }
}

const Page = () => {
  const [isClient,setIsClient] = useState(false);
  const {getCartBreakdown,updateSeoProducts,hasSeoDiscount,cartItems} = useCart();
  const { subtotal, bundleDiscount } = getCartBreakdown();
  const {status} = useSession();
  const router = useRouter();  
  const hasDiscount = hasSeoDiscount();

  // Calculate tax manually
  const discountedSubtotal = hasDiscount ? subtotal - bundleDiscount : subtotal;
  const manualTax = discountedSubtotal * 0.0825;
  const total = discountedSubtotal + manualTax;
  // React Hook Form for billing info with Zod
  const { register, handleSubmit,
      formState: { errors } } = useForm<BillingFormValues>({
    resolver: zodResolver(billingSchema),
    defaultValues,
  });

  const onCompletePurchase = (data:BillingFormValues) => {
    // store billing info
    sessionStorage.setItem('billing-info',JSON.stringify(data));
    if(status==="authenticated") {
        router.push('/payment')
    } else {
      sessionStorage.setItem('navigateTo', "/shopping-cart");
      router.push('/signin');
    }
  }
  const {data:seoProducts} = useQuery({
    queryKey:['seo-products'],
    queryFn:getProducts
  })



  useEffect(() => {
    updateSeoProducts(seoProducts?.slice(-3))
    setIsClient(true);
  },[seoProducts,updateSeoProducts])

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
       {
        isClient && 
        <div className="min-h-screen prim-gradient px-5 md:px-8 pt-15">
        {/* Progress bar */}
        <div className="w-full mx-auto mb-8 flex items-center justify-center gap-4 pt-10">
          <div className="flex items-center text-red-800 gap-1">

            <span className="bg-red-800 text-white rounded-full px-5 py-1 flex items-center gap-1"><ShoppingCart className=" h-5 w-5" /> Cart</span>
          </div>
          <div className="h-[2px] w-16 bg-gray-300" />
          <div className="flex items-center text-gray-400">
          <span className="bg-gray-100 text-stone-700 rounded-full px-5 py-1 flex items-center gap-1"><CreditCardIcon className=" h-5 w-5" /> Payment</span>
          </div>
          <div className="h-[2px] w-16 bg-gray-300" />
          <div className="flex items-center text-gray-400">
          <span className="bg-gray-100 text-stone-700 rounded-full px-5 py-1 flex items-center gap-1"><Check className=" h-5 w-5" /> Complete</span>
          </div>
        </div>

        {/* Cart content grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left section - Cart items */}
          <div className="lg:col-span-2 w-full">
            <div className="bg-white/50 rounded-2xl p-6 w-full">
              <h2 className="text-3xl text-red-800 font-bold border-b-2 pb-5 border-black/50 mb-5">My Cart</h2>
              
              <Cartlist />
            </div>
            <Recommended />
            {/* payments */}
            <div className="w-full mt-8">
              {/* <div className="bg-gray-50/50 rounded-2xl p-6 shadow-sm w-full">
                <h2 className="text-xl font-semibold mb-6">Accepted Payments</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 w-full h-fit">
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
                </div>
              </div> */}

              {/* Billing information */}
              <div className="bg-gray-50/50 rounded-2xl p-6 mt-8 shadow-sm w-full">
                <h2 className="text-xl font-semibold mb-6">Billing Information</h2>
                <form id="billing-info" onSubmit={handleSubmit(onCompletePurchase)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 ">First Name</label>
                      <input
                        type="text"
                        placeholder="John"
                        className={clsx(
                          'w-full border rounded-lg p-3 bg-gray-50/60 focus:outline-red-800 focus:outline-2 focus:outline-offset-1',
                          errors.firstName && 'border-red-500'
                        )}
                        {...register('firstName')}
                      />
                      {errors.firstName && <span className="text-red-600 text-xs">{errors.firstName.message}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className={clsx(
                          'w-full border rounded-lg p-3 bg-gray-50/60 focus:outline-red-800 focus:outline-2 focus:outline-offset-1',
                          errors.lastName && 'border-red-500'
                        )}
                        {...register('lastName')}
                      />
                      {errors.lastName && <span className="text-red-600 text-xs">{errors.lastName.message}</span>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className={clsx(
                          'w-full border rounded-lg p-3 bg-gray-50/60 focus:outline-red-800 focus:outline-2 focus:outline-offset-1',
                          errors.email && 'border-red-500'
                        )}
                        {...register('email')}
                      />
                      {errors.email && <span className="text-red-600 text-xs">{errors.email.message}</span>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2 ">Address</label>
                      <input
                        type="text"
                        placeholder="123 Main Street"
                        className={clsx(
                          'w-full border rounded-lg p-3 bg-gray-50/60 focus:outline-red-800 focus:outline-2 focus:outline-offset-1',
                          errors.address && 'border-red-500'
                        )}
                        {...register('address')}
                      />
                      {errors.address && <span className="text-red-600 text-xs">{errors.address.message}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        placeholder="New York"
                        className={clsx(
                          'w-full border rounded-lg p-3 bg-gray-50/60 focus:outline-red-800 focus:outline-2 focus:outline-offset-1',
                          errors.city && 'border-red-500'
                        )}
                        {...register('city')}
                      />
                      {errors.city && <span className="text-red-600 text-xs">{errors.city.message}</span>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">ZIP Code</label>
                      <input
                        type="text"
                        placeholder="10001"
                        className={clsx(
                          'w-full border rounded-lg p-3 bg-gray-50/60 focus:outline-red-800 focus:outline-2 focus:outline-offset-1',
                          errors.zip && 'border-red-500'
                        )}
                        {...register('zip')}
                      />
                      {errors.zip && <span className="text-red-600 text-xs">{errors.zip.message}</span>}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Order summary section */}
          <div className="lg:col-span-1 w-full">
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
              <button
                className="w-full bg-red-800 flex items-center justify-center hover:cursor-pointer gap-1 text-white rounded-lg py-3 mt-6 hover:bg-red-700 transition-colors disabled:bg-neutral-400 disabled:text-gray-200 disabled:cursor-not-allowed"
                type="submit"
                form="billing-info"
                disabled={cartItems.length==0}
              >
                Purchase Now
                <Lock className="text-white h-5 w-5" />
              </button>
              
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

        {/* Footer trust badges */}
        <div className="py-10">
        <div className="w-full flex flex-wrap justify-center h-[80px] items-center gap-8 text-gray-600 text-sm bg-gray-50/50 rounded-lg">
          <div className="flex items-center gap-2">
            <span>🔒 SSL Secured</span>
          </div>
          <div className="flex items-center gap-2">
            <span>↩️ 30-Day Money Back</span>
          </div>
          <div className="flex items-center gap-2">
            <span>�� 24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⭐ 5-Star Rated</span>
          </div>
        </div>
        </div>
      </div>
       }
    </>
  );
}

export default Page;