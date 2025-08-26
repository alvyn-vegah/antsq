import axiosInstance from "@/lib/axiosInstance"

export const getAllContactForms = async () => {
    try {
        const res = await axiosInstance.get('/getAllContactForms')
        return res.data;
    } catch (e) {
        return {"message":"Axios Failed to fetch user privilege"}
    }
}