'use client'    
import React from 'react';
import { useState,useEffect } from 'react';
import { getAllSubscriptions, getTotalRevenue } from '@/controllers/queries/subscriptions';
import { useQuery } from '@tanstack/react-query';
import { CartItemPayload } from '@/lib/types/cartItem';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight,Users, Loader,TrendingUp } from 'lucide-react';
import clsx from 'clsx';


type subscriberType = {
  _id:string,
   email:string,
   username:string,
   subscriptions:(CartItemPayload & {purchaseDate:string})[]
}
type CustomSession = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    privilege?: string;
    id?: string;
  };
  expires?: string;
};

const AdminPage = () => {
    const [isClient,setIsClient] = useState(false);
    const { data: session, status } = useSession();
  const customSession = session as CustomSession;
    const router = useRouter();
  
    useEffect(() => {
      setIsClient(true);
    },[])
  
    useEffect(() => {
      if (isClient && status !== "loading" && (!customSession || customSession?.user?.privilege !== "admin")) {
        router.replace("/");
      }
    }, [isClient, status, session, router,customSession])
  
    const {data:subscriptions,isLoading} = useQuery({
      queryKey:['subscriptions'],
      queryFn:getAllSubscriptions
    })
    const {data:totalRevenue} = useQuery({
      queryKey:['revenue'],
      queryFn:getTotalRevenue
    })
  
  
    function getRandomDarkColor(): string {
      const randomChannel = () => Math.floor(Math.random() * 100); // 0–99 for darker tones
      const r = randomChannel();
      const g = randomChannel();
      const b = randomChannel();
      return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    }
  
    const colorMap = React.useMemo(() => {
      const map: Record<string, string> = {};
      subscriptions?.forEach((subscriber: subscriberType) => {
        map[subscriber.email] = getRandomDarkColor();
      });
      return map;
    }, [subscriptions]);
  
    const formatDate = (iso:string) => {
      const date = new Date(iso)
      return `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')
    }/${date.getFullYear()}`;
    }
    if(!isClient)return null;
  
    
    if (!isClient || status === "loading" || !session || customSession?.user?.privilege !== "admin") {
      return (
        <div className='min-h-screen w-full pt-[10vh] primarybg flex items-center justify-center'>
          <Loader className='animate-spin h-10 w-10 text-red-800' />
        </div>
      );
    }
    return (
        <div className="min-h-screen w-full bg-gray-50">
        {/* Header */}
  
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                  <p className="text-2xl font-bold text-gray-900">{subscriptions?.length??""}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">$ {totalRevenue?.total || "0"}</p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Subscribers List */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-4">
              <h2 className="text-lg font-semibold text-blue-800">Subscribers ({subscriptions?.length??""})</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {isLoading ? 
              <div className="flex items-center space-x-4 mt-1">
              <div className="space-y-4 w-full">
    {[...Array(5)].map((_, idx) => (
      <div
        key={idx}
        className="flex items-center space-x-4 animate-pulse bg-white dark:bg-gray-900 rounded-lg p-4 shadow"
      >
        {/* Avatar skeleton */}
        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
        {/* Text skeletons */}
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
        {/* Action button skeleton */}
        <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    ))}
  </div>
            </div> : 
            
              subscriptions?.map((subscriber:subscriberType,idx:number) => {
                let lastActive = "N/A";
                let joinDate = "";
                if(subscriber.subscriptions) {
                   joinDate = formatDate(subscriber.subscriptions[0].purchaseDate);
                }
                if (subscriber.subscriptions && subscriber.subscriptions.length > 0) {
                  const lastPurchaseDate = subscriber.subscriptions[subscriber.subscriptions.length - 1].purchaseDate;
                  lastActive = formatDate(lastPurchaseDate);
                }
              return(
                <div
                  key={idx}
                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                >
                  <Link href={`/admin/${subscriber._id}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={clsx("w-10 h-10 rounded-full text-lg flex items-center justify-center font-semibold text-gray-100")}
                        style={{ backgroundColor: colorMap[subscriber.email] }}
                      >{subscriber?.username?.slice(0,1)}</div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{subscriber.username}</h3>
                        <p className="text-sm text-gray-500">{subscriber.email}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">
                            Last active: {lastActive}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-red-900">
                          {subscriber?.subscriptions?.length}
                        </div>
                        <div className="text-sm text-gray-500">Plans</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-blue-600">
                          {joinDate}
                        </div>
                        <div className="text-sm text-gray-500">Join Date</div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  </Link>
                </div>
              )}
              )}
            </div>
          </div>
  
          {subscriptions?.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No subscribers found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    )
}

export default AdminPage;