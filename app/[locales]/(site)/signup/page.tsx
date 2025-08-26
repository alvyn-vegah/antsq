"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchemaType,signupSchema } from "@/lib/zod-schema/signup";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userSignup } from "@/controllers/mutations/signup";
import { Link } from "@/navigation";
import { LoaderCircle } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useTranslations } from "next-intl";

export default function SignupForm() {
  const t = useTranslations('signupPage');
  const signupPage = {
    title: t('title'),
    subtitle: t('subtitle'),
    signInLink: t('signInLink'),
    form: {
      fields: t.raw('form.fields'),
      submitButton: t('form.submitButton'),
    },
    submitButton: t('form.submitButton').split("|")
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
  });

  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: userSignup
  });

  const onSubmit = async (data: SignupSchemaType) => {
    setServerError("");
    const signupPayload = {...data,privilege:"user"}
    try {
      const res = await signupMutation.mutateAsync(signupPayload);

      if(res?.error) {
        setServerError(res.error || 'Signup failed')
        return;
      }

      // Fetch session to check privilege
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();
      if (session?.user?.privilege !== 'admin') {
        router.replace("/"); // or show an error
        return;
      }
      // If admin, redirect to admin page or dashboard
      router.replace("/admin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message || 'something went wrong')
      }
    }}

  return (
    <div className="pt-[10vh] primarybg px-5 md:px-10 lg:px-20">
       <div className="h-[90vh] flex items-center justify-center">
       <div className="flex flex-col md:flex-row w-full md:w-3/4">
       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full md:w-1/2 mx-auto">
      <div>
        <h1 className="text-4xl text-center font-bold pb-3 text-red-800">{signupPage.title}</h1>
        <div className="flex justify-center items-center"> 
        <span className="text-sm pb-5 text-stone-700/90 text-center">{signupPage.subtitle} <Link href={'/signin'}><span className="text-red-800 text-md underline">{signupPage.signInLink}</span></Link></span>
        </div>
        <input
          type="text"
          placeholder={signupPage.form.fields[0].placeholder}
          {...register("name")}
          className="w-full border p-2 rounded bg-[#fad4cb]"
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder={signupPage.form.fields[1].placeholder}
          {...register("email")}
          className="w-full border p-2 rounded bg-[#fad4cb]"
        />
        {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder={signupPage.form.fields[2].placeholder}
          {...register("password")}
          className="w-full border p-2 rounded bg-[#fad4cb]"
        />
        {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-red-800 text-white px-4 py-2 rounded w-full hover:cursor-pointer hover:bg-red-700"
      >
        {isSubmitting ? 
              <span className="flex gap-2 items-center justify-center">
                <p>{signupPage.submitButton[1]}</p>
                <LoaderCircle className="h-4 w-4 animate-spin" />
              </span> : 
              <span>{signupPage.submitButton[0]}</span>
              }
      </button>

      {serverError && <p className="text-red-600 text-sm text-center">{serverError}</p>}
    </form>
    <div className="flex w-2/3">
        <img src="/ai-writer/hero.png" alt="" className="h-full w-full" />
    </div>
       </div>
       </div>
    </div>
  );
}
