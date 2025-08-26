import axiosInstance from "@/lib/axiosInstance";
import { CustomRequestFormType } from "@/lib/types/forms";

export async function submitWebform(data: CustomRequestFormType) {
  try {
    const res = await axiosInstance.post("/webform",data);
    return res.data;
  } catch (e) {
    return { error: 'Failed to submit request' };
  }
} 