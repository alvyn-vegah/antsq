import axiosInstance from "@/lib/axiosInstance"

export const getSubscriptions = async () => {
    try {
        const res = await axiosInstance.get("/getSubscriptions")
        return res.data;
    } catch (e) {
        console.error("Error while fetching subscriptions", e)
    }
}
export const getAllSubscriptions = async () => {
    try {
        const res = await axiosInstance.get("/getAllSubscriptions")
        return res.data;
    } catch (e) {
        console.error("Error while fetching subscribers", e)
    }
}
export const getSubscriptionsById = async (userId:string) => {
    try {
        const res = await axiosInstance.get(`/getSubById?userId=${userId}`)
        return res.data;
    } catch (e) {
        console.error("Error while fetching user subscriptions", e)
    }
}
export const getTotalRevenue = async () => {
    try {
        const res = await axiosInstance.get('/getTotalPayments')
        return res.data;
    } catch (e) {
        console.error("Error while fetching user subscriptions", e)
    }
}