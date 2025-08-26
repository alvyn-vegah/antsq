'use client'
import { Calendar, Inbox, LogOut, FileText, Mail } from "lucide-react"
import { signOut } from "next-auth/react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
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
import { Link } from "@/navigation";
import { useQuery } from "@tanstack/react-query"
import { getAllCustomForms } from "@/controllers/queries/customFormRequests"
import { CustomRequestFormType } from "@/lib/types/forms"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: FileText,
  },
  {
    title: "Custom Requests",
    url: "/admin/custom-requests",
    icon: Inbox,
  },
  {
    title: "Contact Forms",
    url: "/contact-forms",
    icon: Calendar,
  }
]

export function AppSidebar() {
  const {data:customRequests} = useQuery({
    queryKey:['custom-user-requests'], 
    queryFn:getAllCustomForms
  })
  const inProgressForms = customRequests?.filter((item:CustomRequestFormType) => item.status == 'In Progress' )
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="flex flex-col pb-4">
          <SidebarGroupLabel className="text-3xl font-bold text-red-700">AntsQ</SidebarGroupLabel>
          <h4 className="text-sm text-red-800 pl-2">Admin Panel</h4>
          </div>
          <hr className="border-1 border-slate-200 w-full mb-2" />
          <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={'/admin'}>
                      <FileText className="text-green-700" />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={'/admin/custom-requests'}>
                      <Inbox className="text-sky-700" />
                      <span>Custom Requests</span>
  {inProgressForms?.length && <span className="text-gray-100 bg-red-800 rounded-full w-4 h-4 text-xs flex items-center justify-center" >{inProgressForms.length}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={'/admin/contact-forms'}>
                      <Mail className="text-yellow-600" />
                      <span>Contact Forms</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              <AlertDialog>
      <AlertDialogTrigger asChild>
      <div className="flex gap-2 p-2 items-end rounded hover:bg-gray-100 hover:cursor-pointer">
      <LogOut className="h-4 w-4 text-red-800" />
      <span>Logout</span>
      </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-800 hover:bg-red-700 hover:cursor-pointer" onClick={() => {
            signOut({
              callbackUrl:"/"
            });
          }}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}