import axiosInstance from "@/lib/axiosInstance"
import { CartItemPayload } from "@/lib/types/cartItem";

export const addToSubscriptions = async (cartItems:{cartItems:CartItemPayload[]}) => {
    try {
        const res = await axiosInstance.post('/postSubscriptions', cartItems)
        return res.data;
    } catch (e) {
        return ({error:"Subscription failed"})
    }
}