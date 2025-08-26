export type CustomRequestFormType  = {
    _id?:string;
    submittedOn?:string,
    status?:string,
    websiteType: string;
    reference: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    brandName: string;
    brandAge: string;
    brandDescription: string;
    hasDomain: boolean;
    domainName: string;
    websitesUnderDomain: string;
    hasHosting: boolean;
    needsLogo: boolean;
    categoryPages: string;
    needsContent: boolean;
    providingImages: boolean;
    additionalRequirements: string;
    budget: string;
}