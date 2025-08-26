import axiosInstance from "@/lib/axiosInstance"
import { paymentInfo } from "@/lib/types/billing";

export const savePaymentInfo = async (data:paymentInfo) => {
    try {
        const res = await axiosInstance.post('/savePaymentInfo', data)
        return res.data;
    } catch (e) {
        return ({error:"Server error while storing payment details"})
    }
}