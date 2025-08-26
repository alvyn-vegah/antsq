'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchemaType, signinSchema } from "@/lib/zod-schema/signin";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Link } from "@/navigation";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function SigninPage() {
const t = useTranslations('signinPage');
  const translations = {
    title: t('title'),
    subtitle: t('subtitle'),
    fields: t.raw('form.fields'),
    submitButton: t('form.submitButton').split("|"),
    noAccountText: t('noAccountText'),
    signUpLink: t('signUpLink'),
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
  });

  const [serverError, setServerError] = useState("");

  const onSubmit = async (data: SigninSchemaType) => {
    setServerError("");
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/", // or /dashboard
    });

    if (res?.error) {
      setServerError("Invalid email or password");
    } else if (res?.ok) {
      window.location.href = res.url || "/";
    }
  };

  return (
    <div className="pt-[10vh] primarybg px-5 md:px-10 lg:px-20">
      <div className="h-[90vh] flex items-center justify-center">
        <div className="flex flex-col w-full md:w-3/4 items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full md:w-1/2 mx-auto">
            <div>
              <h1 className="text-4xl text-center font-bold pb-3 text-red-800">{translations.title}</h1>
              <p className="text-sm text-center pb-5 text-stone-700/90">{translations.subtitle}</p>
              <input
                type="email"
                placeholder={translations.fields[0].placeholder}
                {...register("email")}
                className="w-full border p-2 rounded bg-[#fad4cb]"
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <input
                type="password"
                placeholder={translations.fields[1].placeholder}
                {...register("password")}
                className="w-full border p-2 rounded bg-[#fad4cb]"
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-800 text-white flex justify-center items-center px-4 py-2 rounded w-full hover:cursor-pointer hover:bg-red-700"
            >
              {isSubmitting ? 
              <span className="flex gap-2 items-center">
                <p>{translations.submitButton[1]}</p>
                <LoaderCircle className="h-4 w-4 animate-spin" />
              </span> : 
              <span>{translations.submitButton[0]}</span>
              }
            </button>
            {serverError && <p className="text-red-600 text-sm text-center">{serverError}</p>}
          </form>
          <span className="text-sm text-stone-800/90 py-2">{translations.noAccountText}
          <Link href={'/signup'}>
          <span className="underline text-red-800 text-md">{translations.signUpLink}</span>
          </Link>
          </span>
          <div className="flex flex-col items-center justify-center w-full sm:w-1/2 gap-4">
            <div className="w-full flex items-center justify-center py-4">
              <span className="text-gray-500">or</span>
            </div>
            {/* Google OAuth login */}
            <button
              onClick={() => signIn("google", { callbackUrl: sessionStorage.getItem("navigateTo")??"/" })}
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded px-4 py-2 shadow hover:bg-gray-50 hover:cursor-pointer"
            >
              <img src="/oauth.webp" alt="Google" className="h-5 w-5" />
              <span className="text-gray-700">Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}