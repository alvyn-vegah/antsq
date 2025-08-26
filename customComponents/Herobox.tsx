import { CircleArrowRight } from "lucide-react";
import { Link } from "@/navigation";
import { useState } from "react";

const Herobox = (props:{title:string,content:string,buttonText:string}) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="bg-[linear-gradient(to_bottom_left,#D73F20,#941C1F)] min-h-[45vh] md:min-h-[60vh] 2xl:min-h-[50vh] w-full md:w-1/3 text-slate-200 text-md rounded-3xl p-5 md:p-10 flex flex-col justify-around md:justify-between">
          <div className="flex flex-col items-center gap-5">
          <p className="text-2xl 2xl:text-4xl font-bold text-center font-poppins">{props.title}</p>        
          <p className="text-center 2xl:text-2xl font-noto">{props.content}</p>
          </div>
          <Link href={'/plans-pricing'}>
          <div
            className={["flex gap-2 font-noto justify-center items-center mx-auto font-semibold text-xl sm:text-xl md:text-2xl 2xl:text-3xl transition-transform duration-200",
              isHovered ? "-translate-y-1" : ""
            ].join(' ')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {props.buttonText} <CircleArrowRight className="text-white font-bold" size={'25'}/>
          </div>
          </Link>
        </div>
    )
}

export default Herobox;