'use client'
import { useParams } from 'next/navigation';
import { ChevronLeft, Calendar, Hash, Check } from 'lucide-react';
import Link from 'next/link';
import { getFormDetailsById } from '@/controllers/queries/customFormRequests';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@/lib/helpers/functions';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { updateCustomFormStatusById } from '@/controllers/mutations/customForm';

// Helper component for displaying a detail item
const DetailItem = ({ label, value }: { label: string; value: string | number | undefined }) => (
  <div>
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900">{value || 'N/A'}</dd>
  </div>
);

// Helper component for boolean (Yes/No) details
const BooleanDetailItem = ({ label, value }: { label: string; value: boolean }) => (
    <div>
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {value ? 'Yes' : 'No'}
            </span>
        </dd>
    </div>
);

// Main Admin Page Component
export default function SubmissionDetailPage() {
    const params = useParams();
    const queryClient = useQueryClient();
    const id = params.id;
    const {data,refetch} = useQuery({
        queryKey:['custom-forms'],
        queryFn:() => getFormDetailsById(id as string),
    })
    const formattedDate = formatDate(data?.submittedOn)
  return (
    <div className="bg-gray-50 min-h-screen font-sans pt-10 md:pt-[10vh] w-full">
      
      {/* Main Content */}
      <main className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link and Header */}
          <div className="mb-8">
            <Link href="/admin/custom-requests" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <ChevronLeft size={16} className="mr-1" />
              Back to submissions
            </Link>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-red-800">
              Request: {data?._id}
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Main Details Column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Contact Information */}
              <div className="bg-[#FFEEEB]/50 p-6 rounded-lg shadow-sm ring-1 ring-gray-900/5">
                <h3 className="text-lg font-semibold text-blue-800 border-b pb-3 mb-4">Contact & Basic Info</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  <DetailItem label="First Name" value={data?.firstName} />
                  <DetailItem label="Last Name" value={data?.lastName} />
                  <DetailItem label="Email Address" value={data?.email} />
                  <DetailItem label="Phone Number" value={data?.phoneNumber} />
                  <DetailItem label="Desired Website Type" value={data?.websiteType} />
                  <DetailItem label="Reference/Competitor Sites" value={data?.reference} />
                </dl>
              </div>

              {/* Brand Details */}
              <div className="bg-[#FFEEEB]/50 p-6 rounded-lg shadow-sm ring-1 ring-gray-900/5">
                <h3 className="text-lg font-semibold text-blue-800 border-b pb-3 mb-4">Brand Details</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                    <DetailItem label="Brand Name" value={data?.brandName} />
                    <DetailItem label="Brand Age" value={data?.brandAge} />
                    <div className="md:col-span-2">
                        <DetailItem label="Brand Description" value={data?.brandDescription} />
                    </div>
                </dl>
              </div>

              {/* Technical & Content Requirements */}
              <div className="bg-[#FFEEEB]/50 p-6 rounded-lg shadow-sm ring-1 ring-gray-900/5">
                <h3 className="text-lg font-semibold text-blue-800 border-b pb-3 mb-4">Project Requirements</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                    <BooleanDetailItem label="Has Existing Domain?" value={data?.hasDomain} />
                    {data?.hasDomain && <DetailItem label="Domain Name" value={data?.domainName} />}
                    <BooleanDetailItem label="Has Hosting?" value={data?.hasHosting} />
                    <BooleanDetailItem label="Needs a Logo?" value={data?.needsLogo} />
                    <BooleanDetailItem label="Needs Content Creation?" value={data?.needsContent} />
                    <BooleanDetailItem label="Will Provide Images?" value={data?.providingImages} />
                    <DetailItem label="Number of Category Pages" value={data?.categoryPages} />
                    <DetailItem label="Budget" value={data?.budget} />
                    <div className="md:col-span-2">
                        <DetailItem label="Additional Requirements" value={data?.additionalRequirements} />
                    </div>
                </dl>
              </div>
            </div>

            {/* Sidebar with Actions & Meta */}
            <div className="space-y-6">
                <div className="bg-[#FFEEEB]/50 p-6 rounded-lg shadow-sm ring-1 ring-gray-900/5">
                    <h3 className="text-lg font-semibold text-blue-800 mb-4">Request Status</h3>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Hash size={16} className="text-gray-400 mr-3"/>
                            <span className="text-sm text-gray-600">ID: {data?._id}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar size={16} className="text-gray-400 mr-3"/>
                            <span className="text-sm text-gray-600">Submitted on: {formattedDate}</span>
                        </div>
                        {data?.status == 'In Progress' ? 
                        <AlertDialog>
                        <AlertDialogTrigger asChild>
                        <button className="w-full bg-red-800 hover:cursor-pointer text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-semibold">
                                              Mark as completed
                                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Mark this form as completed?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="hover:cursor-pointer primarybg">No</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-800 hover:bg-red-700 hover:cursor-pointer" onClick={() => {
                              updateCustomFormStatusById(id as string,"Completed")
                              queryClient.invalidateQueries({queryKey:['custom-user-requests','custom-forms']})
                              refetch();
                            }}>Yes</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog> : 
                      <button className="w-full bg-green-700 flex items-center gap-2 justify-center text-white px-4 py-2 rounded-md  text-sm font-semibold">
                      Completed <Check className='h-4 w-4 text-white' />
                      </button>
                        }
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
