import axiosInstance from "@/lib/axiosInstance";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getAiProducts = async () => {
    try {
        const res = await axiosInstance.get(`${apiUrl}/getAiProducts`)
        return res.data;
    } catch (e) {
        return {"message":"Axios Failed to fetch ai products"}
    }
}

export const getProducts = async () => {
    try {
        const res = await axiosInstance.get(`${apiUrl}/getProducts`)
        return res.data;
    } catch (e) {
        return {"message":"Axios Failed to fetch products"}
    }
}

export const getAllProducts = async () => {
    try {
        const res = await axiosInstance.get(`${apiUrl}/getAllProducts`)
        return res.data;
    } catch (e) {
        return {"message":"Axios Failed to fetch all products"}
    }
}