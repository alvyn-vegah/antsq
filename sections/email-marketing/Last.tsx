import Image from 'next/image';

type benefitsType = {
  title:string,
  description:string
}

type PropType = {
    title:string,
    description:string,
    benefitsSection:{
      title:string,
      benefits:benefitsType[]
    }
}

export const Last = (props:{data:PropType}) => {
    return (
        <div className="flex flex-col md:flex-row px-5 md:px-10 lg:px-20 py-20">
          {/* left pane */}
           <div className="flex flex-col gap-5 w-full md:w-1/2 py-10 md:p-10">
            <h2 className="font-semibold text-3xl md:text-4xl 2xl:text-5xl">
              {props.data.title}
            </h2>
            <p className="text-lg 2xl:text-2xl text-stone-700 opacity-90">
              {props.data.description}
            </p>
           </div>
           {/* right pane */}
           <div className="relative flex flex-col gap-5 w-full md:w-1/2 py-10 md:p-10">
            <h2 className="font-semibold text-3xl md:text-4xl 2xl:text-5xl"> 
              {props.data.benefitsSection.title}
            </h2>
            <div className="flex flex-col gap-5 px-5">
            <div className="flex items-center gap-5">
              <Image src="/email-marketing/funnel.svg" alt="Funnel" className="h-[50px]" width={50} height={50} style={{height:'50px', width:'50px'}} />
              <p className="text-xl 2xl:text-3xl">{props.data.benefitsSection.benefits[0].title}</p>
            </div>
            <div className="flex items-center gap-5">
              <Image src="/email-marketing/trust.svg" alt="Trust" className="h-[50px]" width={50} height={50} style={{height:'50px', width:'50px'}} />
              <p className="text-xl 2xl:text-3xl">{props.data.benefitsSection.benefits[1].title}</p>
            </div>
            <div className="flex items-center gap-5">
              <Image src="/email-marketing/sales.svg" alt="Sales" className="h-[50px]" width={50} height={50} style={{height:'50px', width:'50px'}} />
              <p className="text-xl 2xl:text-3xl">{props.data.benefitsSection.benefits[2].title}</p>
            </div>
            </div>
            <Image src="/email-marketing/bg-one.svg" alt="background image" className="absolute opacity-30 top-0 left-20 h-[150px] w-[150px]" width={150} height={150} style={{height:'150px', width:'150px'}} />
           </div>
          </div>
    )
}