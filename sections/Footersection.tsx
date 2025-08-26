"use client";
import DropdownBtn from "@/customComponents/DropdownBtn";
import { useEffect, useState } from "react";
import { Link } from "@/navigation";
import Image from "next/image";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const Footersection = () => {
  const footer = useTranslations("footer");
  const footerData = {
    description: footer("description"),

    companyTitle: footer("company.title"),
    company: {
      0: footer("company.content.0"),
      1: footer("company.content.1"),
      2: footer("company.content.2"),
      3: footer("company.content.3"),
      4: footer("company.content.4"),
      5: footer("company.content.5"),
      6: footer("company.content.6"),
    },

    servicesTitle: footer("services.title"),
    services: {
      0: footer("services.content.0"),
      1: footer("services.content.1"),
      2: footer("services.content.2"),
      3: footer("services.content.3"),
      4: footer("services.content.4"),
      5: footer("services.content.5"),
    },

    socialMediaTitle: footer("socialMedia.title"),
    socialSubscribeText: footer("socialMedia.subscribe"),
    socialDescription: footer("socialMedia.description"),
    socialButtonText: footer("socialMedia.buttonText"),
  };

  const [isMobile, setIsMobile] = useState(false);
  // Hover state for Company links
  const [companyHovered, setCompanyHovered] = useState(Array(7).fill(false));
  // Hover state for Services links
  const [servicesHovered, setServicesHovered] = useState(Array(6).fill(false));
  // Hover state for Send button
  const [sendHovered, setSendHovered] = useState(false);

  const navOptions = [
    { name: footerData.services[0], url: "/business-social-media-management" },
    {
      name: footerData.services[1],
      url: "search-engine-optimization-marketing",
    },
    { name: footerData.services[2], url: "brand-reputation-management" },
    { name: footerData.services[3], url: "email-marketing" },
    { name: footerData.services[4], url: "graphic-design" },
    { name: footerData.services[5], url: "web-development" },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div
      id="footerSection"
      className="flex font-roboto shadow-2xl relative flex-col gap-10 bg-gradient-to-tr from-[#f6bbb5] to-rose-50 w-full h-fit"
    >
      <div className="flex flex-col md:flex-row px-5 md:px-20 pt-15 md:gap-10 z-10">
        {/* one */}
        <div className="w-full md:w-1/4 flex flex-col items-center md:items-start gap-5 py-5 md:py-0">
          <Image
            src={"/logo.png"}
            alt="AntsQ Logo"
            width={200}
            height={60}
            className="w-2/3 h-fit"
          />
          <p className="font-bold text-gray-500 text-center md:text-left 2xl:text-2xl">
            {footerData.description}
          </p>
        </div>
        {/* two */}
        <div className="w-full md:w-1/4 flex flex-col items-center gap-5">
          {isMobile ? (
            <div className="w-full md:w-1/4 flex flex-col items-center gap-5">
              <p className="font-bold text-xl md:text-left">
                {footerData.companyTitle}
              </p>
              <DropdownBtn
                content={[
                  { name: footerData.company[0], url: "/home" },
                  { name: footerData.company[1], url: "/plans-pricing" },
                  { name: footerData.company[2], url: "/about" },
                  { name: footerData.company[3], url: "/blog" },
                  { name: footerData.company[4], url: "/ai-writer" },
                  { name: footerData.company[5], url: "/contact" },
                  { name: footerData.company[6], url: "/rss.xml" },
                ]}
              />
            </div>
          ) : (
            <div className="flex flex-col items-start gap-5">
              <p className="font-bold text-xl 2xl:text-4xl md:text-left">{footerData.companyTitle}</p>
              <div className="flex flex-col gap-4 items-start">
                {[
                  { name: footerData.company[0], url: "/home" },
                  { name: footerData.company[1], url: "/plans-pricing" },
                  { name: footerData.company[2], url: "/about" },
                  { name: footerData.company[3], url: "/blog" },
                  { name: footerData.company[4], url: "/ai-writer" },
                  { name: footerData.company[5], url: "/contact" },
                  { name: footerData.company[6], url: "/rss.xml" },
                ].map((item, index) => (
                  <Link href={item.url}>
                    <p
                      key={index}
                      className={clsx(
                        "transition-transform duration-300 transform origin-right 2xl:text-xl",
                        companyHovered[index] &&
                          "cursor-pointer scale-105 text-red-800"
                      )}
                      onMouseEnter={() => {
                        setCompanyHovered((h) =>
                          h.map((v, i) => (i === index ? true : v))
                        );
                      }}
                      onMouseLeave={() => {
                        setCompanyHovered((h) =>
                          h.map((v, i) => (i === index ? false : v))
                        );
                      }}
                    >
                      {item.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* three */}
        <div className="w-full md:w-1/4 flex flex-col items-center gap-5">
          {isMobile ? (
            <div className="w-full md:w-1/4 flex flex-col items-center gap-5">
              <p className="font-bold text-xl md:text-left">
                {footerData.servicesTitle}
              </p>
              <DropdownBtn content={navOptions} />
            </div>
          ) : (
            <div className="flex flex-col items-start gap-5">
              <p className="font-bold text-xl 2xl:text-4xl md:text-left">
                {footerData.servicesTitle}
              </p>
              <div className="flex flex-col gap-4 items-start">
                {navOptions.map((item, index) => (
                  <Link href={item.url} key={index}>
                    <p
                      className={clsx(
                        "transition-transform duration-300 transform origin-right 2xl:text-xl",
                        servicesHovered[index] &&
                          "cursor-pointer scale-105 text-red-800"
                      )}
                      onMouseEnter={() => {
                        setServicesHovered((h) =>
                          h.map((v, i) => (i === index ? true : v))
                        );
                      }}
                      onMouseLeave={() => {
                        setServicesHovered((h) =>
                          h.map((v, i) => (i === index ? false : v))
                        );
                      }}
                    >
                      {item.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* four */}
        <div className="w-full md:w-1/4 flex flex-col items-center py-5 md:py-0 gap-10">
          <p className="font-bold text-lg 2xl:text-3xl text-center">
            {footerData.socialMediaTitle}
          </p>
          <div className="flex gap-4">
            <Link href={"https://www.facebook.com/antsqmedia/"}>
              <Image
                src={"/fb.png"}
                alt="Facebook"
                width={28}
                height={28}
                className="h-7 w-auto"
              />
            </Link>
            <Link href={"https://x.com/antsq4smm"}>
              <Image
                src={"/twitter.png"}
                alt="Twitter"
                width={28}
                height={28}
                className="h-7 w-auto"
              />
            </Link>
            <Link href={"https://www.linkedin.com/company/antsq/"}>
              <Image
                src={"/linked.png"}
                alt="LinkedIn"
                width={28}
                height={28}
                className="h-7 w-auto"
              />
            </Link>
            <Link href={"https://www.instagram.com/antsq_media/"}>
              <Image
                src={"/insta.png"}
                alt="Instagram"
                width={28}
                height={28}
                className="h-7 w-auto"
              />
            </Link>
          </div>
          <p className="font-bold text-lg 2xl:text-2xl">{footerData.socialSubscribeText}</p>
          <p className="font-bold text-gray-500 2xl:text-xl">
            {footerData.socialDescription}
          </p>
          <div className="flex flex-col gap-4 items-start w-full">
            <input
              type="text"
              placeholder="Email"
              className="px-4 py-2 bg-white w-full"
            />
            <button
              className={clsx(
                "rounded-none w-fit text-white bg-red-800 px-5 py-1 2xl:text-xl transition-colors",
                sendHovered && "bg-red-700 cursor-pointer"
              )}
              onMouseEnter={() => setSendHovered(true)}
              onMouseLeave={() => setSendHovered(false)}
            >
              {footerData.socialButtonText}
            </button>
          </div>
        </div>
      </div>
      <div className="sm:px-5 md:px-20 rounded-t-2xl w-full z-10">
        <div className="bg-red-800 rounded-t-4xl pt-4 pb-10">
          <p className="text-sm sm:text-lg text-gray-100 md:font-semibold text-center">
            Copyright © 2022 <span className="text-blue-800">Antsq</span> | a
            vegah llc company
          </p>
        </div>
      </div>
      <Image
        src="/business/footerImg-lighten.png"
        alt="Decorative background pattern"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 opacity-50 z-0"
      />
    </div>
  );
};

export default Footersection;
