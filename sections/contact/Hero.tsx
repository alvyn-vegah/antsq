"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {useForm} from 'react-hook-form'
gsap.registerPlugin(ScrollTrigger);
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormType,contactPagePropsType } from "@/lib/types/contactForm";
import { useMutation } from "@tanstack/react-query";
import { submitContactForm } from "@/controllers/mutations/contactForms";
import { useRouter } from "@/navigation";
import { Loader2 } from "lucide-react";

const defaultValues: contactFormType = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  bsmm:false,
  seo:false,
  brm:false,
  em:false,
  gd:false,
  wd:false,
  other:false,
  message:'',
};

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phoneNumber: z
  .string()
  .min(1, 'Phone Number is required')
  .regex(/^\+\d{1,4}[0-9]{6,14}$/, 'Invalid phone number format'),
  bsmm: z.boolean().default(false),
  seo: z.boolean().default(false),
  brm: z.boolean().default(false),
  em: z.boolean().default(false),
  gd: z.boolean().default(false),
  wd: z.boolean().default(false),
  other: z.boolean().default(false),
  message: z.string().min(1, 'Message is required').max(500, 'Message must be less than 500 characters'),
});


const Hero = (props:{data:contactPagePropsType}) => {
  const contactForm = props.data.contactForm;
  const contactInfo = props.data.contactInfo;
  const socialSection = props.data.socialSection;
  const [btn,btnPending] = props.data.contactForm.submitButton.split('|');
  const tl = gsap.timeline();
  const imgRef1 = useRef(null);
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState([false, false, false, false]);
  const [isHoveredMsg, setIsHoveredMsg] = useState(false);
  const { register, handleSubmit, setValue, formState, watch } = useForm<contactFormType>({ defaultValues,
    resolver: zodResolver(contactFormSchema),
   });
  const { errors, isSubmitting } = formState;
  const mutation = useMutation({
    mutationKey:['contact-form'],
    mutationFn:submitContactForm,
    onSuccess:() => {
     router.push('/contact/success');
    }
  })
  const values = watch();
  useEffect(() => {
    tl.to(imgRef1.current, {
      x: "9vw",
      duration: 0.5,
      ease: "none",
    });
    tl.to(imgRef1.current, {
      x: "20vw",
      scrollTrigger: {  
        trigger: "#heroSection",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      startAt: { x: "9vw" },
    });

    gsap.fromTo(
      "#bg",
      {
        scale: 1.1,
      },
      {
        scale: 1.3,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        repeatDelay: 1,
      }
    );
  }, []);
  const handleScroll = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = (data:contactFormType) => {
    const payload = {...data,submittedOn:new Date().toISOString()}
    mutation.mutate(payload);
  }

  return (
    <div>
      <div className="relative min-h-screen w-full  flex items-center 2xl:items-center justify-center pt-10 px-10 sm:px-20 overflow-x-clip">
        <img
          src={"/landing/heropic-1.svg"}
          className="opacity-40 w-[70px] h-[70px]  md:w-[150px] md:h-[150px] absolute top-18 inset-x-auto"
        />
        <img
          ref={imgRef1}
          src={"/landing/heropic-2.svg"}
          className="heropic2 w-[70px] h-[70px]  md:w-[120px] md:h-[120px]  absolute top-18 left-[-40]"
        />
        <img
          src={"/landing/heropic-3.svg"}
          className="heropic2 w-[120px] h-[120px] absolute bottom-18 z-0"
        />
        <img
          src={"/landing/wave-1.png"}
          className="w-full h-[400px] absolute bottom-0"
        />
        <img
          src={"/landing/wave-2.png"}
          className="w-full h-[400px] absolute bottom-0 opacity-69"
        />
        <img
          src={"/landing/wave-3.png"}
          className="w-full h-[400px] absolute bottom-0 opacity-50"
        />
        <img
          id="bg"
          src={"/landing/back.jpg"}
          className="absolute min-h-[100vh] top-0 left-0 object-cover -z-10"
        />
        <div className="w-full h-full max-w-screen-xl mx-auto flex flex-col gap-5 items-center justify-between z-30 md:mt-10">
          <h1 className="text-4xl md:text-7xl font-extrabold text-center relative z-30">
            {props.data.title}
          </h1>
          <h2 className="text-center text-xl md:text-2xl font-semibold">{props.data.description}</h2>
          <ul className="list-disc text-lg text-stone-800 pl-5 space-y-1">
  {props.data.features.map((item) => <li>{item}</li>)}
</ul>
          <button
            onClick={() => handleScroll()}
            className={[
              'z-20 px-8 py-3 rounded-full text-lg text-gray-50 font-semibold transition-transform duration-300 inline-block',
              isHovered ? 'bg-red-700 -translate-y-1 cursor-pointer' : 'bg-red-800'
            ].join(' ')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {props.data.buttonText}
          </button>
        </div>
        <div className="absolute w-full h-full inset-0 bg-[#f7c2b9] opacity-30 z-0" />
      </div>
      <div
        ref={sectionRef}
        className="primarybg flex flex-col md:flex-row gap-10 w-full p-10 md:px-15 lg:px-20"
      >
        <form className="w-full md:w-[65%] bg-gray-50/50 p-5 rounded-lg z-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-2 py-2">
            <div className="flex flex-col w-full md:w-1/2 gap-1">
              <p>{contactForm.fields.firstName.label}</p>
              <input className="bg-[#f6e3df] rounded-sm w-full p-3"
              {...register('firstName')}
               />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
            </div>
            <div className="flex flex-col w-full md:w-1/2 gap-1">
            <p>{contactForm.fields.lastName.label}</p>
              <input className="bg-[#f6e3df] rounded-sm w-full p-3"
               {...register('lastName')}
                />
    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}

            </div>
          </div>
          <div className="flex flex-col gap-1 py-2">
          <p>{contactForm.fields.email.label}</p>
            <input type="text" className="w-full bg-[#f6e3df] rounded-sm p-3"
             {...register('email')}
              />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

          </div>
          <div className="flex flex-col gap-1 py-2">
          <p>{contactForm.fields.phoneNumber.label}</p>
            <input type="text" placeholder="+919988439448" className="w-full p-3 bg-[#f6e3df] rounded-sm"
             {...register('phoneNumber')} />
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
          </div>
          <div className="py-4 rounded">
            <label className="font-bold block mb-2">{contactForm.serviceOptions.title}</label>
            <div className="flex flex-col gap-2">
                <label
                  className="flex items-center gap-2 font-normal"
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={values?.bsmm?.toString()}
                    onChange={() => setValue('bsmm',!values.bsmm)}
                    className="w-4 h-4"
                  />
                  {contactForm.serviceOptions.options[0]}
                </label>
                <label
                  className="flex items-center gap-2 font-normal"
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={values?.seo?.toString()}
                    onChange={() => setValue('seo',!values.seo)}
                    className="w-4 h-4"
                  />
                  {contactForm.serviceOptions.options[1]}
                </label>
                <label
                  className="flex items-center gap-2 font-normal"
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={values?.brm?.toString()}
                    onChange={() => setValue('brm',!values.brm)}
                    className="w-4 h-4"
                  />
                  {contactForm.serviceOptions.options[2]}
                </label>
                <label
                  className="flex items-center gap-2 font-normal"
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={values?.em?.toString()}
                    onChange={() => setValue('em',!values.em)}
                    className="w-4 h-4"
                  />
                  {contactForm.serviceOptions.options[3]}
                </label>
                <label
                  className="flex items-center gap-2 font-normal"
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={values?.gd?.toString()}
                    onChange={() => setValue('gd',!values.gd)}
                    className="w-4 h-4"
                  />
                  {contactForm.serviceOptions.options[4]}
                </label>
                <label
                  className="flex items-center gap-2 font-normal"
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={values?.wd?.toString()}
                    onChange={() => setValue('wd',!values.wd)}
                    className="w-4 h-4"
                  />
                  {contactForm.serviceOptions.options[5]}
                </label>
                <label
                  className="flex items-center gap-2 font-normal"
                >
                  <input
                    type="checkbox"
                    name="services"
                    value={values?.other?.toString()}
                    onChange={() => setValue('other',!values.other)}
                    className="w-4 h-4"
                  />
                 {contactForm.serviceOptions.options[6]}
                </label>
            </div>
          </div>
          <div className="flex flex-col gap-1 py-2">
          <p>{contactForm.fields.message.label}</p>
            <textarea
              placeholder={contactForm.fields.message.placeholder}
              className="w-full h-[100px] bg-[#f6e3df] rounded-lg p-3"
              {...register("message")}
            />
                          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}

          </div>
          <button
          type="submit"
            className={[
              'text-white py-3 rounded-sm w-full text-lg transition-transform duration-300 flex items-center justify-center gap-2',
              isHoveredMsg ? 'bg-red-700 cursor-pointer' : 'bg-red-800'
            ].join(' ')}
            onMouseEnter={() => setIsHoveredMsg(true)}
            onMouseLeave={() => setIsHoveredMsg(false)}
          >
            {mutation.isPending ? btnPending : btn}
            {mutation.isPending && <Loader2 className="h-4 w-4 text-white animate-spin" />}
          </button>
        </form>

        <div className="flex flex-col gap-10 w-full md:w-[35%] p-2 business rounded-2xl items-center h-fit py-10 z-10">
          <img
            src="/contact/contact-us.png"
            alt="img"
            className="h-1/2 w-2/3"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-center">{socialSection.title}</h1>
            <div className="flex justify-center gap-3">
              {['/fb.png', '/twitter.png', '/linked.png', '/insta.png'].map((src, idx) => (
                <img
                  key={src}
                  src={src}
                  className={[
                    'h-5 lg:h-7 cursor-pointer transition duration-200 filter',
                    iconHovered[idx] ? 'brightness-130' : ''
                  ].join(' ')}
                  onMouseEnter={() => setIconHovered(h => h.map((v, i) => i === idx ? true : v))}
                  onMouseLeave={() => setIconHovered(h => h.map((v, i) => i === idx ? false : v))}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;