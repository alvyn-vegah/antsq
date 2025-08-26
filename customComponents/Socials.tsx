'use client'
import { Link } from "@/navigation";
import { useEffect,useState } from "react";

const Socials = () => {
   const [isOnPrimaryBg,setIsOnPrimaryBg] = useState(false);
   useEffect(() => {
    const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsOnPrimaryBg(scrollY > 300);
      };
    
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll); // 🧹 cleanup
      };
   },[])
    return (
        <div className={`fixed z-200 ${isOnPrimaryBg == true ? "business": "primarybg"} px-2 transition-colors duration-200 py-3 2xl:py-5 left-0 top-1/2 -translate-y-1/2 gap-3 hidden rounded-r-sm md:flex flex-col`}>
        <Link href={'https://www.facebook.com/antsqmedia/'} target="blank">
        <img src="/fb.png" alt="facebook icon" className="h-[1em] md:w-[1em] 2xl:h-[2em] 2xl:w-[2em] cursor-pointer transition duration-200 filter hover:brightness-130" />
        </Link>
        <Link href={'https://x.com/antsq4smm'} target="blank">
        <img src="/twitter.png" alt="twitter icon" className="h-[1em] md:w-[1em] 2xl:h-[2em] 2xl:w-[2em] cursor-pointer transition duration-200 filter hover:brightness-130" />
        </Link>        
        <Link href={'https://www.linkedin.com/company/antsq/'} target="blank">
        <img src="/linked.png" alt="linkedin icon" className="h-[1em] md:w-[1em] 2xl:h-[2em] 2xl:w-[2em] cursor-pointer transition duration-200 filter hover:brightness-130" />
        </Link>        
        <Link href={'https://www.instagram.com/antsq_media/'} target="blank">
        <img src="/insta.png" alt="instagram icon" className="h-[1em] md:w-[1em] 2xl:h-[2em] 2xl:w-[2em] cursor-pointer transition duration-200 filter hover:brightness-130" />
        </Link>        
        </div>
    )
}

export default Socials;