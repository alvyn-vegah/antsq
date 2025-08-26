import { Geist, Geist_Mono,Roboto,Poppins,Noto_Sans,Montserrat,Rubik,Pacifico } from "next/font/google";
import "./globals.css";
import Navbar from "@/customComponents/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import TanstackProvider from "@/lib/TanstackProvider";
import SessionClientProvider from "@/lib/SessionClientProvider";
import { Toaster } from "@/components/ui/sonner";
import Socials from "@/customComponents/Socials";
import { getMessages} from 'next-intl/server';
import { ReactNode } from "react";
import { NextIntlClientProvider } from 'next-intl'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-noto',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-rubik',
  display: 'swap',
})


const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pacifico',
  display: 'swap',
})

type Props = {
  children:ReactNode,
  params:Promise<{locales:string}>,
}

export default async function RootLayout({
  children,params}:Props) {
    const Params = await params;
    const messages = await getMessages();
  return (
    <html lang={Params.locales}>
    <head>
    <link rel="icon" type="image/svg+xml" href="/favicon-antsq.svg" />
    </head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${poppins.variable} ${notoSans.variable} ${montserrat.variable} ${rubik.variable} ${pacifico.variable} antialiased`}
    >
          <NextIntlClientProvider messages={messages}>
          <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>

<TanstackProvider>
<SessionClientProvider>
<Navbar />
<Toaster
 theme="light"
 className="toaster group"
 position="top-right"
 offset={{ top: "70px" }} 
 toastOptions={{
   classNames: {
     description: "text-gray-800", // ← darker and readable
   },
 }}
/>
<Socials />
{children}
</SessionClientProvider>
</TanstackProvider>
</GoogleOAuthProvider>
          </NextIntlClientProvider>
    </body>
  </html>
  );
}