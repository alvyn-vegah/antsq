import axiosInstance from "@/lib/axiosInstance"

export const isAdmin = async () => {
    try {
        const res = await axiosInstance.get('/isAdmin')
        return res.data;
    } catch (e) {
        return {"message":"Axios Failed to fetch user privilege"}
    }
}