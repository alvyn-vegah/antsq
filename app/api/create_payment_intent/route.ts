import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import Stripe from 'stripe';
import clientPromise from "@/lib/mongodb";
import { PaymentDataType } from "@/lib/types/payments";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST = withCORS(async (req: NextRequest) => {
   try {
           const { cartItems } = await req.json();
     
     if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
       return NextResponse.json({
         error: "No cart items provided"
       }, { status: 400 });
     }

     // Connect to MongoDB
     const client = await clientPromise;
     const db = client.db("antsq");
     const productsCollection = db.collection("products");
     const lastThreeProducts = await productsCollection.find().sort({ _id: -1 }).limit(3).toArray();
     let totalAmount = 0;
     let bundleDiscount = 0;
     // Calculate total amount by fetching actual prices from database
     for (const cartItem of cartItems) {
       if (!cartItem.id) {
         console.error("Cart item missing ID:", cartItem);
         continue;
       }
       const product = await productsCollection.findOne({ id: cartItem.id });
       let price = 0;
       if (product) {
         // Use the monthlyPrice from the database, convert to cents
         if (lastThreeProducts.some((item) => item._id.equals(product._id))) {
           if(cartItem.isyearly) {
            price = parseFloat(product.yearlyPrice || "0");
            bundleDiscount = 20;
           } else {
            price = parseFloat(product.monthlyPrice || "0");
            bundleDiscount = 10;
           }
         } else {
            price = parseFloat(product.monthlyPrice || "0");
         }
         const quantity = parseInt(cartItem.quantity || "1");
         totalAmount += price * quantity * 100; // Convert to cents for Stripe
         
       } else {
         console.error(`Product not found for ID: ${cartItem.id}`);
         return NextResponse.json({
           error: `Product not found for ID: ${cartItem.id}`
         }, { status: 404 });
       }
     }

     if(bundleDiscount == 20) {
       totalAmount = totalAmount * 0.8;
     } else if(bundleDiscount == 10) {
      totalAmount = totalAmount * 0.9;
     }
     const taxAmount = totalAmount * 0.0825;
     totalAmount += taxAmount;
     if (totalAmount <= 0) {
       return NextResponse.json({
         error: "Invalid total amount"
       }, { status: 400 });
     }

     const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount), // Ensure it's an integer
        currency: "usd",
        automatic_payment_methods: { enabled: true },
     });
    const paymentData: PaymentDataType = {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      created: paymentIntent.created,
      client_secret: paymentIntent.client_secret
    }
    console.log("response",paymentIntent)
     return NextResponse.json({ clientSecret: paymentIntent.client_secret,paymentIntent:paymentData });
   } catch (e) {
      console.error(e);
     return NextResponse.json({
        error: "Internal server error"
     }, { status: 500 });
   }
});