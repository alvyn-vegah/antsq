import axiosInstance from "@/lib/axiosInstance";
import { contactFormType } from "@/lib/types/contactForm";

export async function submitContactForm(data: contactFormType) {
  try {
    const res = await axiosInstance.post("/postContactForm",data);
    return res.data;
  } catch (e) {
    return { error: 'Failed to submit request' };
  }
}

export async function delContactForm(id:string) {
  try {
    const res = await axiosInstance.delete('/delContactForm',{data:{id}});
    return res.data;
  } catch (e) {
    return {error:"Request failed to delete the form"}
  }
}