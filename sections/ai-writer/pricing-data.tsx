export type packages = {
    package:string,
    url:string,
    price:string,
    data:{ content: string; img: string }[],
}

export const FreePlan:packages = {
   package:"Free Plan",
   url:"/ai-writer/pad.webp",
   price:"0",
    data:[
        { content: "100 free credits per lifetime", img: "/ai-writer/circle-dollar-sign.svg" },
        { content: "AI wizards", img: "/ai-writer/wand-sparkles.svg" },
        { content: "AI prompts", img: "/ai-writer/text.svg" },
        { content: "SEO-Optimized", img: "/ai-writer/search-check.svg" },
        { content: "Human-like-Written", img: "/ai-writer/pen-line.svg" },
      ],
}

export const BasicPlan:packages = {
    package:"Basic Plan",
    url:"/ai-writer/hammer.webp",
    price:"36",
     data:[
         { content: "12,500 credits per month", img: "/ai-writer/circle-dollar-sign.svg" },
         { content: "AI wizards", img: "/ai-writer/wand-sparkles.svg" },
         { content: "AI prompts", img: "/ai-writer/text.svg" },
         { content: "SEO-Optimized", img: "/ai-writer/search-check.svg" },
         { content: "Human-like-Written", img: "/ai-writer/pen-line.svg" },
         { content: "10 Million words or 1250 images", img: "/ai-writer/image.svg" },
         { content: "AI prompts + templates", img: "/ai-writer/bot.svg" },
       ]
 }

export const PremiumPlan:packages = {
    package:"Premium Plan",
    url:"/ai-writer/chemical.webp",
    price:"47",
     data:[
         { content: "17,000 credits per month", img: "/ai-writer/circle-dollar-sign.svg" },
         { content: "AI wizards", img: "/ai-writer/wand-sparkles.svg" },
         { content: "AI prompts", img: "/ai-writer/text.svg" },
         { content: "SEO-Optimized", img: "/ai-writer/search-check.svg" },
         { content: "Human-like-Written", img: "/ai-writer/pen-line.svg" },
         { content: "14 Million words or 1700 images", img: "/ai-writer/image.svg" },
         { content: "AI prompts + templates", img: "/ai-writer/bot.svg" },
       ]
 }