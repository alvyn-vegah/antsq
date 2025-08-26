'use client'
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"
import Image from 'next/image';
import { Link } from "@/navigation";

gsap.registerPlugin(ScrollTrigger);

type PropType = {
  title1:string,
  title2:string,
  subtitle:string,
  buttonText:string,
}

const Herosection = (props:{data:PropType}) => {
  const value = process.env.NEXT_PUBLIC_API_BASE_URL ?? "NOT_SET";
  const value2 = process.env.NEXTAUTH_SECRET ?? "NOT_SET";
  console.log("baseurl",value)
  console.log("nextauth secret",value2)
  const translatedData = props.data;
  const tl = gsap.timeline();
  const imgRef1 = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    tl.to(imgRef1.current, {
      x: "9vw",
      duration: 0.5,
      ease: "none",
    })
    tl.to(imgRef1.current, {
      x: "20vw",
      scrollTrigger: {
        trigger: "#heroSection",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      startAt:{x:"9vw"}
    });
    
    gsap.fromTo('#bg',{
      scale:1.1,
    },{
      scale:1.3,
      duration:7,
      repeat:-1,
      yoyo:true,
      ease:"power1.inOut",
      repeatDelay:1,
    })
  },[])
    return (
      <div className="min-h-screen w-full relative flex items-start 2xl:items-center justify-center pt-10 px-10 sm:px-20">
      <Image src={'/landing/heropic-1.svg'} alt="Decorative background box 1" width={150} height={150} className="opacity-30 w-[70px] h-[70px]  md:w-[150px] md:h-[150px] absolute top-18 inset-x-auto" />
      <Image ref={imgRef1} src={'/landing/heropic-2.svg'} alt="Decorative background box 2" width={120} height={120} className="heropic2 w-[80px] h-[80px]  md:w-[120px] md:h-[120px]  absolute top-16 left-[-80]" />
      <Image src={'/landing/heropic-3.svg'} alt="Decorative background box 3" width={150} height={150} className="w-[12%] h-[150px] absolute bottom-10 z-20" />
      <Image src={'/landing/wave-1.png'} alt="Wave background separator 1" width={1920} height={400} className="w-full h-[400px] absolute bottom-0 opacity-100 z-10" />
      <Image src={'/landing/wave-2.png'} alt="Wave background separator 2" width={1920} height={400} className="w-full h-[400px] absolute bottom-0 opacity-50 z-10" />
      <Image src={'/landing/wave-3.png'} alt="Wave background separator 3" width={1920} height={400} className="w-full h-[400px] absolute bottom-0 opacity-30 z-10" />
      <Image id="bg" src={'/landing/back.jpg'} alt="Hero section background" layout="fill" objectFit="cover" className="absolute min-h-[100vh] top-0 left-0 -z-10" />
      <div className="absolute w-full h-full inset-0 bg-[#f7c2b9] opacity-30 z-0" />
      <div className="w-full h-full max-w-screen mx-auto flex flex-col gap-10 items-center md:flex-row justify-between z-30 md:mt-10">
        <div className="w-full  sm:w-4/5 lg:w-2/3 flex flex-col items-center md:items-start justify-center gap-5 z-30 md:py-5 md:pt-25">
        <span className="font-bold text-3xl sm:text-4xl lg:text-5xl 2xl:text-7xl text-center md:text-left font-poppins">
          <p className="">{translatedData?.title1}<Image src={'/logo.png'} alt="AntsQ Logo" width={200} height={50} className="inline h-[1em] w-auto align-middle -translate-y-[0.125em]" />           </p>
          <p>{translatedData?.title2}</p>
        </span>        
        <hr className="border-red-700 w-2/3" />
        {/* <p className="text-center md:text-left text-md font-noto">Boost online presence and reach with our professional digital marketing services. Customized strategy aligns with business goals, showcases unique brand voice. Let us help grow customer base and succeed.</p> */}
        <p className="text-center md:text-left text-md 2xl:text-2xl font-noto">{translatedData?.subtitle}</p>
        <Link href={'/plans-pricing'}>
        <div
          className={[
            "rounded-full font-montserrat font-semibold shadow-amber-800 shadow-md text-white w-fit text-xl 2xl:text-3xl z-30 flex gap-1 items-center px-8 py-3 transition-transform duration-300",
            isHovered ? "bg-red-700 -translate-y-1 cursor-pointer" : "bg-red-800"
          ].join(' ')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {translatedData?.buttonText} <ArrowRight className="text-white size-6" />
        </div>
        </Link>
        </div>
        <div className="w-full sm:w-2/3 h-full flex items-end justify-end">
          <Image src={'/landing/hero.jpg'} alt="Illustration of digital marketing services in action" width={700} height={800} className="w-6/7 2xl:w-full h-full pb-5" />
        </div>
     </div>
    </div>
    )
}

export default Herosection;