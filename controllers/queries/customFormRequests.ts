import axiosInstance from "@/lib/axiosInstance"

export const getAllCustomForms = async () => {
    try {
        const res = await axiosInstance.get('/getAllCustomFormSubmissions')
        return res.data;
    } catch (e) {
        return {"message":"Axios Failed to fetch user privilege"}
    }
}

export const getFormStatusByEmail = async () => {
    try {
        const res = await axiosInstance.get('/getCustomFormStatusByEmail')
        return res.data;
    } catch (e) {
        return {"message":"Axios Failed to fetch form status"}
    }
}

export const getFormDetailsById = async (formId:string) => {
    try {
        const res = await axiosInstance.get(`/getCustomFormDetailsById?formId=${formId}`)
        return res.data;
    } catch (e) {
        return {"message":"Axios Failed to fetch form status"}
    }
}