import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export const POST = withCORS(async (req: NextRequest) => {
   try {
     const  {cartItems} = await req.json();
     const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const email = session.user.email;
    const username = session.user.name;
     
     if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
       return NextResponse.json({
         error: "No cart items provided"
       }, { status: 400 });
     }
     if (!email) {
       return NextResponse.json({
         error: "No email provided"
       }, { status: 400 });
     }

     // Connect to MongoDB
     const client = await clientPromise;
     const db = client.db("antsq");
     const subscriptionCollection = db.collection("subscriptions");

     // Upsert user subscription document
     await subscriptionCollection.updateOne(
       { email },
       { $addToSet: { subscriptions: { $each: cartItems } },
       $setOnInsert:{username},
       },
       { upsert: true }
     );

     return NextResponse.json({message:"Plan subscription success"});
   } catch (e) {
      console.error(e);
     return NextResponse.json({
        error: "Internal server error"
     }, { status: 500 });
   }
});