'use client'
import { useState, useEffect, useRef } from "react";
import React from "react";
import { blogPosts } from "../blogs-data";


const BlogCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const slideCount = blogPosts.length;

  // Responsive visibleCards
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else {
        setVisibleCards(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, slideCount]);

  // Calculate the max index to prevent empty slides
  const maxIndex = slideCount - visibleCards;
  const safeCurrent = current > maxIndex ? 0 : current;

  return (
    <div className="w-full overflow-hidden py-6">
      <div
        className="flex gap-5 transition-transform duration-700"
        style={{
          width: `${(slideCount / visibleCards) * 100}%`,
          transform: `translateX(-${safeCurrent * (100 / slideCount)}%)`,
        }}
      >
        {blogPosts.map((post, idx) => (
          <div
            key={idx}
            className="relative h-80 rounded-md overflow-hidden shadow-lg group"
            style={{ width: `${100 / visibleCards}%` }}
          >
            <img
              src={post.img}
              alt={post.heading}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center p-5">
              <span className="bg-red-700 text-white text-center text-xs font-bold px-3 py-1 rounded mb-3 w-fit">
                {post.category}
              </span>
              <h2 className="text-white text-center text-xl font-semibold leading-tight drop-shadow-md transition-transform duration-300 group-hover:-translate-y-0.5">
                {post.heading}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCarousel; 