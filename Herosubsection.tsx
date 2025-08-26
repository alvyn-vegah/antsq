type PropType = {
  title:string,
  sideHead:string,
  sideDescription:string,
  cards:Record<string,string>[],
}
const Herosubsection = (props:{data:PropType}) => {
  const [title1,title2] = props.data.title.split('|');
    return (
        <div className="primarybg h-fit px-5 sm:px-10 md:px-10 lg:px-20 py-5">
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="w-full md:w-1/2">
              <p className="font-extrabold text-center md:text-left text-4xl 2xl:text-5xl font-poppins">{title1} <br/> {title2}</p>
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4 items-center font-noto">
            <p className="text-center text-xl 2xl:text-2xl">{props.data.sideHead}</p>
            <p className="text-center font-bold text-3xl 2xl:text-4xl">{props.data.sideDescription}</p>
            </div>
          </div>
     </div>
    )
}

export default Herosubsection;