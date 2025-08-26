"use client";
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Check, ChevronLeft } from 'lucide-react';
import { getAllContactForms } from '@/controllers/queries/contactForms';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { contactFormType } from '@/lib/types/contactForm';
import { toast } from 'sonner';
import { delContactForm } from '@/controllers/mutations/contactForms';

// Helper component for status badges
const StatusBadge = ({status}:{status:string}) => {
  const baseClasses = 'px-2 py-1 text-xs font-medium rounded-xl inline-block m-1';
  return <span className={`${baseClasses} ${status != undefined && status == "In Progress" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800" }`}><p>{status}</p></span>;
};

const ContactForm = () => {
    const {data,isLoading,refetch,isRefetching} = useQuery({
        queryKey:['contact-forms'], 
        queryFn:getAllContactForms
      })
    
      const formatDate = (iso:string) => {
        const date = new Date(iso)
        return `${date.getDate().toString().padStart(2, '0')}/${
        (date.getMonth() + 1).toString().padStart(2, '0')
      }/${date.getFullYear()}`;
      }
      const mutation = useMutation({
        mutationKey:['contact-forms'],
        mutationFn:delContactForm,
        onSuccess:() => {
          toast("Completed!",{
            description: 'The form has been marked as contacted.',
          });
          refetch();
        }
      })
    return(
    <div className="bg-gray-50 min-h-screen w-full">
      
    {/* Main Content */}
    <main className="py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title and Actions */}
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
          <Link href="/admin" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ChevronLeft size={16} className="mr-1" />
            Back to Dashboard
          </Link>
            <h2 className="text-3xl font-bold tracking-tight text-red-800">Contact Forms</h2>
            <p className="mt-1 text-sm text-gray-500">A list of all the contact forms submitted by users.</p>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white shadow-lg rounded-sm">
          <div className="">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required Services</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50 divide-y divide-gray-200 w-1/2">
                  {isLoading || isRefetching ?
                  <div className="flex items-center space-x-10 mt-1 w-full">
                  <div className="space-y-4 w-full">
        {
         [...Array(5)].map((_, idx) => (
          <tr key={idx} className="animate-pulse">
            <td colSpan={5} className="px-6 py-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
                <div className="w-30 h-8 bg-gray-200 rounded" />
              </div>
            </td>
          </tr>
        ))
        }
      </div>
                </div>
                 : 
                  ( data?.length < 1 ? 
                  <div className='w-full'>
                    <span className='text-slate-800/90 bg-gray-50 text-center'>No user submissions found.</span>
                  </div> 
                    :
                    data?.slice().reverse().map((formItem:contactFormType,idx:number) => {
                      const formattedDate = formatDate(formItem?.submittedOn??"")
                      type ServiceKey = 'bsmm' | 'seo' | 'brm' | 'em' | 'gd' | 'wd' | 'other';

const serviceMap: Record<ServiceKey, string> = {
bsmm: "Business & Social Media Management",
seo: "Search Engine Optimization",
brm: "Brand Reputation Management",
em: "Email Marketing",
gd: "Graphic Design",
wd: "Web Development",
other: "Other",
};
const selectedServices = [];

for (const key in serviceMap) {
const typedKey = key as ServiceKey;
if (formItem.hasOwnProperty(typedKey) && formItem[typedKey]) {
  selectedServices.push(serviceMap[typedKey]);
}
}
                      return(
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm md:text-lg font-medium text-red-900">{formItem?.firstName + " " + formItem?.lastName || "NA"}</div>
                          <div className="text-sm text-gray-900/70"><span className='font-bold'>Email: </span>{formItem?.email || "NA"}</div>
                          <div className="text-sm text-gray-900/70"><span className='font-bold'>Mobile: </span>{formItem?.phoneNumber || "NA"}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{formattedDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-break-spaces">
                          <div className="flex flex-wrap">
                          {selectedServices?.map((service,idx:number) => <StatusBadge key={idx} status={service} />)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap flex justify-center">
                          
            <AlertDialog>
    <AlertDialogTrigger asChild>
    <span className="flex flex-row gap-1 items-center bg-slate-200 hover:bg-slate-300 transition-colors duration-300 py-1 px-2 hover:cursor-pointer rounded">
      <span className='text-sm text-gray-900/70'>Mark as contacted</span>
      <Check className='text-green-700 h-4 w-4' />
    </span>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Mark the user as contacted ?</AlertDialogTitle>
        <AlertDialogDescription>
        <p className='text-sm'>Please make sure you have contacted the client before ticking off.</p>
        <p className='text-xs'></p>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="hover:cursor-pointer bg-slate-200 hover:bg-slate-100">Cancel</AlertDialogCancel>
        <AlertDialogAction className="hover:cursor-pointer bg-[#f6bbb5] hover:bg-[#f0ada6] text-black" onClick={() => {
          mutation.mutateAsync(formItem._id??"")
        }}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
                        </td>
                      </tr>
                    )})
                  )
                  }
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </main>
  </div>
)}

export default ContactForm;