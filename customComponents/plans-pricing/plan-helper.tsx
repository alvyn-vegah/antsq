type data = {
    content:string,
    img:string,
    tooltipContent?:string,
}

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
    description?:string,
}

export type packages = {
    header:headerType,
    data:data[],
    id?:string
}

function addTwentyPercent(value: string) {
  const num = Number(value);
  return Math.round(num * 1.2).toString();
}

export const StarterPack:packages =  {
    header:{
        ant:"Fire ant",
        package:"Starter Package",
        subTitle:"Essential marketing tools",
        description:"Basic SMM",
        monthlyPrice:"575",
        yearlyPrice:"6210",
        buttonText:"Signup Now",
        url:"/plans-pricing/fire-ant.png",
        actualPrice: addTwentyPercent("575"),
        actualYearlyPrice: addTwentyPercent("6210"),
        discount:"27"
    },
    data:[
        { content: "Evaluation of the page/channel performance", img: "/plans-pricing/page-channel.svg",tooltipContent:"Regular analysis to assess and improve your page or channel's performance." },
        { content: "Social media platform setup and management", img: "/plans-pricing/page-channel.svg",tooltipContent:"Comprehensive setup and ongoing management of your social media profiles." },
        { content: "2 posts/week in 4 platforms(Instagram, Facebook, Twitter + any 1 platform of your choice.", img: "/plans-pricing/2-high-quality.svg",tooltipContent:"2 posts per week on Instagram, Facebook, Twitter, and one additional platform of your choice." },
        { content: "1 SEO blog/month(1,000 words)", img: "/plans-pricing/seo-notes.svg",tooltipContent:"One 1,000-word SEO-optimized blog delivered each month to boost search rankings." },
        { content: "Upto 5 Instagram or Facebook stories / month ", img: "/plans-pricing/setup-setting.svg",tooltipContent:"Get up to 5 engaging Instagram or Facebook stories each month to enhance visibility." },
        { content: "Approval and editing of posts before publication", img: "/plans-pricing/approval-list.svg",tooltipContent:"Posts will be shared for approval and edited as needed before going live." },
        { content: "Monthly analytics dashboard for monitoring performance", img: "/plans-pricing/monthly-analytics.svg",tooltipContent:"Access a monthly dashboard to track and analyze campaign performance." },
        { content: "Use of hashtags to increase visibility and engagement", img: "/plans-pricing/hashtags.svg",tooltipContent:"Strategic use of hashtags to boost post reach and audience engagement." },
        { content: "Content calendar for planning(Google Sheet)", img: "/plans-pricing/slack.svg",tooltipContent:"Organized content calendar in Google Sheets to plan posts ahead of time." },
        { content: "2 complementary posts for special days in a month", img: "/plans-pricing/slack.svg",tooltipContent:"Includes 2 bonus posts each month for special days and occasions." },
        { content: "Email & Chat support(48 hours - maximum response time)", img: "/plans-pricing/slack.svg",tooltipContent:"Get support via email and chat with a maximum 48-hour response time." },
        { content: "Simple monthly billing with no additional commitments.", img: "/plans-pricing/calendar.svg",tooltipContent:"Pay monthly with no long-term contracts or hidden fees." }
],
id:"685bc06d9c259d9151045dfb"
}

export const GrowthPack:packages = {
    header:{
        ant:"Leafcutter ant",
        package:"Growth Package",
        subTitle:"Starter growth package",
        description:"Standard SMM",
        monthlyPrice:"875",
        yearlyPrice:"9450",
        buttonText:"Signup Now",
         url:"/plans-pricing/leaf-cutter-ant.png",
         actualPrice: addTwentyPercent("875"),
         actualYearlyPrice: addTwentyPercent("9450"),
         discount:"20"
    },
    data:[
        {
          content: "Evaluation of the page/channel performance",
          img: "/plans-pricing/page-channel.svg",
          tooltipContent: "Regular insights into page and channel performance to refine your digital strategy."
        },
        {
          content: "Social media platform setup and management",
          img: "/plans-pricing/page-channel.svg",
          tooltipContent: "Professional setup and routine management of your social media accounts."
        },
        {
          content: "4 posts/week in 4 platforms(Instagram, Facebook, Twitter + any 5 platforms of your choice.",
          img: "/plans-pricing/2-high-quality.svg",
          tooltipContent: "Consistent posting—4 times a week—across up to 8 platforms to boost reach."
        },
        {
          content: "2 SEO blogs/month (1200+ words with special keywords)",
          img: "/plans-pricing/seo-notes.svg",
          tooltipContent: "High-quality SEO blogs written monthly to improve search engine visibility and traffic."
        },
        {
          content: "10 Instagram/Facebook stories per month",
          img: "/plans-pricing/setup-setting.svg",
          tooltipContent: "Engaging stories crafted for Instagram and Facebook to maintain audience interaction."
        },
        {
          content: "Setup and optimization of social accounts",
          img: "/plans-pricing/setup-setting.svg",
          tooltipContent: "Initial account creation and strategic optimization for maximum profile effectiveness."
        },
        {
          content: "Approval and editing of posts before publication",
          img: "/plans-pricing/approval-list.svg",
          tooltipContent: "Review and revise posts with your feedback before they're published."
        },
        {
          content: "Monthly analytics dashboard for monitoring performance",
          img: "/plans-pricing/monthly-analytics.svg",
          tooltipContent: "Track performance through a clear dashboard updated monthly with key metrics."
        },
        {
          content: "Use of hashtags to increase visibility and engagement",
          img: "/plans-pricing/hashtags.svg",
          tooltipContent: "Strategic hashtag usage to maximize content discovery and engagement."
        },
        {
          content: "Content calendar for planning(Google sheet)",
          img: "/plans-pricing/slack.svg",
          tooltipContent: "Collaborative calendar in Google Sheets to plan and schedule content efficiently."
        },
        {
          content: "4 complementary posts for special days in a month",
          img: "/plans-pricing/calendar.svg",
          tooltipContent: "Bonus posts for festivals or trending occasions to stay culturally relevant."
        },
        {
          content: "Emai; & Chat support (24 hours - Maximum reponse time)",
          img: "/plans-pricing/video.svg",
          tooltipContent: "Reliable support via email or chat, guaranteed response within 24 hours."
        },
        {
          content: "Posting on Google Listing.",
          img: "/plans-pricing/chrome.svg",
          tooltipContent: "Keep your Google Business Profile active with regular post updates."
        },
        {
          content: "Keyword research",
          img: "/plans-pricing/thumbs-up.svg",
          tooltipContent: "Identify high-performing keywords to enhance content discoverability."
        },
        {
          content: "Upto 2 hours of online engagement",
          img: "/plans-pricing/thumbs-up.svg",
          tooltipContent: "We'll interact with your audience through comments, DMs, and engagement strategies."
        },
        {
          content: "Meta Ad campaign setup and management",
          img: "/plans-pricing/thumbs-up.svg",
          tooltipContent: "Launch and manage targeted ads on Meta platforms to grow your reach and conversions."
        }
      ],      
      id:"685bc0ee9c259d9151045dfc"
}

export const ToptierPack:packages = {
    header:{
        ant:"Bullet ant",
        package:"Top Tier Package",
        subTitle:"For new businesses",
        description:"Advanced SMM",
        monthlyPrice:"1175",
        yearlyPrice:"12690",
        buttonText:"Signup Now",
         url:"/plans-pricing/bullet-ant.png",
         actualPrice: addTwentyPercent("875"),
         actualYearlyPrice: addTwentyPercent("12690"),
         discount:"20"
    },
    data:[
        {
          content: "Evaluation of the page/channel performance",
          img: "/plans-pricing/page-channel.svg",
          tooltipContent: "Detailed performance audit of your social media profiles to identify growth opportunities and optimize strategy."
        },
        {
          content: "Social media platform setup and management",
          img: "/plans-pricing/page-channel.svg",
          tooltipContent: "Complete setup and professional management of your social media profiles across selected platforms."
        },
        {
          content: "6 posts/week in 15 platforms(Instagram, Facebook, Twitter, Linkedin, Youtube + any 10 platforms of your choice.)",
          img: "/plans-pricing/2-high-quality.svg",
          tooltipContent: "Consistent posting across 15 platforms, 6 times a week, including major networks and 10 platforms of your choice."
        },
        {
          content: "4 SEO blogs/month (1200+ words with special keywords)",
          img: "/plans-pricing/seo-notes.svg",
          tooltipContent: "High-quality, keyword-rich SEO blogs to drive traffic and improve search rankings."
        },
        {
          content: "15 Instagram/Facebook stories per month",
          img: "/plans-pricing/seo-notes.svg",
          tooltipContent: "Creative, timely stories published across Instagram and Facebook to boost real-time engagement."
        },
        {
          content: "Setup and optimization of social accounts",
          img: "/plans-pricing/setup-setting.svg",
          tooltipContent: "Fine-tuned setup and optimization of your social profiles to align with branding and SEO goals."
        },
        {
          content: "Approval and editing of posts before publication",
          img: "/plans-pricing/approval-list.svg",
          tooltipContent: "Review and approval process ensures your content is always aligned with your brand voice."
        },
        {
          content: "Monthly analytics dashboard for monitoring performance",
          img: "/plans-pricing/monthly-analytics.svg",
          tooltipContent: "Comprehensive dashboard tracking KPIs, engagement metrics, and monthly growth trends."
        },
        {
          content: "Use of hashtags to increase visibility and engagement",
          img: "/plans-pricing/hashtags.svg",
          tooltipContent: "Strategic hashtag usage to improve content reach, discoverability, and engagement."
        },
        {
          content: "Content calendar for planning(Google Sheet)",
          img: "/plans-pricing/slack.svg",
          tooltipContent: "Organized calendar (via Google Sheet) to transparently plan your monthly content in advance."
        },
        {
          content: "6 complementary posts for special days in a month",
          img: "/plans-pricing/calendar.svg",
          tooltipContent: "Themed posts for special occasions (festivals, events, awareness days) to connect with your audience."
        },
        {
          content: "2 Promotional Videos Per Month",
          img: "/plans-pricing/video.svg",
          tooltipContent: "Engaging promotional videos created monthly to market your brand, products, or offers."
        },
        {
          content: "Email & Chat support(24 hours response time)",
          img: "/plans-pricing/chrome.svg",
          tooltipContent: "Reliable support with guaranteed response within 24 hours via email and chat."
        },
        {
          content: "Posting on Google Listing",
          img: "/plans-pricing/thumbs-up.svg",
          tooltipContent: "Optimized posts on your Google Business Profile to improve local visibility and customer interaction."
        },
        {
          content: "Keyword research",
          img: "/plans-pricing/thumbs-up.svg",
          tooltipContent: "In-depth keyword analysis to boost SEO efforts and target the right search queries."
        },
        {
          content: "Upto 2 hours of online engagement",
          img: "/plans-pricing/thumbs-up.svg",
          tooltipContent: "Active interactions (likes, comments, responses) with your audience for up to 2 hours monthly."
        },
        {
          content: "Google Ads setup and management",
          img: "/plans-pricing/thumbs-up.svg",
          tooltipContent: "Note:Ad spend to be paid separately to google ads"
        },
        {
          content: "Meta Ads setup and mangement",
          img: "/plans-pricing/thumbs-up.svg",
          tooltipContent: "Note:Ad spend payable separately to Meta)"
        },
        {
          content: "2 Ad-ready promo videos/month (professional style for Google/Meta ads)",
          img: "/plans-pricing/thumbs-up.svg",
          tooltipContent: "Polished promotional videos optimized for paid ad campaigns across Meta and Google platforms."
        },
        {
          content: "Email Campaign setup and management",
          img: "/plans-pricing/thumbs-up.svg",
          tooltipContent: "Design, scheduling, and performance tracking of email campaigns tailored for your audience."
        },
        {
          content: "Complimentary website design included (domain and hosting charges apply separately)",
          img: "/plans-pricing/thumbs-up.svg",
          tooltipContent: "Professional website design included as a bonus; domain and hosting costs are billed separately."
        }],      
      id:"685bc1639c259d9151045dfd"
}

export const CustomPack:packages = {
    header:{
        ant:"Artisan ant",
        package:"Custom Package",
        description:"web development & Design",
        monthlyPrice:"Sign Up",
        yearlyPrice:"Custom",
        buttonText:"Request a Quote",
        url:"/plans-pricing/artisan-ant.png"
    },
    data:[
        { content: "Custom Website Design", img: "/plans-pricing/custom-web.svg",tooltipContent:"Bespoke visual identity that captures your brand essence and converts visitors into customers. No templates, no shortcuts—just pure creative excellence tailored to your unique business story." },
        { content: "Tailored Web Solutions by Business", img: "/plans-pricing/tailored-web.svg",tooltipContent:"Industry-specific functionality and features designed for your market. Whether you're in e-commerce, healthcare, professional services, or hospitality—we speak your business language." },
        { content: "Responsive Design", img: "/plans-pricing/responsive.svg",tooltipContent:"Flawless experience across all devices—desktop, tablet, and mobile. Your website will look stunning and function perfectly, regardless of how your customers find you." },
        { content: "Modern Technology Stack", img: "/plans-pricing/tailored-web.svg",tooltipContent:"Built on cutting-edge platforms: WordPress for content-rich sites, React for dynamic applications, or custom solutions. Choose your preferred CMS or let us recommend the perfect fit for your needs." },
        { content: "Full Stack Development", img: "/plans-pricing/search-engine.svg",tooltipContent:"Complete frontend and backend development capabilities. Beautiful user interfaces powered by robust server-side architecture that scales with your business growth." },
        { content: "Database & Cloud Solutions", img: "/plans-pricing/social-media.svg",tooltipContent:"Secure, scalable data management with Supabase, MongoDB, or PostgreSQL. Real-time data synchronization, automated backups, and cloud-native architecture for maximum reliability." },
        { content: "E-commerce Integration", img: "/plans-pricing/analytics-monitor.svg",tooltipContent:"Complete online selling solutions with inventory management, payment processing, order tracking, and customer accounts. From simple product catalogs to complex B2B marketplaces." },
        { content: "Admin Dashboard & Analysis", img: "/plans-pricing/performance.svg",tooltipContent:"Powerful backend management system for your team. Real-time analytics, user management, content control, and business intelligence—all in one intuitive interface." },
        { content: "Client Dashboard Panels", img: "/plans-pricing/training.svg",tooltipContent:"Custom portals for your customers with login areas, account management, order history, support tickets, and personalized experiences that increase retention." },
        { content: "User Authentication & Security", img: "/plans-pricing/maintenance.svg",tooltipContent:"Multi-level user roles, secure login systems, two-factor authentication, and compliance-ready security protocols. Your data and your customers' data stay protected." },
        { content: "Api Development & Integration", img: "/plans-pricing/maintenance.svg",tooltipContent:"Custom APIs for third-party integrations, mobile apps, or connecting multiple systems. Seamless data flow between your website and existing business tools." },
        { content: "Email & SMS Automation", img: "/plans-pricing/maintenance.svg",tooltipContent:"Automated marketing sequences, transactional emails, abandoned cart recovery, and SMS notifications. Turn one-time visitors into loyal customers." },
        { content: "Payment Gateway Integration", img: "/plans-pricing/maintenance.svg",tooltipContent:"Secure payment processing with Stripe, PayPal, Square, or custom solutions. Support for subscriptions, one-time payments, and international transactions." },
        { content: "Progressive Web App(PWA)", img: "/plans-pricing/maintenance.svg",tooltipContent:"App-like experience without app store downloads. Push notifications, offline functionality, and home screen installation for maximum user engagement." },
        { content: "Content Creation & Management", img: "/plans-pricing/maintenance.svg",tooltipContent:"Compelling copy and visual content that tells your story. Advanced content management systems with scheduling, version control, and multi-user collaboration." },
        { content: "Search Engine Optimization(SEO)", img: "/plans-pricing/maintenance.svg",tooltipContent:"Strategic optimization to help your ideal customers find you on Google. Technical SEO, keyword research, and content optimization for sustainable organic growth." },
        { content: "Social Media Integration", img: "/plans-pricing/maintenance.svg",tooltipContent:"Seamless connection between your website and social platforms. Live feeds, social commerce, sharing capabilities, and social login options." },
        { content: "Lead Capture & CRM Management", img: "/plans-pricing/maintenance.svg",tooltipContent:"Intelligent forms that convert visitors into prospects. Integration with HubSpot, Salesforce, or custom CRM solutions for streamlined lead management." },
        { content: "Advanced Analytics & Monitoring", img: "/plans-pricing/maintenance.svg",tooltipContent:"Real-time insights with Google Analytics 4, custom dashboards, heat mapping, user journey analysis, and conversion tracking across all touchpoints." },
        { content: "Enterprise Security & Performance", img: "/plans-pricing/maintenance.svg",tooltipContent:"SSL certificates, regular security audits, malware protection, CDN integration, and performance optimization for lightning-fast loading speeds." },
        { content: "Cloud Hosting & Devops", img: "/plans-pricing/maintenance.svg",tooltipContent:"Scalable cloud infrastructure with AWS, Azure, or Google Cloud. Automated deployments, staging environments, and 99.9% uptime guarantee." },
        { content: "Backup & Disaster Recovery", img: "/plans-pricing/maintenance.svg",tooltipContent:"Automated daily backups, version control, and disaster recovery plans. Your website and data are always protected and recoverable." },
        { content: "Comprehensive Traning", img: "/plans-pricing/maintenance.svg",tooltipContent:"Full onboarding for your team: content management, dashboard usage, SEO basics, and best practices. Video tutorials and documentation included." },
        { content: "Maintenance & Support", img: "/plans-pricing/maintenance.svg",tooltipContent:"Ongoing technical support, security updates, performance monitoring, and feature enhancements. Priority response times and proactive issue resolution." },
        { content: "Growth Strategy Consultation", img: "/plans-pricing/maintenance.svg",tooltipContent:"Monthly strategy sessions to optimize performance, plan new features, and scale your digital presence. We're your long-term growth partners." },
      ]
}
  
//  SEO CARDS DATA 



