import {  SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/customComponents/Sidebar";
import SessionClientProvider from "@/lib/SessionClientProvider";
import TanstackProvider from "@/lib/TanstackProvider";
import '../[locales]/(site)/globals.css'

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
      <head>
      <link rel="icon" type="image/svg+xml" href="/favicon-antsq.svg" />
      </head>
      <body>
       <SessionClientProvider>
       <TanstackProvider>
       <SidebarProvider>
        <AppSidebar />
            <div className="bg-gray-50">
            <SidebarTrigger />
            </div>
            {children}
       </SidebarProvider>
       </TanstackProvider>
       </SessionClientProvider>
      </body>
    </html>
    );
  }