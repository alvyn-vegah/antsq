import { StarFilled } from "@ant-design/icons"

export const Card = (props:{title:string,content:string}) => {
    return (
        <div className="flex flex-col md:flex-row gap-5 bg-gray-50/70 p-10 lg:p-20 rounded-xl shadow-2xl">
        <div className="flex justify-center md:justify-start items-start">
            <StarFilled style={{color:"#991B1B",fontSize:"50px"}} />
        </div>
        <div className="flex items-center md:items-start flex-col gap-4">
            <h5 className="font-semibold text-2xl 2xl:text-4xl text-red-800">{props.title}</h5>
            <p className="text-stone-700 opacity-90 text-md lg:text-lg 2xl:text-2xl text-center md:text-left">{props.content}</p>
        </div>
        </div>
    )
}
