"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getSubscriptions } from "@/controllers/queries/subscriptions";
import { CartItemPayload } from "@/lib/types/cartItem";
import clsx from "clsx";

const ClientAccountDashboard: React.FC = () => {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: getSubscriptions,
  });
  type SubscriptionPayload = CartItemPayload & {purchaseDate:string}
  const subscriptions = data?.subscriptions

  const formatDate = (iso:string) => {
    const date = new Date(iso)
    return `${date.getDate().toString().padStart(2, '0')}/${
    (date.getMonth() + 1).toString().padStart(2, '0')
  }/${date.getFullYear()}`;
  }

  function addMonthsToDate(isoDate: string, monthsToAdd: number): string {
    const date = new Date(isoDate);
    // Add months
    date.setMonth(date.getMonth() + monthsToAdd);
  
    // Format to DD/MM/YYYY
    const formatted = `${date.getDate().toString().padStart(2, '0')}/${
      (date.getMonth() + 1).toString().padStart(2, '0')
    }/${date.getFullYear()}`;
  
    return formatted;
  }

  function getSubscriptionStatus(endDate: string): 'active' | 'expired' {
    const now = new Date();
    const end = new Date(endDate);
    return end >= now ? 'active' : 'expired';
  }
  
  function countActiveSubscriptions(subscriptions: SubscriptionPayload[]): number {
    return subscriptions?.filter(sub => {
      const endDate = addMonthsToDate(sub.purchaseDate, Number(sub.quantity));
      return getSubscriptionStatus(endDate) === 'active';
    })?.length;
  }

  const activeSubs = countActiveSubscriptions(subscriptions);

  return (
    <div className="min-h-screen bg-gradient-to-br pt-[10vh]">
      <div className="md:max-w-7xl w-full mx-auto primarybg backdrop-blur-sm rounded-3xl shadow-2xl">
        <div className="sm:p-5 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="p-8 rounded-2xl shadow-lg sticky top-18 border-t-4 border-red-800/50 darker-peach text-center h-fit">
              <div className="relative inline-block mb-6">
                <Image
                  src={session?.user?.image ?? "/public/logo.png"}
                  alt="Profile Photo"
                  width={120}
                  height={120}
                  className="rounded-full border-1 border-gray-300 hover:scale-110 transition-transform duration-300"
                />
              </div>

              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                {session?.user?.name??"..."}
              </h2>
              <p className="text-slate-800/80 text-md mb-6">
                {session?.user?.email??"..."}
              </p>

              <div className="flex justify-around pt-6 border-t border-gray-200">
              <div className="text-center">
              <span className="block text-3xl font-bold text-green-600">
                    {activeSubs}
                  </span>
                  <div className="text-center">
                  <span className="text-gray-600 text-sm mt-1">Active Plans</span>
                </div>
              </div>
                <div className="text-center">
                  <span className="block text-3xl font-bold text-red-800">
                    {subscriptions?.length}
                  </span>
                  <span className="text-gray-600 text-sm mt-1">Total Plans</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subscriptions Section */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50/50 py-8 md:p-8 rounded-2xl shadow-lg border-t-4 border-red-800/50">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="text-2xl">📋</span>
                <h2 className="text-2xl font-bold text-slate-800">
                  My Subscriptions
                </h2>
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-12">
                    <span className="text-6xl block mb-4">⌛</span>
                    <p className="text-gray-600 text-lg">
                      Loading subscriptions...
                    </p>
                  </div>
                ) : subscriptions.length === 0 ? (
                  <div className="text-center py-12">
                    <span className="text-6xl block mb-4">📭</span>
                    <p className="text-gray-600 text-lg">
                      No subscriptions found
                    </p>
                  </div>
                ) : (
                  subscriptions?.map((subscription: SubscriptionPayload,idx:number) => {
                    const formatted = formatDate(subscription.purchaseDate)
                    const endDate = addMonthsToDate(subscription.purchaseDate,Number(subscription.quantity));
                    const status = getSubscriptionStatus(endDate);
                    return (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-800/50"></div>
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex flex-col">
                          <span className="text-xl font-semibold text-red-800 flex gap-5">
                          <img src={subscription.url} alt="Plan Icon" className="max-h-10 max-w-8" />{subscription.plan}
                          </span>
                          <span className="text-md font-semibold text-slate-800/80">
                           {subscription.subtitle}
                          </span>
                          </div>

<span
  className={clsx(
    'px-4 py-1 rounded-full text-xs font-medium uppercase tracking-wide',
    status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800'
  )}
>

                            {status? "Active" : "Expired"}
                          </span>
                        </div>
  
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div>
                            <div className="text-sm text-gray-600 font-medium mb-1">
                              Price
                            </div>
                            <div className="text-lg font-semibold text-gray-800">
                              $ {subscription.monthlyPrice}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600 font-medium mb-1">
                              Purchased on
                            </div>
                            <div className="text-lg font-semibold text-gray-800">
                              {formatted}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-red-600/70 font-medium mb-1">
                              End Date
                            </div>
                            <div className="text-lg font-semibold text-gray-800">
                              {endDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAccountDashboard;
