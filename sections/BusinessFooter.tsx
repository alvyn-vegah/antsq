'use client'
import DropdownBtn from "@/customComponents/DropdownBtn"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const BusinessFooter = () => {
    const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize()
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
    return (
        <div id="businessFooter" className="flex flex-col gap-10 bg-gradient-to-b w-full bg-[url('/business/footerImg.png')]">
     <div className="flex flex-col md:flex-row px-5 md:px-20 pt-15 md:gap-10">
      {/* one */}
      <div className="w-full md:w-1/4 flex flex-col items-center gap-5 py-5">
      <img src={'/logo.png'} className="w-2/3 h-fit" />
      <p className="font-bold text-gray-500 text-center md:text-left">We are an expert team, skilled and passionate about our jobs in growing your business organically with key strategies and planning. </p>
      </div>
      {/* two */}
      <div className="w-full md:w-1/4 flex flex-col items-center gap-5">
        <p className="font-bold text-xl text-center md:text-left">Company</p>
        {isMobile ? (
          <div className="flex flex-col gap-4 items-start">
            <DropdownBtn content={[
              {
                name:"Home",
                url:'/'
              },
              {
                name:"Plans & Pricing",
                url:'/plans-pricing'
              },
              {
                name:"about",
                url:'/about'
              },
              {
                name:"Blog",
                url:'/blog'
              },
              {
                name:"Cotnact",
                url:'/contact'
              },
              {
                name:"Terms & Conditions",
                url:''
              }
            ]} />
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-start">
            {[
              "Home",
              "Plans & Pricing",
              "About",
              "Blog",
              "Contact",
              "Terms & Conditions",
              "Privacy Policy"
            ].map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        )}
      </div>
      {/* three */}
      <div className="w-full md:w-1/4 flex flex-col items-center gap-5">
        <p className="font-bold text-xl text-center md:text-left">Services</p>
        {isMobile ? (
          <div className="flex flex-col gap-4 items-start">
            <DropdownBtn content={
              [
                {
                  "name": "Business Social Media Management",
                  "url": "/business-social-media-management"
                },
                {
                  "name": "Search Engine Optimization & Marketing",
                  "url": "/search-engine-optimization-marketing"
                },
                {
                  "name": "Brand Reputation Management",
                  "url": "/brand-reputation-management"
                },
                {
                  "name": "Email Marketing",
                  "url": "/email-marketing"
                },
                {
                  "name": "Graphic Design",
                  "url": "/graphic-design"
                },
                {
                  "name": "Web Development",
                  "url": "/web-development"
                }
              ]
            } />
          </div>
        ) : (
          <div className="flex flex-col gap-4 items-start">
            {[
              "Business Social Media Management",
  "Search Engine Optimization & Marketing",
  "Brand Reputation Management",
  "Email Marketing",
  "Graphic Design",
  "Web Development"
            ].map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        )}
      </div>
      {/* four */}
      <div className="w-full md:w-1/4 flex flex-col items-center py-5 md:py-0 gap-10">
      <p className="font-bold text-lg text-center">Social Media</p>
      <div className="flex gap-4">
        <img src={'/fb.png'} className="h-7" />
        <img src={'/twitter.png'} className="h-7" />
        <img src={'/linked.png'} className="h-7" />
        <img src={'/insta.png'} className="h-7" />
      </div>
      <p className="font-bold text-lg">Subscribe</p>
      <p className="font-bold text-gray-500">{'Don’t miss out! Subscribe to our email list to stay in the loop'}</p>
      <div className="flex flex-col gap-4 items-start w-full">
      <input type="text" placeholder="Email" className="px-4 py-2 bg-white w-full" />
      <Button className="rounded-none w-fit text-white bg-red-800 px-5">Send</Button>
      </div>
      </div>
     </div>
     <div className="sm:px-5 md:px-20 rounded-t-2xl w-full">
      <div className="bg-red-800 rounded-t-4xl pt-4 pb-10">
      <p className="text-sm sm:text-lg text-gray-100 md:font-semibold text-center">Copyright © 2022 <span className="text-blue-800">Antsq</span> | a vegah llc company</p>
      </div>
     </div>
     </div>
    )
}

export default BusinessFooter