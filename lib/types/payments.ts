// Define types for payment data
import Stripe from "stripe";
export interface PaymentDataType {
    id: string;
    amount: number;
    currency: string;
    status: Stripe.PaymentIntent.Status;
    created: number;
    client_secret: string | null;
  }

export interface PaymentIntentResponse {
  clientSecret: string | null;
  paymentIntent: PaymentDataType;
}

export interface PaymentIntentError {
  error: string;
}

export type PaymentIntentResult = PaymentIntentResponse | PaymentIntentError;