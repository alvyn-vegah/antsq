'use client';

import { useForm } from 'react-hook-form';
import { submitWebform } from '@/controllers/mutations/webform';
import Footersection from '@/sections/Footersection';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CustomRequestFormType } from '@/lib/types/forms';
import { useSession } from 'next-auth/react';
import { getFormStatusByEmail } from '@/controllers/queries/customFormRequests';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

const defaultValues: CustomRequestFormType = {
  websiteType: '',
  reference: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  brandName: '',
  brandAge: '',
  brandDescription: '',
  hasDomain: false,
  domainName: '',
  websitesUnderDomain: '',
  hasHosting: false,
  needsLogo: false,
  categoryPages: '',
  needsContent: false,
  providingImages: false,
  additionalRequirements: '',
  budget: ''
};

const Page = () => {
  const pageContent = useTranslations('webForm.pageContent');
  const subStatus = pageContent.raw('submissionStatus');
  const formContent = pageContent.raw('formContent');
  const sidebarContent = pageContent.raw('sidebarContent');
  const { register, handleSubmit, setValue, setError, formState, watch } = useForm<CustomRequestFormType>({ defaultValues });
  const { errors, isSubmitting } = formState;
const session = useSession();

const email = session?.data?.user?.email;

  const values = watch();
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const {data, isLoading, error} = useQuery({
    queryKey:['formStatus'],
    queryFn:getFormStatusByEmail
  })
  
  const onSubmit = async (data: CustomRequestFormType) => {
    setApiError(null);
    const submissionForm = { ...data,submittedOn:new Date().toISOString(),enquiry_on:"Custom Web Development",status:"In Progress",sessionUserEmail:email };
    const res = await submitWebform(submissionForm);
    if (res.error) {
      setApiError(res.error);
      setError('root.apiError', { type: 'manual', message: res.error });
    } else {
      router.push('/web-form/success');
    }
  };

  // Loader skeleton UI
  const FormLoader = () => (
    <div className="w-[50vw] animate-pulse">
      <div className="bg-gray-50/40 rounded-lg shadow-2xl p-6 md:p-8 space-y-7">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="h-6 w-1/3 bg-gray-200 rounded mb-2" />
          <div className="space-y-4">
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
            <div className="h-10 w-full bg-gray-200 rounded mb-2" />
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
            <div className="h-10 w-full bg-gray-200 rounded mb-2" />
          </div>
        </div>
        {/* Personal Information */}
        <div className="space-y-6">
          <div className="h-5 w-1/4 bg-gray-200 rounded mb-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-10 w-full bg-gray-200 rounded mb-2" />
            <div className="h-10 w-full bg-gray-200 rounded mb-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-10 w-full bg-gray-200 rounded mb-2" />
            <div className="h-10 w-full bg-gray-200 rounded mb-2" />
          </div>
        </div>
        {/* Brand Information */}
        <div className="space-y-6">
          <div className="h-5 w-1/4 bg-gray-200 rounded mb-2" />
          <div className="h-10 w-full bg-gray-200 rounded mb-2" />
          <div className="h-10 w-full bg-gray-200 rounded mb-2" />
          <div className="h-10 w-full bg-gray-200 rounded mb-2" />
        </div>
        {/* Domain, Hosting, Logo, Category, Content, Images, Additional, Budget */}
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-10 w-full bg-gray-200 rounded mb-2" />
          ))}
        </div>
        {/* Submit Button */}
        <div className="text-center pt-6">
          <div className="h-10 w-32 mx-auto bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen font-noto bg-gray-50 pt-[5vh] md:pt-[12vh] primarybg flex pb-10 px-2 sm:px-5 justify-around">
        <FormLoader />
        <div className="md:flex hidden flex-col gap-3 sticky top-15 self-start items-center justify-center">
          <div className="w-3/4 h-full bg-gray-200 rounded animate-pulse" style={{height: 300, width: 400}} />
        </div>
      </div>
    );
  }
  if (data.canSubmit==false) {
    return (
      <div className='h-[100vh] w-[100vw] primarybg justify-center items-center pt-[10vh] flex flex-col'>
      <h1 className='text-3xl text-red-800 font-semibold'>{subStatus.alreadySubmitted.title}</h1>
      <h2 className='text-md text-slate-700/70'>{subStatus.alreadySubmitted.subtitle}</h2>
    </div>
    );
  }

  if(error) return (
    <div className='h-[100vh] w-[100vw] primarybg justify-center items-center pt-[10vh]'>
      <p className='text-lg text-slate-900/80'>{subStatus.serverError.message}</p>
    </div>
  );

  return (
    <div>
      <div className="min-h-screen font-noto bg-gray-50 pt-[5vh] md:pt-[12vh] primarybg flex pb-10 px-2 sm:px-5 justify-around">
        <div className="max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50/40 rounded-lg shadow-2xl p-6 md:p-8 space-y-7">
            {/* Header Section */}
            <div className="space-y-6">
              <div className="flex flex-col gap-2 items-center">
              <h2 className="text-2xl font-bold text-center text-red-800">{formContent.headerSection.title}</h2>
              <p className="text-xs text-center text-stone-800/80 w-3/4">{formContent.headerSection.subtitle} <span className='font-bold'>{formContent.headerSection.highlightedTime}</span></p>
              <h5 className='text-xs text-center text-stone-800/80'>{formContent.headerSection.subtitleEnd}</h5>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="websiteType" className="block text-sm font-medium text-gray-700 mb-2">
                    {formContent.websiteType.label}
                  </label>
                  <input
                    type="text"
                    id="websiteType"
                    {...register('websiteType', { required: 'Website type is required' })}
                    placeholder={formContent.websiteType.placeholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#fee6e2] focus:outline-none focus:ring-2 focus:ring-[#f9cec7] focus:border-transparent"
                  />
                  {errors.websiteType && <p className="text-red-600 text-sm mt-1">{errors.websiteType.message}</p>}
                </div>
                <div>
                  <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-2">
                    {formContent?.reference?.label}
                  </label>
                  <input
                    type="text"
                    id="reference"
                    placeholder={formContent?.reference?.placeholder}
                    className="w-full px-3 py-2 border bg-[#fee6e2] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f9cec7] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">{formContent.personalInformation.title}</h2>
              <div className="space-y-4">
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{formContent.personalInformation.firstName.label}</label>
                      <input
                        type="text"
                        {...register('firstName', { required: 'First name is required' })}
                        placeholder={formContent.personalInformation.firstName.placeholder}
                        className="w-full px-3 py-2 border bg-[#fee6e2] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f9cec7] focus:border-transparent"
                      />
                      {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{formContent.personalInformation.lastName.label}</label>
                      <input
                        type="text"
                        {...register('lastName', { required: 'Last name is required' })}
                        placeholder={formContent.personalInformation.lastName.placeholder}
                        className="w-full px-3 py-2 border bg-[#fee6e2] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f9cec7] focus:border-transparent"
                      />
                      {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      {formContent.personalInformation.phoneNumber.label}
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      {...register('phoneNumber', { required: 'Phone number is required' })}
                      placeholder={formContent.personalInformation.phoneNumber.placeholder}
                      className="w-full px-3 py-2 border bg-[#fee6e2] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f9cec7] focus:border-transparent"
                    />
                    {errors.phoneNumber && <p className="text-red-600 text-sm mt-1">{errors.phoneNumber.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {formContent.personalInformation.email.label}
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { required: 'Email is required' })}
                      placeholder={formContent.personalInformation.email.placeholder}
                      className="w-full px-3 py-2 border bg-[#fee6e2] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f9cec7] focus:border-transparent"
                    />
                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Brand Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">{formContent.brandInformation.title}</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="brandName" className="block text-sm font-medium text-gray-700 mb-2">
                  {formContent.brandInformation.brandName.label}
                  </label>
                  <input
                    type="text"
                    id="brandName"
                    {...register('brandName', { required: 'Brand name is required' })}
                    className="w-full px-3 py-2 border bg-[#fee6e2] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f9cec7] focus:border-transparent"
                  />
                  {errors.brandName && <p className="text-red-600 text-sm mt-1">{errors.brandName.message}</p>}
                </div>
                <div>
                  <label htmlFor="brandAge" className="block text-sm font-medium text-gray-700 mb-2">
                  {formContent.brandInformation.brandAge.label}
                  </label>
                  <input
                    type="text"
                    id="brandAge"
                    {...register('brandAge', { required: 'Brand age is required' })}
                    className="w-full px-3 py-2 border bg-[#fee6e2] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f9cec7] focus:border-transparent"
                  />
                  {errors.brandAge && <p className="text-red-600 text-sm mt-1">{errors.brandAge.message}</p>}
                </div>
                <div>
                  <label htmlFor="brandDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  {formContent.brandInformation.brandDescription.label}
                  </label>
                  <input
                    type="text"
                    id="brandDescription"
                    {...register('brandDescription', { required: 'Brand description is required' })}
                    className="w-full px-3 py-2 border bg-[#fee6e2] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f9cec7] focus:border-transparent"
                  />
                  {errors.brandDescription && <p className="text-red-600 text-sm mt-1">{errors.brandDescription.message}</p>}
                </div>
              </div>
            </div>

            {/* Domain Information */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">{formContent.domainInformation.question}</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasDomain"
                      checked={values.hasDomain === true}
                      onChange={() => setValue('hasDomain', true)}
                      className="mr-2"
                    />
                    {formContent.domainInformation.options.yes}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasDomain"
                      checked={values.hasDomain === false}
                      onChange={() => setValue('hasDomain', false)}
                      className="mr-2"
                    />
                    {formContent.domainInformation.options.no}
                  </label>
                </div>
              </div>

              {values.hasDomain && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="domainName" className="block text-sm font-medium text-gray-700 mb-2">
                    {formContent.domainInformation.domainName.label}
                    </label>
                    <input
                      type="text"
                      id="domainName"
                      {...register('domainName', { required: 'Domain name is required if you have one' })}
                      className="w-full px-3 py-2 border bg-[#fee6e2] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f9cec7] focus:border-transparent"
                    />
                    {errors.domainName && <p className="text-red-600 text-sm mt-1">{errors.domainName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="websitesUnderDomain" className="block text-sm font-medium text-gray-700 mb-2">
                    {formContent.websitesUnderDomain.label}
                    </label>
                    <input
                      type="text"
                      id="websitesUnderDomain"
                      {...register('websitesUnderDomain', { required: 'Websites under domain is required if you have one' })}
                      className="w-full px-3 py-2 border bg-[#fee6e2] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f9cec7] focus:border-transparent"
                    />
                    {errors.websitesUnderDomain && <p className="text-red-600 text-sm mt-1">{errors.websitesUnderDomain.message}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Hosting Service */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">{formContent.hostingService.question}</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasHosting"
                      checked={values.hasHosting === true}
                      onChange={() => setValue('hasHosting', true)}
                      className="mr-2"
                    />
                    {formContent.hostingService.options.yes}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasHosting"
                      checked={values.hasHosting === false}
                      onChange={() => setValue('hasHosting', false)}
                      className="mr-2"
                    />
                    {formContent.hostingService.options.no}
                  </label>
                </div>
              </div>
            </div>

            {/* Logo */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">{formContent.logoNeeds.question}</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsLogo"
                      checked={values.needsLogo === true}
                      onChange={() => setValue('needsLogo', true)}
                      className="mr-2"
                    />
                    {formContent.logoNeeds.options.yes}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsLogo"
                      checked={values.needsLogo === false}
                      onChange={() => setValue('needsLogo', false)}
                      className="mr-2"
                    />
                    {formContent.logoNeeds.options.no}
                  </label>
                </div>
              </div>
            </div>

            {/* Category Pages */}
            <div>
              <label htmlFor="categoryPages" className="block text-sm font-medium text-gray-700 mb-2">
              {formContent.categoryPages.label}
              </label>
              <input
                type="text"
                id="categoryPages"
                {...register('categoryPages', { required: 'Category pages are required' })}
                placeholder={formContent.categoryPages.placeholder}
                className="w-full px-3 py-2 border bg-[#fee6e2] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f9cec7] focus:border-transparent"
              />
              {errors.categoryPages && <p className="text-red-600 text-sm mt-1">{errors.categoryPages.message}</p>}
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">{formContent.contentNeeds.question}</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsContent"
                      checked={values.needsContent === true}
                      onChange={() => setValue('needsContent', true)}
                      className="mr-2"
                    />
                    {formContent.contentNeeds.options.yes}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="needsContent"
                      checked={values.needsContent === false}
                      onChange={() => setValue('needsContent', false)}
                      className="mr-2"
                    />
                    {formContent.contentNeeds.options.no}
                  </label>
                </div>
              </div>
            </div>

            {/* Product Images */}
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">{formContent.imageProvision.question}</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="providingImages"
                      checked={values.providingImages === true}
                      onChange={() => setValue('providingImages', true)}
                      className="mr-2"
                    />
                    {formContent.imageProvision.options.yes}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="providingImages"
                      checked={values.providingImages === false}
                      onChange={() => setValue('providingImages', false)}
                      className="mr-2"
                    />
                    {formContent.imageProvision.options.no}
                  </label>
                </div>
              </div>
            </div>

            {/* Additional Requirements */}
            <div>
              <label htmlFor="additionalRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                {formContent.additionalRequirements.label}
              </label>
              <textarea
                id="additionalRequirements"
                placeholder={formContent.additionalRequirements.placeholder}
                {...register('additionalRequirements', { required: 'Additional requirements are required' })}
                rows={4}
                className="w-full px-3 py-2 border bg-[#fee6e2] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f9cec7] focus:border-transparent resize-none"
              />
              {errors.additionalRequirements && <p className="text-red-600 text-sm mt-1">{errors.additionalRequirements.message}</p>}
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                {formContent.budget.label}
              </label>
              <input
                type="text"
                id="budget"
                placeholder={formContent.budget.placeholder}
                {...register('budget', { required: 'Budget is required' })}
                className="w-full px-3 py-2 border bg-[#fee6e2] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f9cec7] focus:border-transparent"
              />
              {errors.budget && <p className="text-red-600 text-sm mt-1">{errors.budget.message}</p>}
            </div>

            {/* Thank You Message */}
            <div className="text-center pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{formContent.thankYouMessage.title}</h3>
              <p className="text-sm text-gray-600 mb-6">{formContent.thankYouMessage.description}</p>
              
              {apiError && (<div className="text-red-600 text-center mb-4">{apiError}</div>)}
              <button type="submit" disabled={isSubmitting} className="bg-red-800 relative text-white px-7 hover:bg-red-700 hover:cursor-pointer py-2 rounded text-md">
                {isSubmitting ? formContent.submitButton.submitting : formContent.submitButton.default}
              <img className='h-[50px] w-[50px] absolute top-12 left-20 animate-bounce' src={'/hand-cursor.png'} />
              </button>
            </div>
          </form>
        </div>
        <div className="md:flex hidden flex-col gap-3 sticky top-15 self-start items-center justify-center w-1/3">
        <Image alt='img' src={'/contact/getInTouch.png'} height={300} width={400} className='w-2/3 h-full' />
          <h2 className='text-3xl text-red-800 font-bold'>{sidebarContent.title}</h2>
          <h3 className='text-xl text-slate-800 font-semibold'>{sidebarContent.subtitle}</h3>
          <p className='text-sm text-slate-700/70'>{sidebarContent.description}</p>
        </div>
      </div>
      <Footersection />
    </div>
  );
};

export default Page;