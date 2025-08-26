import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export const POST = withCORS(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  const usermail = session?.user?.email
   try {
           const { billingInformation,paymentIntent } = await req.json();

     // Connect to MongoDB
     const client = await clientPromise;
     const db = client.db("antsq");
     const paymentsCollection = db.collection("payments");
    const user = await paymentsCollection.findOne({email: usermail})
    
    if(user) {
      // User exists, add payment to existing payments array
      await paymentsCollection.updateOne(
        {email: usermail},
        {
          $push: {
            payments: {
              billingInformation,
              paymentIntent,
            }
          }
        } as Record<string, unknown>
      )
      console.log("saved payment information")
      return NextResponse.json({ response:"Stored payment details successfully" },{status:200});
    } else {
      // User doesn't exist, create new user with payments array
      await paymentsCollection.insertOne({
        email: usermail,
        payments: [{
          billingInformation,
          paymentIntent
        }]
      })
      console.log("saved payment information")
      return NextResponse.json({ response:"Stored payment details successfully" },{status:201});
    }
   } catch (e) {
      console.error(e);
     return NextResponse.json({
        error: "Internal server error"
     }, { status: 500 });
   }
});