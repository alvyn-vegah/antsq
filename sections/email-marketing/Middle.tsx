type objType = {
  title:string,
  description:string
}
type PropType = {
  "0":{
    title:string[],
    description:string
  },
  "1":objType, 
  "2":objType,
  "3":objType,
}
export const Middle = (props:{data:PropType}) => {
    return (
        <div className="px-5 md:px-10 lg:px-20 flex flex-col gap-40">
          {/* one */}
          <div className="p-5 md:p-10 2xl:p-20 flex flex-col h-fit md:flex-row bg-gray-50/60 rounded-xl shadow-2xl">
            <div className="flex items-center justify-center md:justify-start w-full md:w-1/3">
            <h1 className="font-extrabold text-4xl 2xl:text-6xl text-center md:text-left">{props.data["0"].title[0]} <br/> {props.data["0"].title[1]}</h1>
            </div>
            <div className="w-full md:w-3/4"> 
            <p className="text-lg 2xl:text-2xl text-stone-700 text-center md:text-left">{props.data["0"].description}</p>
            </div>
           </div>
              {/* two */}
           <div className="p-5 md:p-10 2xl:p-20 flex flex-col gap-5 h-fit bg-gray-50/60 rounded-xl shadow-2xl">
            <div className="flex items-center justify-center w-full">
            <h1 className="font-extrabold text-4xl 2xl:text-6xl text-center md:text-left">{props.data["1"].title}</h1>
            </div>
            <div className="w-full"> 
            <p className="text-lg 2xl:text-2xl text-stone-700 text-center">{props.data["1"].description}</p>
            </div>
           </div>

           <div className="flex flex-col md:flex-row items-center">
             <div className="w-full md:w-1/2">
              <img src="/email-marketing/mail.webp" alt="Gmail" />
             </div>
             {/* three */}
            <div className="p-5 md:p-10 2xl:p-20 flex flex-col gap-5 h-fit bg-gray-50/60 rounded-xl shadow-2xl w-full md:w-1/2">
            <div className="flex items-center w-full">
            <h1 className="font-extrabold text-3xl md:text-4xl 2xl:text-6xl md:text-left">{props.data["2"].title}</h1>
            </div>
            <div className="w-full"> 
            <p className="text-lg 2xl:text-2xl text-stone-700 text-left opacity-90">{props.data["2"].description}</p>
            </div>
           </div>
           </div>
          </div>
    )
}