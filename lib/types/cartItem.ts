export interface CartItem {
    userEmail: string;
    plan: string;
    description: string;
    price: number;
    actualPrice: number;
    discount: number;
    quantity: number;
}

export type CartItemPayload = {
    id?: string; // plan id, optional if not always present
    plan: string;
    subtitle?:string,
    description: string;
    monthlyPrice: string;
    yearlyPrice:string,
    actualPrice: string;
    actualYearlyPrice:string,
    discount: string;
    quantity: string;
    url:string
  };