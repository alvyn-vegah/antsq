import { Card } from './Card'

const Solutions = () => {
    return (
        <section className='w-full px-5 md:px-10 lg:px-20'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold w-full md:w-1/2 py-10'>We Provide a Variety of tailored Solutions</h1>
       <div className="flex flex-col gap-10 w-full">
       <Card
       url='/web-development/wordpress.svg'
       title='WordPress:'
       content='We have hands-on experience using WordPress! WordPress fuels nearly 40% of all websites on the internet. Our team builds robust websites and intuitive content that is easy to update & maintain. We use potent plugins and extensions to make the best ones and elevate your ideas to the next level.'
        />
         <Card
       url='/web-development/funnel.svg'
       title='Lead Generation'
       content='Marketing is the key to success in business and sales growth. Antsq team is smart enough to know the most innovative and smartest tools and paths to generate leads and conversions! We offer complete landing page packages that pitch and drive in customers. We provide you with a seamless experience of elevating your business!'
        />
         <Card
       url='/web-development/seo.svg'
       title='Analytics and Reporting'
       content='Analytics & KPIs provide data that allow analysts to make decisions based on current performance & growth. We have domain experts to smart track your business growth & analytics to stand out from your competitors. We use tools like Google Analytics, Google Console, and Keyword Planner to analyze elevation and profits.'
        />
         <Card
       url='/web-development/payments.svg'
       title='Payments'
       content='Payments are made online, sitting right where you are! Our sites and servers are compatible to support seamless transactions to continue your experience through Paypal, Stripe, and Cash on Delivery modes.'
        />
         <Card
       url='/web-development/mobile.svg'
       title='Mobile Ready'
       content='Everything’s made available in a single tap! Shopping & purchasing has shifted to the online space. Antsq Marketing sculpts a perfect responsive and optimized mobile experience. Get in touch with us or book a free trial to experience the service!'
        />
       </div>
       </section>
    )
}

export default Solutions;