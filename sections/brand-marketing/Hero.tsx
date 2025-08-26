export const Hero = () => {
    return (
        <div className="business pt-[10vh] flex flex-col w-full">
            <div className="flex flex-col w-full md:flex-row md:h-[85vh] px-20 md:pl-20 md:pr-5 py-10 gap-10 md:gap-0 relative">
                {/* left div */}
                <div className="flex flex-col justify-around items-center md:items-start gap-10 w-full md:w-1/2">
                  <div className="flex flex-col gap-5 text-center md:text-left">
                    <p className="text-red-700 sm:text-lg md:text-xl font-semibold">Listen to what your customers are talking about!</p>
                    <p className="font-bold sm:text-3xl md:text-4xl lg:text-5xl" style={{letterSpacing:"2px"}}>We help you control your brand’s reputation that speaks for your business.</p>
                  </div>
                  <button className="text-gray-100 text-lg z-10 font-semibold w-fit shadow-2xl rounded-full bg-red-800 px-7 py-2">Our Plans</button>
                </div>
                {/* right div */}
                <div className="w-full md:w-2/3 flex justify-start">
                <img src={'/brand-marketing/brand.png'} className="h-fit" />
                </div>
            </div>
            <div className="h-[10vh] pt-10 hidden md:block">
                <img src={'/landing/wave-haikei.png'} className="w-full h-[400px] absolute bottom-0" />
                <img src={'/landing/wave-haikei2.png'} className="w-full h-[400px] absolute bottom-0 opacity-69" />
                <img src={'/landing/wave-haikei3.png'} className="w-full h-[400px] absolute bottom-0 opacity-50" />
            </div>
        </div>
    )
}