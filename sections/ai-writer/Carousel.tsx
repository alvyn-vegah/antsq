'use client'
import React from "react";
import Image from "next/image";

const logos = [
  { src: "/ai-writer/gcp.webp", width: 120, height: 64 },
  { src: "/ai-writer/samsung.webp", width: 120, height: 64 },
  { src: "/ai-writer/banking.webp", width: 120, height: 64 },
  { src: "/ai-writer/amazon.webp", width: 120, height: 64 },
  { src: "/ai-writer/disney.webp", width: 120, height: 64 },
  // Add more logo paths as needed
];

export default function Carousel() {
  // Duplicate the logos for seamless looping
  const allLogos = [...logos, ...logos];

  return (
    <div className="overflow-hidden w-full bg-[#fbeeed] py-10">
      <div
        className="flex items-center animate-carousel whitespace-nowrap py-10"
        style={{ minWidth: 'fit-content' }}
      >
        {allLogos.map((logo, idx) => (
          <Image
            src={logo.src}
            alt={`logo-${idx}`}
            width={logo.width}
            height={logo.height}
            className="mx-10 opacity-50 grayscale select-none pointer-events-none"
            key={idx}
            draggable={false}
          />
        ))}
      </div>
      {/* Tailwind custom animation */}
      <style jsx global>{`
        @keyframes carousel { 
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-carousel {
          animation: carousel 30s linear infinite;
        }
      `}</style>
    </div>
  );
}