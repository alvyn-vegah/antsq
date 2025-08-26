import axiosInstance from "@/lib/axiosInstance"
import { CartItemPayload } from "@/lib/types/cartItem";

type inputProps = {
    cartItems:CartItemPayload[],
    billingInformation:Record<string,unknown>
}

import { PaymentIntentResult } from '@/lib/types/payments';

export const initiatePayment = async (data:inputProps): Promise<PaymentIntentResult> => {
    try {
        const res = await axiosInstance.post('/create_payment_intent', data)
        return res.data;
    } catch (e) {
        return ({error:"payment failed"})
    }
}

export const getPaymentsByEmail = async (data:{email:string}) => {
    try {
        const res = await axiosInstance.post('/getPaymentsByEmail', data)
        return res.data;
    } catch (e) {
        return ({error:"Axios failed to fetch payments data"})
    }
}