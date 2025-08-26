"use client";
import Servicecard from "@/customComponents/Servicecard";

type cardType = {
  title:string,
  description:string
}

type PropType = {
  title:string,
  cards:cardType[],
}

const Midsection = (props:{data:PropType}) => {
  return (
    <div className="primarybg flex flex-col w-full md:py-10 md:pt-30 pb-20 gap-20 px-5 sm:px-10 md:px-20">
      <p className="text-3xl sm:text-4xl 2xl:text-6xl font-bold text-center md:pb-20 font-poppins">
        {props?.data.title}
      </p>
      <div className="flex flex-col md:flex-row gap-3">
        <Servicecard
          src="/landing/rating.png"
          title={props?.data.cards[0].title}
          content={props?.data.cards[0].description}
        />
        <Servicecard
          src="/landing/arrow.png"
          title={props?.data.cards[1].title}
          content={props?.data.cards[1].description}        />
        <Servicecard
          src="/landing/person.png"
          title={props?.data.cards[2].title}
          content={props?.data.cards[2].description}        />
      </div>
    </div>
  );
};

export default Midsection;
