'use client'
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

type carouselContent = {
    title:string,
    content:string,
    src:string
}

const carouselContent:carouselContent[] = [
    {
      title: "Ad Design & Creative",
      content: "Get ideas, concepts, and variations for static and motion ads so you can test your way to better outcomes. Connect your marketing team to a design team that is fully staffed and start supplying your campaigns with constant access to ad creative.",
      src:'/graphic-design/design1.webp',
    },
    {
      title: "Social Media Design & Creative",
      content: "For your social media platforms, get original designs. A fully stacked team of designers producing the best social media creative will energize your marketing, whether it be static, animated, or video, from Instagram to YouTube or Facebook.",
      src: '/graphic-design/design2.jpeg',
    },
    {
      title: "Presentation Design",
      content: "For your compelling PowerPoint presentations, sales decks, or pitch decks, get original designs created. Both startups and scale-ups depend on Superside to design custom decks from scratch or modify existing ones as needed.",
      src:'/graphic-design/design3.png',
    },
    {
      title: "Landing Page Design",
      content: "Create landing pages from scratch or based on already published content. We provide high-fidelity UI designs and thoughtful UX wireframes. Get the innovative landing page designs your company needs to increase conversions.",
      src:  '/graphic-design/design4.jpeg',
    },
    {
      title: "Email Design Services",
      content: "To draw in your audience, use original email designs, templates, and creative. Refresh your communications and gain access to a top-notch team of designers to begin life-like email campaign design.",
      src:  '/graphic-design/design5.jpeg',
    },
    {
      title: "Illustration Design",
      content: "Get personalized, brand-consistent illustrations for your company's marketing initiatives or for use in your business. Get the illustration expertise your business needs by integrating a fully-stacked design team into it.",
      src:'/graphic-design/design6.png',
    },
    {
      title: "Branding Services",
      content: "Get the brand knowledge you require, wherever you need it, from brand creation to personalized branding strategies. Join forces with a fully stacked design team of experts from your brand, creative, and marketing departments to develop or improve the unforgettable branding your company deserves.",
      src:'/graphic-design/design7.jpeg',
    },
    {
      title: "Print Design & Editorial Services",
      content: "Get custom print designs for everything from book covers to magazines to posters and flyers to grab the attention of your audience. Install a committed and well-stocked design team within your company to create only the highest caliber print designs.",
      src:'/graphic-design/design8.jpeg'
    }
  ]

  type SliderDataType = {
    title: string;
    content:string,
    src:string,
  }

export const Carousel = (props:{data:SliderDataType[]}) => {
  const secRef = useRef(null);
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const [index, setIndex] = useState(0);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [containerWidth, setContainerWidth] = useState(0);
    const gap = 24; // Tailwind gap-6 = 1.5rem = 24px
    const totalImages = carouselContent.length;
    const intervalMs = 6000; // 3 seconds

    // Responsive logic
    useEffect(() => {
      gsap.from(secRef.current, {
         x:400,
         opacity:0,
         duration:1,
         ease:"power1.inOut",
         scrollTrigger:{
          trigger:secRef.current,
          start:"top 60%",
          toggleActions:"play none none none"
         }
      })
      const updateWidth = () => {
        if (carouselRef.current) {
          setContainerWidth(carouselRef.current.offsetWidth);
        }
        setIsSmallScreen(window.innerWidth < 768);
      };
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // Calculate image width for 3 images per view on md+ screens
    const imageWidth = isSmallScreen
      ? containerWidth
      : (containerWidth - 2 * gap) / 3;

    useEffect(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;
      const interval = setInterval(() => {
        setIndex(prev => {
          if (prev + 1 >= totalImages) {
            carousel.scrollLeft = 0;
            return 0;
          } else {
            return prev + 1;
          }
        });
      }, intervalMs);
      return () => clearInterval(interval);
    }, [imageWidth, gap, totalImages]);

    useEffect(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;
      const scrollTo = (imageWidth + gap) * index;
      carousel.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }, [index, imageWidth, gap]);

    return (
      <section ref={secRef} className='py-[12vh] flex justify-end'>
        <div className='w-full overflow-x-hidden flex justify-end'>
          <div
            ref={carouselRef}
            className={clsx(
              'flex gap-6 overflow-x-scroll scroll-smooth',
              isSmallScreen ? 'w-full' : 'w-[78vw]'
            )}
            style={{ scrollbarWidth: 'none' }}
          >
            {[...props.data, ...props.data].map((content, i) => (
              <div
              key={i}
              className="relative flex-shrink-0"
              style={{ width: imageWidth, height: 500, minWidth: imageWidth }}
            >
              <img
                src={content.src}
                alt={content.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover'}}
                className="select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-stone-500/40 z-0 py-4" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <h2 className="text-black text-2xl z-10 md:text-3xl 2xl:text-4xl font-bold mb-2 drop-shadow">{content.title}</h2>
                <p className="text-stone-900 2xl:text-2xl z-10 text-base drop-shadow">{content.content}</p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>
    );
}
