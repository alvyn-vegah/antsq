import axiosInstance from "@/lib/axiosInstance";
import { SignupSchemaType } from "@/lib/zod-schema/signup";

export const userSignup = async (data:SignupSchemaType & {privilege?:string}) => {
    try {
        const res = await axiosInstance.post('/user/signup',data);
        return res.data;
    } catch(e: unknown) {
        if (e instanceof Error) {
            console.error('Error while signing up', e.message);
            throw new Error(e.message || 'An unexpected error occurred');
        }
        console.error('An unexpected error occurred', e);
        throw new Error('An unexpected error occurred');
    }
}