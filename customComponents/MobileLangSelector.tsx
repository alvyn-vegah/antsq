'use client'
import { ChevronDown, Globe } from "lucide-react"
import { useParams } from "next/navigation"
import { usePathname,useRouter } from "@/navigation"
import { useEffect, useState, useTransition } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

const MobileLangSelector = (props:{defaultValue:string}) => {
    const [open,setOpen] = useState(false)
    const [currentLocale,setCurrentLocale] = useState('')
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const handleLocaleChange = (localeValue:string) => {
       startTransition(() => {
        router.replace(
            // @ts-ignore
          {pathname, params},
          {locale:localeValue}
        )
       })
       setOpen(!open);
    }
    useEffect(() => {
    setCurrentLocale(props?.defaultValue)
    },[])
    return (
<AlertDialog>
      <AlertDialogTrigger asChild>
      <div className="flex relative gap-1 items-center hover:cursor-pointer w-full">
     <Globe className="h-5 w-5" />
     <h1 className="cursor-pointer text-lg pl-1 text-stone-900 hover:text-[#ee4123]">Language</h1>
     <ChevronDown
    className={`text-black h-3 w-3 transform transition-transform duration-200 ${
      open ? "rotate-180" : ""
    }`}
  />
    </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Select a Language</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-red-800 hover:bg-red-700 hover:cursor-pointer" onClick={() => {
            handleLocaleChange('en')
          }}>
            <div className={`w-full rounded  hover:bg-[#f5cdc6] hover:cursor-pointer px-2 py-1  ${currentLocale == 'en' && 'business'}`}>English(en)</div>
          </AlertDialogAction>
          <AlertDialogAction className="bg-red-800 hover:bg-red-700 hover:cursor-pointer" onClick={() => {
            handleLocaleChange('en')
          }}>
            <div className={`w-full rounded  hover:bg-[#f5cdc6] hover:cursor-pointer px-2 py-1  ${currentLocale == 'en' && 'business'}`}>Spanish(es)</div>
          </AlertDialogAction>
          <AlertDialogAction className="bg-red-800 hover:bg-red-700 hover:cursor-pointer" onClick={() => {
            handleLocaleChange('es')
          }}>
            <div className={`w-full rounded  hover:bg-[#f5cdc6] hover:cursor-pointer px-2 py-1  ${currentLocale == 'en' && 'business'}`}>French(fr)</div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    )
}

export default MobileLangSelector;