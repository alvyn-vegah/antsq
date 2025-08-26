import axiosInstance from "@/lib/axiosInstance"

export const updateCustomFormStatusById = async (formId:string,status:string) => {
    try {
        const res = await axiosInstance.patch('/updateCustomFormStatusById', {formId,status})
        return res.data;
    } catch (e) {
        return ({error:"Server error while updating form status"})
    }
}