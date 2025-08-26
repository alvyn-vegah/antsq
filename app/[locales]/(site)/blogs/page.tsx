'use client'
import { Search } from "lucide-react";
import BlogCarousel from "@/customComponents/blog/BlogCarousel";
import Footersection from "@/sections/Footersection";
import Footerbanner from "@/sections/Footerbanner";
import { Seo } from "@/customComponents/seo/Seo";
import { blogPosts } from "@/customComponents/blogs-data";
import { useState,useRef,useEffect} from "react";
import OfferPopup from "@/customComponents/Offerpopup";

const Page = () => {
  const footerBannerData = {
      title: "READY TO GROW YOUR BUSINESS?",
      description: "Contact us to work with a results-driven digital marketing agency",
      button1: "Get Started",
      button2: "View Pricing"
  }
  const [isOpen,setIsOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    // Show popup every 5 minutes (300,000 ms)
    setTimeout(() => setIsOpen(true),3000)
    intervalRef.current = setInterval(() => {
      setIsOpen(true);
    }, 300000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
    return (
      <>
      <Seo
  title="Digital Marketing Blog"
  subtitle="Antsq"
  keywords={[
    "digital marketing blog",
    "marketing tips and trends",
    "SEO insights blog",
    "social media strategy articles",
    "Antsq blog"
  ]
  }
  description="Read expert insights, tips, and trends in digital marketing, SEO, branding, and web development on the Antsq Blog."
/>
{isOpen && (
        <OfferPopup toggleFunction={() => togglePopup()} />
      )}
        <section className={`md:pt-[10vh] primarybg ${
          isOpen ? "filter blur-xs pointer-events-none select-none" : ""
        }`}>
          <div className="flex flex-col w-full items-center">
          <div className="flex flex-col items-center pt-5 w-full md:w-3/4 px-5 md:px-10 lg:px-20">
            <div className="flex flex-col gap-4 items-center">
            <h1 className="text-4xl font-extrabold text-center">Our Blog</h1>
            <hr className="border-1 border-red-900 w-[130%]" />
            </div>
            <p className="text-lg text-center text-stone-800/90">
            We share our views and ideas on technology, culture, business, and various other topics in our blog. We assure you that our articles are engaging and informative, providing you with an enjoyable reading experience.</p>
          </div>
          </div>
          <div className="carousel">
            <BlogCarousel />
          </div>
          {/* last section */}
          <div className="flex flex-col md:flex-row px-5 md:px-10 lg:px-20 py-20">
            <div className="flex flex-col gap-5 w-full md:w-[60%] py-10 md:py-0">
            {
              blogPosts.map((blog,idx) => (
                <div key={idx} className="flex flex-col md:flex-row gap-5 w-full">
                <div className="w-full md:w-[40%]">
                    <img src={blog.img} alt="img"  />
                </div>
                <div className="flex flex-col w-full md:w-[60%]">
            <h1 className="font-semibold text-2xl">{blog.heading}</h1>
            <p className="text-xs font-stone-bol text-stone-500/90">April 30,2024</p>
            <p className="text-md font-semibold py-2 text-red-800/90">{"Read More >> "}</p>
            </div>
            </div>
              ))
            }
            </div>

            <div className="flex flex-col w-full md:w-[40%] gap-5">
              <div className="bg-gray-50 p-5 rounded-sm">
              <div className="primarybg relative ">
                <input type="text" placeholder="Search..." className="pl-8 py-2 w-full outline-1 focus:outline-orange-500" />
                <Search className="text-red-700 absolute h-fit left-1 top-2" />
              </div>
              </div>
              <div className="flex flex-col bg-gray-50 p-5">
                <h3 className="text-2xl font-semibold">Categories</h3>
                <p className="text-sm text-stone-800/90">[list_categories orderby=&quot;name&quot; order=&quot;ASC&quot;]</p>
              </div>

              <div className="flex flex-col bg-gray-50 gap-5 p-5">
                <h3 className="text-2xl font-semibold">Recent Articles</h3>
                <div className="flex flex-col gap-2">
                <p className="text-stone-700/80 text-sm underline">Maximizing ROI with Digital Strategy: Best Practices and Case Studies</p>
                <p className="text-stone-700/80 text-sm underline">Navigating the World of Influencer Marketing: A Guide for Marketers and Brands</p>
                <p className="text-stone-700/80 text-sm underline">{"The Do's and Don'ts of Email Marketing Campaigns"}</p>
                <p className="text-stone-700/80 text-sm underline">The Top Trends in Content Marketing for 2021</p>
                <p className="text-stone-700/80 text-sm underline">The Benefits of Social Media Marketing: Why It Should Be a Priority for Your Business</p>
                <p className="text-stone-700/80 text-sm underline">Unleashing the Full Potential of PPC: Advanced Strategies for Success</p>
                </div>
              </div>

              <div className="flex flex-col p-5 bg-gray-50">
                <h3 className="font-semibold text-2xl">Newsletter</h3>
                <p className="text-stone-800/80 text-sm">Join our community and never miss an update, sign up for our newsletter now.</p>
                <input type="text" placeholder="Email" className="bg-gray-50 outline-none border-b-1 border-red-800 p-2" />
                <div className="flex">
                <button className="bg-gray-50 p-3 text-red-800 font-semibold text-lg">
                    Submit
                </button>
                </div>
              </div>

              <div className="flex flex-col bg-gray-50 p-5">
                <h3 className="text-2xl font-semibold">Popular Tags</h3>
                <p className="text-sm text-stone-800/90">[list_categories orderby=&quot;name&quot; order=&quot;ASC&quot;]</p>
              </div>
            </div>
          </div>
          <Footerbanner data={footerBannerData} />
          <Footersection />
        </section>
        </>
    )
}

export default Page;