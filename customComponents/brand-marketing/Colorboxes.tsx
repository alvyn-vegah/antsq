'use client'
import { CaretRightFilled } from "@ant-design/icons"


type stepType = {
    title:string,
    description:string,
  }

export const Colorboxes = (props:{data:stepType[]}) => {
    return (
        <div className="flex flex-col gap-1 md:gap-0 md:flex-row py-10 px-15 md:px-20">
        <div className="flex min-h-[30vh] items-center p-5 bg-[rgb(150,50,67)] rounded-xl text-gray-100 text-xl 2xl:text-2xl font-semibold">
         <p className="text-center md:text-left">{props.data[0].title}</p>
        </div>
        <div className="relative min-h-[30vh] flex items-center justify-center bg-[#d45333] px-5 py-14 rounded-xl text-gray-100 text-xl 2xl:text-2xl font-semibold">
         <p className="text-center md:text-left">{props.data[1].title}</p>
         <div>
         <CaretRightFilled className="absolute opacity-0 md:opacity-100 left-[-12] top-1/2 -translate-y-1/2 text-4xl" style={{color:"rgb(150,50,67)"}} />
         </div>
        </div>
        <div className="relative min-h-[30vh] bg-[#dd692f]  flex items-center p-5 rounded-xl text-gray-100 text-xl 2xl:text-2xl font-semibold">
         <p className="text-center md:text-left">{props.data[2].title}</p>
         <div>
         <CaretRightFilled className="absolute opacity-0 md:opacity-100 left-[-12] top-1/2 -translate-y-1/2 text-4xl" style={{color:"#cd4b2b"}} />
         </div>
        </div>
        <div className="relative min-h-[30vh] flex justify-center items-center p-5 bg-[#de7c3a] rounded-xl text-gray-100 text-xl 2xl:text-2xl font-semibold">
         <p className="text-center md:text-left">{props.data[3].title}</p>
         <CaretRightFilled className="absolute opacity-0 md:opacity-100 left-[-12] top-1/2 -translate-y-1/2 text-4xl" style={{color:"#cf612a"}} />
        </div>
        <div className="relative min-h-[30vh] flex justify-center items-center p-5 bg-[#f99b52] rounded-xl text-gray-100 text-xl 2xl:text-2xl font-semibold">
         <p className="text-center md:text-left">{props.data[4].title}</p>
         <CaretRightFilled className="absolute opacity-0 md:opacity-100 left-[-12] top-1/2 -translate-y-1/2 text-4xl" style={{color:"#dc7632"}} />
        </div>
    </div>
    )
}