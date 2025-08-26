'use client';

import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { initiatePayment } from '@/controllers/mutations/payments';
import useCart from '@/globalState/cart';

export type CheckoutPageHandle = {
  submitPayment: () => void;
};

const CheckoutPage = forwardRef(({ amount }: { amount: number }, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const {cartItems}  = useCart()
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState('');
  const billingInformation = JSON.parse(sessionStorage.getItem("billing-info")!)
  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements?.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${url}/success?a=${amount}`,
      },
    })

    if (error) {
      setErrorMessage(error.message);
    }
  };

  // expose this method to parent
  useImperativeHandle(ref, () => ({
    submitPayment: handleSubmit,
  }));

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const res = await initiatePayment({cartItems,billingInformation});
        if ('error' in res) {
          setErrorMessage(res.error);
        } else {
          setClientSecret(res.clientSecret || '');
          sessionStorage.setItem("paymentIntent",JSON.stringify(res.paymentIntent));
        }
      } catch (error) {
        setErrorMessage('Failed to initialize payment');
      }
    };

    if (cartItems.length > 0) {
      fetchClientSecret();
    }
  }, [cartItems]);

  return (
    <div className="flex justify-center">
      <div className="w-full">
        {!stripe || !elements || !clientSecret ? (
          <div className="space-y-4 animate-pulse">
            {/* Card number skeleton */}
            <div className="h-12 bg-gray-200 rounded-md"></div>
            {/* Expiry and CVC skeleton */}
            <div className="flex gap-4">
              <div className="flex-1 h-12 bg-gray-200 rounded-md"></div>
              <div className="flex-1 h-12 bg-gray-200 rounded-md"></div>
            </div>
            {/* Name skeleton */}
            <div className="h-12 bg-gray-200 rounded-md"></div>
            {/* Submit button skeleton */}
            <div className="h-12 bg-gray-200 rounded-md"></div>
          </div>
        ) : (
          <form action="payment-form" onSubmit={(e) => e.preventDefault()}>
            {clientSecret && <PaymentElement />}
            {errorMessage && (
              <div className="text-red-800 text-sm font-semibold">
                {errorMessage}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
});

CheckoutPage.displayName = 'CheckoutPage'; // for React DevTools warning

export default CheckoutPage;
