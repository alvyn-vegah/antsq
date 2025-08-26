'use client'
import { ChevronDown, Globe } from "lucide-react"
import { useParams } from "next/navigation"
import { usePathname,useRouter } from "@/navigation"
import { useEffect, useState, useTransition } from "react"

const LanguageSelector = (props:{defaultValue:string}) => {
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
    <div>
<div className="trigger">
    <div className="flex relative gap-1 items-center hover:cursor-pointer" onClick={() => setOpen(!open)}>
    <Globe className="text-red-800 h-5 w-5 2xl:h-10 2xl:w-10" />
    <ChevronDown
    className={`text-red-800 h-3 w-3 2xl:h-6 2xl:w-6 transform transition-transform duration-200 ${
      open ? "rotate-180" : ""
    }`}
  />
    </div>
    <div className={`absolute top-15 right-10 ${!open && 'hidden' }`}>
    <div className="flex flex-col primarybg">
        <div>
            <p className="text-xs text-red-800 p-2">Select a language:</p>
            <hr className="border-[0.5] border-red-800 mx-2" />
        </div>
    <div className="flex flex-col gap-1 text-stone-900/80  w-[15vw] p-1">
        <div onClick={() => handleLocaleChange('en')} className={`w-full rounded  hover:bg-[#f5cdc6] hover:cursor-pointer px-2 py-1  ${currentLocale == 'en' && 'business'}`}>English(en)</div>
        <div onClick={() => handleLocaleChange('es')} className={`w-full rounded  hover:bg-[#f5cdc6] hover:cursor-pointer px-2 py-1  ${currentLocale == 'es' && 'business'}`}>Spanish(es)</div>
        {/* <div onClick={() => handleLocaleChange('nl')} className={`w-full rounded  hover:bg-[#f5cdc6] hover:cursor-pointer px-2 py-1  ${currentLocale == 'nl' && 'business'}`}>Dutch(nl)</div> */}
        <div onClick={() => handleLocaleChange('fr')} className={`w-full rounded  hover:bg-[#f5cdc6] hover:cursor-pointer px-2 py-1  ${currentLocale == 'fr' && 'business'}`}>French(fr)</div>
    </div>
    </div>
    </div>
</div>
        </div>
    )
}

export default LanguageSelector;