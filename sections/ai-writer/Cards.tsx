'use client'
import { useQuery } from "@tanstack/react-query"
import { PricingCard } from "./Pricingcard"
import { getAiProducts } from "@/controllers/queries/products"
import { packages } from "./pricing-data"

type PropType = {
    title:string,
    buttonText:string,
    plans:packages[]
}

const Cards = (props:{data:PropType}) => {
    const {data:products,isLoading } = useQuery({
        queryKey:['products'],
        queryFn:getAiProducts
    })

    if (isLoading) {
        return (
            <div className="primarybg px-5 lg:px-20 flex flex-col md:flex-row gap-5">
                <div className="animate-pulse bg-gray-200 h-96 rounded-lg flex-1"></div>
                <div className="animate-pulse bg-gray-200 h-96 rounded-lg flex-1"></div>
                <div className="animate-pulse bg-gray-200 h-96 rounded-lg flex-1"></div>
            </div>
        )
    }

    return (
        <div className="primarybg px-5 lg:px-20 ">
            <h2 className="text-center text-red-800 font-bold text-3xl md:text-5xl mb-20">{props.data.title}</h2>
         <div className="flex flex-col md:flex-row gap-5">
         <PricingCard
         obj={props.data.plans[0]}
         buttonText={props.data.buttonText}
         loggedIn={true}
         id=""
         data={products && products[0]}
          />
         <PricingCard
        obj={props.data.plans[1]}
        buttonText={props.data.buttonText}
         loggedIn={false}
         id=""
         data={products && products[1]}
          />
         <PricingCard
         obj={props.data.plans[2]}
         buttonText={props.data.buttonText}
         loggedIn={false}
         id=""
         data={products && products[2]}
          />
         </div>
         </div>
    )
}

export default Cards;