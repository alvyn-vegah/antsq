'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { ArrowLeft, Calendar, Package, Mail, MapPin, Loader, Building } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getSubscriptionsById } from '@/controllers/queries/subscriptions'
import clsx from 'clsx';
import { getPaymentsByEmail } from '@/controllers/mutations/payments'

interface Subscription {
  id: string
  planName: string
  status: 'active' | 'expired' | 'cancelled'
  startDate: string
  endDate: string
  amount: number
  paymentMethod: string
  autoRenewal: boolean
}

interface SubscriberDetails {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  joinDate: string
  totalSpent: number
  subscriptions: Subscription[]
}

export default function SubscriberSubscriptionsPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.user as string
  
  const [subscriber, setSubscriber] = useState<SubscriberDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const { data: session, status } = useSession()
  const {data} = useQuery({
    queryKey:['subscriptions',userId],
    queryFn:() => getSubscriptionsById(userId)
  })
  const usermail = data?.user?.email;
  const {data:paymentResponse} = useQuery({
    queryKey:['payments',userId],
    queryFn:() => getPaymentsByEmail({email:usermail}),
    enabled:!!usermail
  })

  const paymentsData = paymentResponse?.paymentsObject;
  const totalSpent = paymentResponse?.totalSpent || 0;
  const lastPayment = paymentsData?.payments && paymentsData?.payments[paymentsData.payments.length - 1];
  const latestBillingInfo = lastPayment?.billingInformation;
  const shortenedAddress = latestBillingInfo?.address.length > 100 ? latestBillingInfo?.address?.slice(0,40) + "..." : latestBillingInfo?.address;

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (!session || session?.user?.privilege !== "admin") {
      router.replace("/"); // Redirect non-admins to home (or another page)
    }
  }, [session, status, router]);

  // Mock data - replace with actual API call
  useEffect(() => {
    const fetchSubscriberData = async () => {
      // Simulate API call
      setTimeout(() => {
        const mockData: SubscriberDetails = {
          id: userId,
          name: userId === 'venkatesh' ? 'Venkatesh Kasani' : 
                userId === 'sarah' ? 'Sarah Johnson' :
                userId === 'mike' ? 'Mike Chen' :
                userId === 'emily' ? 'Emily Rodriguez' :
                userId === 'david' ? 'David Wilson' :
                'Lisa Thompson',
          email: userId === 'venkatesh' ? 'venkateshkasani14@gmail.com' :
                 userId === 'sarah' ? 'sarah.johnson@email.com' :
                 userId === 'mike' ? 'mike.chen@company.com' :
                 userId === 'emily' ? 'emily.r@startup.io' :
                 userId === 'david' ? 'david.wilson@corp.com' :
                 'lisa.t@agency.com',
          phone: '+1 (555) 123-4567',
          address: '123 Main St, City, State 12345',
          joinDate: '2024-03-15',
          totalSpent: 2850,
          subscriptions: [
            {
              id: '1',
              planName: 'Pro Plan',
              status: 'active',
              startDate: '2024-11-01',
              endDate: '2024-12-01',
              amount: 49.99,
              paymentMethod: 'Credit Card',
              autoRenewal: true
            },
            {
              id: '2',
              planName: 'Basic Plan',
              status: 'expired',
              startDate: '2024-09-01',
              endDate: '2024-10-31',
              amount: 29.99,
              paymentMethod: 'PayPal',
              autoRenewal: false
            },
            {
              id: '3',
              planName: 'Premium Plan',
              status: 'cancelled',
              startDate: '2024-06-01',
              endDate: '2024-08-31',
              amount: 79.99,
              paymentMethod: 'Credit Card',
              autoRenewal: true
            }
          ]
        }
        setSubscriber(mockData)
        setLoading(false)
      }, 1000)
    }

    fetchSubscriberData()
  }, [userId])
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  function addMonthsToDate(isoDate: string, monthsToAdd: number): string {
    const date = new Date(isoDate);
    // Add months
    date.setMonth(date.getMonth() + monthsToAdd);
  
    // Format to DD/MM/YYYY
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  
  function getSubscriptionStatus(endDate: string): 'active' | 'expired' {
    const now = new Date();
    const end = new Date(endDate);
    return end >= now ? 'active' : 'expired';
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center w-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscriber details...</p>
        </div>
      </div>
    )
  }

  if (!subscriber) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Subscriber not found</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  
  if (status === "loading" || !session || session?.user?.privilege !== "admin") {
    return <div className='min-h-screen w-full pt-[10vh] primarybg flex items-center justify-center'>
      <Loader className='animate-spin h-10 w-10 text-red-800' />
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[10vh]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Subscribers
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Subscriber Details</h1>
        </div>

        {/* Subscriber Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {data?.user?.username ? data?.user?.username?.charAt(0) : "NA"}
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-semibold text-gray-900">{data?.user?.username??"NA"}</h2>
                {/* <p className="text-gray-600">Member since {formatDate(subscriber.joinDate)}</p> */}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold text-green-600">${totalSpent}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{data?.user?.email??"NA"}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Building className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="text-gray-900">{latestBillingInfo?.city || 'Not provided'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-900">{shortenedAddress || 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subscriptions */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Subscription History ({data?.user?.subscriptions.length})
            </h3>
          </div>

          <div className="p-6">
            {data?.user?.subscriptions?.length === 0 ? (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No subscriptions found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {data?.user?.subscriptions.map((subscription:Record<string,string>) => {
                  const price = subscription.isyearly ? subscription.yearlyPrice : subscription.monthlyPrice
                  const formattedStartDate = formatDate(subscription.purchaseDate);
                  const monthsToAdd = subscription.isyearly ? 12 : 1;
                  const formattedEndDate = addMonthsToDate(subscription.purchaseDate,monthsToAdd)
                  const status = getSubscriptionStatus(formattedEndDate);
                  return(
                    <div
                      key={subscription?.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <h4 className="text-lg font-semibold text-gray-900 mr-3">
                            {subscription?.plan}
                          </h4>
                          <p className='px-2'>—</p>
                          <p className='text-slate-800/80 text-xs pl-2 pr-4'> {subscription?.description}</p>
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
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">${price}</p>
                          <p className="text-sm text-gray-500">{subscription.isyearly ? "per year" : "per month"}</p>
                        </div>
                      </div>
  
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <p className="text-gray-500">Start Date</p>
                            <p className="text-gray-900">{formattedStartDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <p className="text-gray-500">End Date</p>
                            <p className="text-gray-900">{formattedEndDate}</p>
                          </div>
                        </div>
                        {/* <div className="flex items-center">
                          <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <p className="text-gray-500">Payment Method</p>
                            <p className="text-gray-900">Card</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <p className="text-gray-500">Auto Renewal</p>
                            <p className="text-gray-900">{subscription.autoRenewal ? 'Yes' : 'No'}</p>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}