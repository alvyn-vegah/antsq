import Card from "../../customComponents/brand-marketing/Card";
type PropType = {
  title:string,
  description:string,
  buttonText:string,
}
const Cards = (props:{data:PropType[]}) => {
    return (
        <section className="flex flex-col md:flex-row gap-4 py-10 px-5 md:p-10 lg:p-20">
          <Card title={props.data[0].title} description={props.data[0].description} buttonText={props.data[0].buttonText}  />
          <Card title={props.data[1].title} description={props.data[1].description} buttonText={props.data[1].buttonText}  />
          <Card title={props.data[2].title} description={props.data[2].description} buttonText={props.data[2].buttonText}  />
        </section>
    )
}

export default Cards;