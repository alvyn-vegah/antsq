import Image from 'next/image';

const Servicecard = (props:{src:string,title:string,desc:string}) => {
    return(
      <div className="flex flex-col gap-5 items-center justify-start rounded-xl shadow-lg business relative pt-16 pb-8 px-5 w-full md:w-[30%]">
      <Image alt={props.title} width={200} height={100} className="serviceImg md:absolute md:top-[-70] 2xl:top-[-100] mx-auto max-h-1/2 2xl:max-h-2/3 w-1/4 md:w-1/5" src={props.src} />
      <h3 className="font-bold font-poppins text-lg 2xl:text-4xl text-center 2xl:pt-10">{props.title}</h3>
      <p className="font-noto text-center text-sm 2xl:text-xl text-stone-800">{props.desc}</p>
    </div>
    )
}
export default Servicecard;