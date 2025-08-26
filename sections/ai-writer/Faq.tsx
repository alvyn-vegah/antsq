import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  type qna = {
    question:string,
    answer:string
  }

  type faqProps = {
    title:string,
    subtitle:string,
    questions:qna[]
  }

export const Faq = (props:{data:faqProps}) => {
    return (
        <section className="primarybg px-5 md:px-10 lg:px-20 py-20">
            <div className="flex flex-col items-center py-10">
                <p className="font-semibold text-lg">FAQ</p>
                <h1 className="font-extrabold text-4xl text-center md:text-left">{props.data.subtitle}</h1>
            </div>
         <div className="flex flex-col items-center gap-3 w-full">
         <Accordion className="w-full md:w-3/4" type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>{props.data.questions[0].question}</AccordionTrigger>
    <AccordionContent>
      {props.data.questions[0].answer}
    </AccordionContent>
  </AccordionItem>
</Accordion>
         <Accordion className="w-full md:w-3/4"  type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>{props.data.questions[1].question}</AccordionTrigger>
    <AccordionContent>
      {props.data.questions[1].answer}
    </AccordionContent>
  </AccordionItem>
</Accordion>
<Accordion className="w-full md:w-3/4"  type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>{props.data.questions[2].question}</AccordionTrigger>
    <AccordionContent>
    {props.data.questions[2].answer}
    </AccordionContent>
  </AccordionItem>
</Accordion>
         <Accordion className="w-full md:w-3/4"  type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>{props.data.questions[3].question}</AccordionTrigger>
    <AccordionContent>
    {props.data.questions[3].answer}
</AccordionContent>
</AccordionItem>
</Accordion>
         <Accordion className="w-full md:w-3/4"  type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>{props.data.questions[4].question}</AccordionTrigger>
    <AccordionContent>
    {props.data.questions[3].answer}
    </AccordionContent> </AccordionItem>
</Accordion>
         </div>
        </section>
    )
}