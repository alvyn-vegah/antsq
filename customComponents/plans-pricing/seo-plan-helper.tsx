type headerType = {
    ant:string,
    package:string,
    subTitle?:string,
    monthlyPrice:string,
    yearlyPrice:string,
    buttonText:string,
    url:string,
    discount?:string,
    actualPrice?:string,
    actualYearlyPrice?:string,
    desc:string[],
}

export type packages = {
    header:headerType,
    data:{ content: string; img: string }[],
    id?:string,
}

export const BasicPack:packages =  {
    header:{
        ant:"Seed Ant",
        package:"Basic",
        subTitle:"Essential SEO keyword setup",
        monthlyPrice:"950",
        yearlyPrice:"10260",
        buttonText:"Buy Now",
        url:"/plans-pricing/hammerAnt.png",
        desc:[
            "All-in-SEO for 5 Page.",
            "Site Audit, Keyword mapping, Backlinks,",
            "Content optimization"
          ]
    },
    data:[
        { content: "SEO Audit", img: "/plans-pricing/search-check.svg" },
        { content: "Competitor Analysis", img: "/plans-pricing/users.svg" },
        { content: "On-page optimization", img: "/plans-pricing/cog.svg" },
        { content: "Technical SEO", img: "/plans-pricing/terminal.svg" },
        { content: "Off-page strategy", img: "/plans-pricing/external-link.svg" },
        { content: "Guest posting strategy", img: "/plans-pricing/file-pen-line.svg" },
        { content: "Keywords researched: 20", img: "/plans-pricing/file-search.svg" },
      ],
      id:"7f4c2a9e1d2b3c4567890abc"
}

export const PremiumPack:packages = {
    header:{
        ant:"Meta Ant",
        package:"Premium",
        subTitle:"Advanced SEO strategy",
        monthlyPrice:"1500",
        yearlyPrice:"16200",
        buttonText:"Buy Now",
         url:"/plans-pricing/craftsman.png",
         desc:[
            "All-in-SEO for 20+ Pages.",
            "Site Audit, Keyword mapping, Backlinks,",
            "Content optimization"
          ]
    },
    data:[
        { content: "SEO Audit", img: "/plans-pricing/search-check.svg" },
        { content: "Competitor Analysis", img: "/plans-pricing/users.svg" },
        { content: "On-page optimization", img: "/plans-pricing/cog.svg" },
        { content: "Technical SEO", img: "/plans-pricing/terminal.svg" },
        { content: "Off-page strategy", img: "/plans-pricing/external-link.svg" },
        { content: "Guest posting strategy", img: "/plans-pricing/file-pen-line.svg" },
        { content: "Keywords researched: 60", img: "/plans-pricing/file-search.svg" },
        { content: "Bad links removal", img: "/plans-pricing/link-2-off.svg" }
      ],
      id:"9a1b2c3d4e5f60718293a4bd"
}

export const StandardPack:packages = {
    header:{
        ant:"Optimizer Ant",
        package:"Standard",
        subTitle:"Full on-page optimization",
        monthlyPrice:"1200",
        yearlyPrice:"12960",
        buttonText:"Buy Now",
         url:"/plans-pricing/spannerAnt.png",
         desc:[
            "All-in-SEO for 10 Pages.",
            "Site Audit, Keyword mapping, Backlinks,",
            "Content optimization"
          ]
    },
    data:[
        { content: "SEO Audit", img: "/plans-pricing/search-check.svg" },
        { content: "Competitor Analysis", img: "/plans-pricing/users.svg" },
        { content: "On-page optimization", img: "/plans-pricing/cog.svg" },
        { content: "Technical SEO", img: "/plans-pricing/terminal.svg" },
        { content: "Off-page strategy", img: "/plans-pricing/external-link.svg" },
        { content: "Guest posting strategy", img: "/plans-pricing/file-pen-line.svg" },
        { content: "Keywords researched: 50", img: "/plans-pricing/file-search.svg" },
      ],
      id:"5d3e2f1c0a9b8c7d6e4f3210"
}