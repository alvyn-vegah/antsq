'use client'
import React from 'react';
import { CheckCircle, HomeIcon } from 'lucide-react';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

const FormSuccessPage: React.FC = () => {
  
  const contactPage = useTranslations('ContactPage');
  const success = contactPage.raw('success');
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center pt-10">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-12">
          {/* Success Animation Container */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-8 animate-pulse">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          {/* Main Success Message */}
          <h1 className="text-3xl sm:text-4xl text-red-800 md:text-5xl font-bold mb-4">
            {success.title}
          </h1>
          <p className="text-xl text-slate-900/90 mb-8 max-w-2xl mx-auto">
          {success.description}
          </p>
          <div className="flex justify-center">
          <Link href={'/'}>
          <span className='bg-red-800 hover:bg-red-700 hover:cursor-pointer transition-all duration-200 hover:-translate-y-1 px-7 py-2 rounded text-white text-md flex items-center gap-1 w-fit'>
            {success.subtitle} <HomeIcon className='text-white h-5 w-5' />
          </span>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSuccessPage;