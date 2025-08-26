const Middle = () => {
    const services = [
        "Business Social Media Management",
        "Search Engine Optimization & Marketing",
        "Brand Reputation Management",
        "Email Marketing",
        "Graphic Design",
        "Web Development",
        "Other",
      ];
    return (
        <div className="primarybg flex flex-col md:flex-row gap-10 w-full p-10 md:px-15 lg:px-20">
            <div className="w-full md:w-[65%] bg-gray-50/50 p-5 rounded-lg z-10">
              <div className="flex flex-col md:flex-row gap-2 py-2">
               <div className="flex flex-col w-full md:w-1/2 gap-1">
                <p>First Name:</p>
                <input className="bg-[#f3e3e1] rounded-sm w-full p-3" />
               </div>
               <div className="flex flex-col w-full md:w-1/2 gap-1">
                <p>Last Name:</p>
                <input className="bg-[#f5d3cd] rounded-sm w-full p-3" />
               </div>
              </div>
              <div className="flex flex-col gap-1 py-2">
                <p>Email:</p>
              <input type="text" className="w-full bg-[#f5d3cd] rounded-sm p-3" />
              </div>
              <div className="flex flex-col gap-1 py-2">
                <p>Phone Number:</p>
              <input type="text" className="w-full p-3 bg-[#f5d3cd] rounded-sm" />
              </div>
              <div className="py-4 rounded">
      <label className="font-bold block mb-2">Choose Service</label>
      <div className="flex flex-col gap-2">
        {services.map((service, idx) => (
          <label key={idx} className="flex items-center gap-2 font-normal">
            <input
              type="checkbox"
              name="services"
              value={service}
              className="w-4 h-4"
            />
            {service}
          </label>
        ))}
      </div>
    </div>
              <div className="flex flex-col gap-1 py-2">
                <p>Message:</p>
              <textarea placeholder="message" className="w-full h-[100px] bg-[#f5d3cd] rounded-lg p-3" />
              </div>
              <button className="text-white bg-red-800 py-3 rounded-sm w-full text-lg">Send Message</button>
            </div>

            <div className="flex flex-col gap-10 w-full md:w-[35%] p-2 business rounded-2xl items-center h-fit py-10 z-10">
            <img src="/contact/contact-us.png" alt="img" className="h-1/2 w-2/3" />
            <div className="flex flex-col gap-4">
             <h1 className="text-3xl font-bold text-center">We are Social</h1>
             <div className="flex justify-center gap-3">
             <img src={'/fb.png'} className="h-5 lg:h-7"  />
      <img src={'/twitter.png'} className="h-5 lg:h-7"  />
      <img src={'/linked.png'} className="h-5 lg:h-7"  />
      <img src={'/insta.png'} className="h-5 lg:h-7"  />
             </div>
            </div>
            </div>
         </div>
    )
}

export default Middle