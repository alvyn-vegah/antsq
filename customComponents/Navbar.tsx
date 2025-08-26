"use client"
import * as React from "react"
import { Link } from "@/navigation";
import { ChevronDown,House,Menu, Wrench, Info, DollarSign, Bot,ShoppingCart, UserRound, Wallet, LogOut,LogOutIcon,LogIn } from "lucide-react"
import { useParams, usePathname } from "next/navigation"
import { useState,useEffect } from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
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
import SheetDropdown from "./SheetDropdown"
import { useSession } from "next-auth/react"
import { useOutsideClick } from "@/lib/hooks/useOutsideClick"
import { signOut } from "next-auth/react"
import clsx from "clsx"
import useCart from "@/globalState/cart"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { isAdmin } from "@/controllers/queries/isAdmin"
import LanguageSelector from "./LanguageSelector";
import { useLocale, useTranslations } from "next-intl";
import MobileLangSelector from "./MobileLangSelector";



const Navbar = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const normalizedPath = pathname.replace(`/${locale}`, '') || '/'
  const [isOpen,setIsOpen] = React.useState(false);
  const [isSecondOpen,setIsSecondOpen] = React.useState(false);
  const [isProfileOpen,setIsProfileOpen] = React.useState(false);
  const [scrolled, setScrolled] = useState(false)
  const [username,setUsername] = React.useState('')
  // use tailwind hover classes and remove these states after sorting the device specific tailwind hover issue.
  const [hoveredHome, setHoveredHome] = useState(false);
  const [hoveredServices, setHoveredServices] = useState(false);
  const [hoveredPlans, setHoveredPlans] = useState(false);
  const [hoveredAiWriter, setHoveredAiWriter] = useState(false);
  const [hoveredAbout, setHoveredAbout] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<Record<string, boolean>>({});
  const {data:session,status} = useSession();
  const [hoveredTalkDesktop, setHoveredTalkDesktop] = useState(false);
  const [hoveredTalkMobile, setHoveredTalkMobile] = useState(false);
  const [profileDropdownHover, setProfileDropdownHover] = useState([
    false, false, false
  ]);
  const navbar = useTranslations("navbar");
  const navData = {
    home:navbar('home'),
    serviceTitle:navbar('services.title'),
    services:[0,1,2,3,4,5,6].map((i) => navbar(`services.content.${i}`)),
    plansPricing:navbar('plansPricing'),
    aiWriter:navbar('aiWriter'),
    aboutTitle:navbar('about.title'),
    about:[0,1,2].map((i) => navbar(`about.content.${i}`)),
    talkToUs:navbar('talkToUs'),
    loginButton:navbar("loginButton"),
    profile:[0,1].map((i) => navbar(`profile.${i}`)),
    dialog:navbar.raw('dialog'),
    signin:navbar("signin"),
  }
  console.log("norm path",normalizedPath)
  console.log("path",pathname)
  const params = useParams();
  const queryClient = useQueryClient();
  const {cartItems:cartState} = useCart();
  const profileRef = React.useRef(null);
  useOutsideClick(profileRef, () => setIsProfileOpen(false));
  const { data,isLoading,refetch } = useQuery<{ isAdmin: boolean }>({
    queryKey:['privilege'],
    queryFn:isAdmin
   })
  useEffect(() => {
    if (status === "authenticated") {
      setUsername(session.user?.email || "");
    }
  }, [status, session]);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => {
    refetch();
    // Or, to be extra safe, you can also invalidate the query:
    queryClient.invalidateQueries({queryKey:['privilege']});
  }, [session]);
  return (
    <div className="font-roboto">
      <div 
      className={`md:flex items-center hidden border-b-1 border-gray-200/50 z-100 w-full justify-between px-5 lg:px-10 2xl:px-20 h-[60px] 2xl:h-[80px] fixed transition-all duration-200 ${scrolled ? 'bg-[#FFEEEB]/90' : 'bg-transparent'}${hoveredHome || hoveredServices || hoveredPlans || hoveredAiWriter || hoveredAbout ? ' bg-[#FFEEEB]' : ''}`}
     >
     <div>
      <img src="/logo.png" alt="logo" className="inline h-[2em] lg:h-[3em]" />
     </div>
     {/* list */}
     <div className="flex md:gap-3 lg:gap-5 h-full items-center">
      <div
        onMouseEnter={() => setHoveredHome(true)}
        onMouseLeave={() => setHoveredHome(false)}
        className={clsx('h-full flex items-center font-roboto font-semibold text-sm px-3 cursor-pointer transition hover:text-[#ee4123] border-b-[3px] hover:border-b-[#ee4123]', normalizedPath == '/' ? 'border-b-[3px] border-[#ee4123] text-[#ee4123]' : "border-transparent", hoveredHome && pathname !== '/' && 'border-b-0 text-black ')}
      >
        <Link className="2xl:text-2xl" href={'/'}>{navData.home??"Home"}</Link>
      </div>
      <div
        onMouseEnter={() => { setIsOpen(true); setHoveredServices(true); }}
        onMouseLeave={() => { setIsOpen(false); setHoveredServices(false); }}
        className={clsx('h-full pb-1 flex items-center group relative font-roboto font-semibold text-sm cursor-pointer transition', hoveredServices && 'text-[#ee4123]', !hoveredServices && 'text-black')}
      >
        <span className="group text-sm 2xl:text-2xl">{navData.serviceTitle} <ChevronDown className={`inline m-0 p-0 h-[1em] transition-transform duration-200 ${hoveredServices ? 'rotate-180' : ''}`} />
          {isOpen && (
            <div className="absolute z-50 bg-[#FFEEEB] w-[300px] h-fit top-14">
              <div className="flex flex-col text-sm border-r-0 border-l-0 border-b-0 border-t-[3px] border-t-[#ee4123]">
                {[
                  { href: '/business-social-media-management', label: navData.services[0]},
                  { href: '/search-engine-optimization-marketing', label: navData.services[1]},
                  { href: '/brand-reputation-management', label:navData.services[2]},
                  { href: '/digital-marketing', label: navData.services[3]},
                  { href: '/email-marketing', label: navData.services[4]},
                  { href: '/graphic-design', label: navData.services[5]},
                  { href: '/web-development', label: navData.services[6]},
                ].map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                    <p
                      onMouseEnter={() => setHoveredDropdown((prev) => ({ ...prev, [item.href]: true }))}
                      onMouseLeave={() => setHoveredDropdown((prev) => ({ ...prev, [item.href]: false }))}
                      className={clsx(
                        'text-sm 2xl:text-xl cursor-pointer font-medium text-black p-2 transition',
                        hoveredDropdown[item.href] && 'bg-[#ee4123] text-white cursor-pointer',
                        normalizedPath == item.href && 'bg-[#ee4123] text-gray-50'
                      )}
                    >
                      {item.label}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </span>
      </div>
      <div
        onMouseEnter={() => setHoveredPlans(true)}
        onMouseLeave={() => setHoveredPlans(false)}
        className={clsx('h-full flex items-center  font-semibold text-sm px-3 cursor-pointer transition border-b-[3px]', hoveredPlans && 'border-[#ee4123] text-[#ee4123]', normalizedPath == '/plans-pricing' ? 'border-b-[3px] border-[#ee4123] text-[#ee4123]' : 'border-transparent', hoveredPlans && normalizedPath !== '/plans-pricing' && 'text-[#ee4123] border-b-[#ee4123]')}
      >
        <Link className="2xl:text-2xl" href={'/plans-pricing'}>{navData.plansPricing??"Plans & Pricing"}</Link>
      </div>
      <div
        onMouseEnter={() => setHoveredAiWriter(true)}
        onMouseLeave={() => setHoveredAiWriter(false)}
        // js based hover
        // className={clsx('h-full flex items-center  font-semibold text-sm px-3 cursor-pointer transition border-b-[3px]', hoveredAiWriter && 'border-[#ee4123] text-[#ee4123]', normalizedPath == '/ai-writer' ? 'border-b-[3px] border-[#ee4123] text-[#ee4123]' : 'border-transparent', hoveredAiWriter && normalizedPath !== '/ai-writer' && 'text-[#ee4123] border-b-[#ee4123]')}
        // tailwind hover
        className={clsx('h-full flex items-center  font-semibold text-sm px-3 cursor-pointer transition border-b-[3px] hover:border-[#ee4123] hover:text-[#ee4123]', normalizedPath == '/ai-writer' ? 'border-b-[3px] border-[#ee4123] text-[#ee4123]' : 'border-transparent')}
      >
        <Link className="2xl:text-2xl" href={'/ai-writer'}>{navData.aiWriter??"Ai writer"}</Link>
      </div>
      <div
        onMouseEnter={() => { setIsSecondOpen(true); setHoveredAbout(true); }}
        onMouseLeave={() => { setIsSecondOpen(false); setHoveredAbout(false); }}
        className={clsx('h-full flex items-center pb-1 group relative font-semibold text-sm cursor-pointer transition', hoveredAbout && 'text-[#ee4123] border-b-[3px]   hover:border-b-[#ee4123]', !hoveredAbout && 'text-black')}
      >
        <span className="group text-sm 2xl:text-2xl font-semibold ">{navData.aboutTitle??"About"} <ChevronDown className={`inline h-[1em] transition-transform duration-200 ${hoveredAbout ? 'rotate-180' : ''}`} />
        {/* js based hover and by default the popup has top border which is serving as underline */}
          <div className={`absolute z-50 ${hoveredAbout ? '' : 'hidden'} border-t-[3px] border-t-[#ee4123] bg-[#FFEEEB] w-[120px] h-fit top-14`}>
            {isSecondOpen && (
              <div className="flex flex-col text-sm">
                {[
                  { href: '/about', label:navData.about[0] },
                  { href: '/blogs', label: navData.about[1] },
                  { href: '/contact', label: navData.about[2] },
                ].map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setIsSecondOpen(false)}>
                    <p
                      onMouseEnter={() => setHoveredDropdown((prev) => ({ ...prev, [item.href]: true }))}
                      onMouseLeave={() => setHoveredDropdown((prev) => ({ ...prev, [item.href]: false }))}
                      className={clsx(
                        'cursor-pointer text-sm 2xl:text-xl font-medium text-black p-2 transition',
                        hoveredDropdown[item.href] && 'bg-[#ee4123] text-white cursor-pointer',
                        pathname == item.href && 'bg-[#ee4123] text-gray-50'
                      )}
                    >
                      {item.label}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </span>
      </div>
     </div>
      <div className={clsx("hidden lg:flex",isLoading && "opacity-0")}>
      {data?.isAdmin === true ? 
        <Link href={'/admin'}>
        <button
          onMouseEnter={() => setHoveredTalkDesktop(true)}
          onMouseLeave={() => setHoveredTalkDesktop(false)}
          className={clsx('bg-red-800 transition-all duration-200 rounded-full text-gray-50 px-2 lg:px-3 py-1 text-xs lg:text-sm', hoveredTalkDesktop && '-translate-y-1 cursor-pointer hover:bg-red-700')}
        >
          View Dashboard
        </button>
        </Link>
         :
        <Link href={'/contact'}>
        <button
          onMouseEnter={() => setHoveredTalkDesktop(true)}
          onMouseLeave={() => setHoveredTalkDesktop(false)}
          className={clsx('bg-red-800 transition-all duration-200 rounded-full text-gray-50 px-2 lg:px-3 py-1 text-xs lg:text-sm 2xl:text-2xl 2xl:px-6', hoveredTalkDesktop && '-translate-y-1 cursor-pointer hover:bg-red-700')}
        >
          {navData.talkToUs??"Talk to us"}
        </button>
        </Link>
}
      </div>
      <div className="flex">
      <Link href={'/shopping-cart'}>
      <span className="relative">
      <span className="text-red-800 h-fit w-fit flex items-center transition-transform duration-200 hover:-translate-y-1"><ShoppingCart className="h-5 w-5 2xl:h-10 2xl:w-10" /></span>
      <span className={`absolute -top-[8px] -right-[9px] text-sm darker-peach rounded-full h-4 w-4 flex items-center justify-center ${cartState.length < 1 && 'hidden'}`}>
        <p>{cartState.length || ''}</p>
      </span>
      </span>
        </Link>
      </div>
      <LanguageSelector defaultValue={Array.isArray(params.locales) ? params.locales[0] : params.locales ?? ""} />
      <div className="flex gap-2 lg:gap-4">
        <span className="relative" ref={profileRef}>
        {status==='authenticated' ? 
        <span className="inline-flex items-center justify-center rounded-full w-8 h-8 2xl:w-12 2xl:h-12 bg-red-800 text-white hover:cursor-pointer text-sm 2xl:text-2xl font-medium" onClick={() => setIsProfileOpen(!isProfileOpen)}>
        {status === "authenticated" && username ? username[0].toUpperCase() : <UserRound className="w-5 h-5" />}
         </span> :
         <Link href={'/signin'}>
                  <span className="bg-red-800 inline-block text-gray-50 text-md px-5 py-1 rounded-full transition-transform duration-200 hover:-translate-y-1 hover:cursor-pointer hover:bg-red-700 ">Login / Signup</span>
         </Link>
        }
        <span className={`absolute top-11 -left-20 bg-[#f8ded9] rounded-sm w-fit h-fit flex flex-col text-black ${isProfileOpen ? 'block' : 'hidden'}`}>
          <Link href={'/subscriptions'} onClick={() => setIsProfileOpen(false)}>
          <p
            className={`px-3 py-2 m-1 2xl:text-xl rounded font-normal transition-colors duration-200 ${profileDropdownHover[1] ? 'bg-red-800 text-white cursor-pointer' : ''}`}
            onMouseEnter={() => setProfileDropdownHover(h => h.map((v, i) => i === 1 ? true : v))}
            onMouseLeave={() => setProfileDropdownHover(h => h.map((v, i) => i === 1 ? false : v))}
          >{navData.profile[0]??"Subscriptions"}</p>
          </Link>
           <AlertDialog>
      <AlertDialogTrigger asChild>
      <span
        className={`px-3 py-2 2xl:text-xl group m-1 flex items-center gap-1 rounded font-normal transition-colors duration-200 ${profileDropdownHover[2] ? 'bg-red-800 text-white cursor-pointer' : ''}`}
        onMouseEnter={() => setProfileDropdownHover(h => h.map((v, i) => i === 2 ? true : v))}
        onMouseLeave={() => setProfileDropdownHover(h => h.map((v, i) => i === 2 ? false : v))}
      ><LogOutIcon className='h-4 w-4 text-slate-800 group-hover:text-white' />{navData.profile[1]}</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{navData.dialog.title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:cursor-pointer">{navData.dialog.cancel}</AlertDialogCancel>
          <AlertDialogAction className="bg-red-800 hover:bg-red-700 hover:cursor-pointer" onClick={() => {
            signOut({
              callbackUrl:"/"
            });
          }}>{navData.dialog.logout}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        </span>
        </span>
      </div>
    </div>
    {/* sheet */}

    {/* mobile nav */}

    <Sheet>
      <SheetTrigger asChild>
    <div className="fixed flex w-full justify-end px-5 pt-2 md:hidden bg-transparent z-100">
     <Menu className="text-red-800 h-[30px] w-[20px]" />
    </div>
      </SheetTrigger>
      <SheetContent className="z-200 primarybg px-4 font-roboto">
        <SheetHeader>
          <SheetTitle>
            <img src="/logo.png" alt="logo" className="inline h-[2em] lg:h-[3em]" />
            {/* <p>hello</p> */}
            </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-4">
          <SheetClose asChild>
          <Link href={'/'}><span className={clsx('text-lg flex gap-2 cursor-pointer hover:text-[#ee4123]', pathname=='/' && 'text-[#ee4123]')}><House className="text-black h-fit" />Home</span></Link>
          </SheetClose>
          <SheetDropdown title="Services" pathname={pathname} icon={<Wrench className="text-black h-fit" />}>
            <SheetClose asChild>
            <Link href="/business-social-media-management my-2">
              <p className={clsx('text-sm cursor-pointer text-stone-800/80 pl-5 hover:text-[#ee4123]', pathname=='/business-social-media-management' && 'text-[#ee4123]')}
                >
                Business Social Media Management
              </p>
            </Link>
            </SheetClose>
            <SheetClose asChild>
            <Link href="/search-engine-optimization-marketing my-2">
              <p className={clsx('text-sm cursor-pointer text-stone-800/80 pl-5 hover:text-[#ee4123]', pathname=='/search-engine-optimization-marketing' && 'text-[#ee4123]')}
                >
                Search Engine Optimization & Marketing
              </p>
            </Link>
            </SheetClose>
            <SheetClose asChild>
            <Link href="/brand-reputation-management my-2">
              <p className={clsx('text-sm cursor-pointer text-stone-800/80 pl-5 hover:text-[#ee4123]', pathname=='/brand-reputation-management' && 'text-[#ee4123]')}
                >
                Brand Reputation Management
              </p>
            </Link>
            </SheetClose>
            <SheetClose asChild>
            <Link href="/email-marketing my-2">
              <p className={clsx('text-sm cursor-pointer text-stone-800/80 pl-5 hover:text-[#ee4123]', pathname=='/email-marketing' && 'text-[#ee4123]')}
                >
                Email Marketing
              </p>
            </Link>
            </SheetClose>
            <SheetClose asChild> 
            <Link href="/graphic-design my-2">
              <p className={clsx('text-sm cursor-pointer text-stone-800/80 pl-5 hover:text-[#ee4123]', normalizedPath=='/graphic-design' && 'text-[#ee4123]')}
                >
                Graphic Design
              </p>
            </Link>
            </SheetClose>
            <SheetClose asChild>
            <Link href="/web-development my-2">
              <p className={clsx('text-sm cursor-pointer text-stone-800/80 pl-5 hover:text-[#ee4123]', normalizedPath=='/web-development' && 'text-[#ee4123]')}
                >
                Web Development
              </p>
            </Link>
            </SheetClose>
          </SheetDropdown>
          <SheetClose asChild>
          <Link href={'/plans-pricing'}><span className={clsx('text-lg flex gap-2 cursor-pointer hover:text-[#ee4123]', normalizedPath=='/plans-pricing' && 'text-[#ee4123]')}><DollarSign className="text-black h-fit" />Plans & Pricing</span></Link>
          </SheetClose>
          <SheetClose asChild>
          <Link href={'/ai-writer'}><span className={clsx('text-lg flex gap-2 cursor-pointer hover:text-[#ee4123]', normalizedPath=='/ai-writer' && 'text-[#ee4123]')}><Bot className="text-black h-fit" />AI Writer</span></Link>
          </SheetClose>
          <SheetDropdown title="About" pathname={pathname} icon={<Info className="text-black h-fit" />}>
          <SheetClose asChild>
          <Link href="/about">
    <p className={clsx('cursor-pointer text-sm text-stone-800/80 pl-5 hover:text-[#ee4123]', normalizedPath=='/about' && 'text-[#ee4123]')}
      >
      AntsQ Colony
    </p>
  </Link>
  </SheetClose>
  <SheetClose asChild>
  <Link href="/blogs">
    <p className={clsx('cursor-pointer text-sm text-stone-800/80 pl-5 hover:text-[#ee4123]', normalizedPath=='/blogs' && 'text-[#ee4123]')}
      >
      Blog
    </p>
  </Link>
  </SheetClose>
  <SheetClose asChild>
  <Link href="/contact">
    <p className={clsx('cursor-pointer text-sm text-stone-800/80 pl-5 hover:text-[#ee4123]', normalizedPath=='/contact' && 'text-[#ee4123]')}
      >
      Contact Us
    </p>
  </Link>
  </SheetClose>
          </SheetDropdown>
          {/* profile */}
          <SheetClose asChild>
          <Link href={'/subscriptions'}><span className={clsx('text-lg flex gap-2 cursor-pointer hover:text-[#ee4123]', normalizedPath=='/' && 'text-[#ee4123]')}><Wallet className="text-black h-fit" />My Subscriptions</span></Link>
          </SheetClose>
          {
            session ? 
            <AlertDialog>
      <AlertDialogTrigger asChild>
      <span className={clsx('text-lg flex gap-2 items-center cursor-pointer hover:text-[#ee4123]')} 
      onMouseEnter={() => setProfileDropdownHover(h => h.map((v, i) => i === 2 ? true : v))}
      onMouseLeave={() => setProfileDropdownHover(h => h.map((v, i) => i === 2 ? false : v))}>
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
          </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{navData.dialog.title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:cursor-pointer">{navData.dialog.cancel}</AlertDialogCancel>
          <AlertDialogAction className="bg-red-800 hover:bg-red-700 hover:cursor-pointer" onClick={() => {
            signOut({
              callbackUrl:"/"
            });
          }}>
            <SheetClose asChild>
          <span>{navData.dialog.logout}</span>
          </SheetClose>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    : 
    <SheetClose asChild>
          <Link href={'/subscriptions'}><span className={clsx('text-lg flex gap-2 cursor-pointer hover:text-[#ee4123]', pathname=='/' && 'text-[#ee4123]')}><LogIn className="text-black h-fit" />{navData.signin}</span></Link>
          </SheetClose>
          }
    <MobileLangSelector defaultValue={Array.isArray(params.locales) ? params.locales[0] : params.locales ?? ""} />
      <SheetClose asChild>
      <Link href={'/contact'}>
        <button
          onMouseEnter={() => setHoveredTalkMobile(true)}
          onMouseLeave={() => setHoveredTalkMobile(false)}
          className={clsx('bg-red-800 transition-all duration-200 rounded-full text-gray-50 px-3 py-2 text-sm w-full', hoveredTalkMobile && '-translate-y-1 cursor-pointer bg-orange-700')}
        >
          Talk to Us
        </button>
        </Link>
        </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
    </div>
  )
}

export default Navbar
