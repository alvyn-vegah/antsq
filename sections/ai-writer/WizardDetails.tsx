import { Wizardbox } from "./Wizardbox"

type WizardProps = {
    title:string,
    description:string,
    buttonText:string,
}

export const WizardDetails = (props:{data:WizardProps[]}) => {
    return (
        <div className="primarybg py-20 flex flex-col gap-20">
           <Wizardbox
           reverse={false}
           title={props.data[0].title}
           desc={props.data[0].description}
           url="/ai-writer/blog-wizard.png"
           icon="/ai-writer/sound.svg"
            />
           <Wizardbox
           reverse={true}
           title={props.data[1].title}
           desc={props.data[1].description}
           url="/ai-writer/email-wizard.png"
           icon="/ai-writer/email.svg"
            />
           <Wizardbox
           reverse={false}
           title={props.data[2].title}
           desc={props.data[2].description}
           url="/ai-writer/ecommerce-wizard.png"
           icon="/ai-writer/cart.svg"
            />
           <Wizardbox
           reverse={true}
           title={props.data[3].title}
           desc={props.data[3].description}
           url="/ai-writer/startup-wizard.png"
           icon="/ai-writer/rocket.svg"
            />
           
        </div>
    )
}