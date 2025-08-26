import { MoveRight, X } from 'lucide-react';
import { Link } from '@/navigation';
import React, { useState } from 'react';

const OfferPopup = (props:{toggleFunction:() => void}) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center md:items-end justify-center z-50 px-4">
      <div className="relative business h-fit md:h-[90vh] shadow-2xl rounded-2xl p-8 max-w-md w-full mx-4 flex items-center">
        {/* Close Button */}
        <div className='flex flex-col gap-4 h-fit'>
        <button
          onClick={() => {
            setIsOpen(false)
            props.toggleFunction();
          }}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <X className='h-5 w-5 text-black hover:cursor-pointer' />
        </button>

        {/* Fire Icon and Title */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-red-700">🔥 Special Offer Alert!</h1>
          </div>
        </div>
        <div className="flex flex-row gap-2 pt-2">
        <div className="flex flex-col">

{/* Main Text */}
<div className="text-center mb-8">
  <h2 className="text-sm text-left md:text-xl text-gray-900/80 leading-tight mb-2">
   Discounts now live across Social Media Management, SEO Packages, and Custom Web Devlopment Solutions
  </h2>
</div>
</div>
            <img className='w-35 h-35' src={'/popup-gptt.png'} alt='ant image showing discount' />
        </div>

        {/* CTA Button */}
        <Link href={'/plans-pricing'} onClick={() => props.toggleFunction()}>
        <button className="w-full flex items-center justify-center gap-2 bg-red-800 hover:bg-red-700 hover:cursor-pointer text-white text-xl font-semibold py-4 px-6 rounded-xl transition-colors duration-200 mb-6 shadow-lg">
          Explore All Plans
          <div className="flex">
          <MoveRight className='h-6 w-6 text-white' />
          </div>
        </button>
        </Link>

        {/* Bottom Text */}
        <p className="text-center text-gray-800/90 text-xl font-medium">
          Power up your business with the right ant force!
        </p>
        </div>
      </div>
    </div>
  );
};

export default OfferPopup;