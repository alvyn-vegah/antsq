export type billingInfoType = {
    firstName:string,
    lastName:string,
    email:string,
    address:string,
    city:string,
    zipCode:string,
}

export type paymentIntentType = {
    id: string;
    amount: number;
    currency: string;
    status: string;
    created: number;
    client_secret: string;
  };

export type paymentInfo = {
    billingInformation:billingInfoType,
    paymentIntent:paymentIntentType
}