'use client'
import { getAllCustomForms } from '@/controllers/queries/customFormRequests';
import { useQuery } from '@tanstack/react-query';
import { CustomRequestFormType } from '@/lib/types/forms';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';


// Helper component for status badges
const StatusBadge = ({status}:{status:string}) => {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full inline-block';
    return <span className={`${baseClasses} ${status != undefined && status == "In Progress" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800" }`}>{status}</span>;
  };

const CustomRequests = () => {
    const [isClient,setIsClient] = useState<boolean>(false)
  const {data,isLoading} = useQuery({
    queryKey:['custom-user-requests'], 
    queryFn:getAllCustomForms
  })

  const formatDate = (iso:string) => {
    const date = new Date(iso)
    return `${date.getDate().toString().padStart(2, '0')}/${
    (date.getMonth() + 1).toString().padStart(2, '0')
  }/${date.getFullYear()}`;
  }
  useEffect(() => {
    setIsClient(true);
  },[])
  if(!isClient)return null;
    return (
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
              <h2 className="text-3xl font-bold tracking-tight text-red-800">Custom Requests</h2>
              <p className="mt-1 text-sm text-gray-500">A list of all the custom requirements of users.</p>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="bg-white shadow-lg rounded-sm">
            <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">View</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 w-full">
                    {isLoading ?
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
                      data?.slice().reverse().map((formItem:CustomRequestFormType) => {
                        const formattedDate = formatDate(formItem?.submittedOn??"")
                        return(
                        <tr key={formItem._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{formItem?.firstName + " " + formItem?.lastName || "NA"}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">{formItem?.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600">{formattedDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={formItem?.status ?? ""} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href={`/admin/custom-requests/${formItem?._id}`} className="text-orange-600 hover:text-orange-800">
                              View
                            </Link>
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
    )
}

export default CustomRequests;