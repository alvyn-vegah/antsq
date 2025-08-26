import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import clientPromise from "@/lib/mongodb";
import { paymentIntentType } from "@/lib/types/billing";

// GET user's cart
export const POST = withCORS(async (req: NextRequest) => {
  const {email} = await req.json();
  if (!email) {
    return NextResponse.json({ error: "no email provided" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("antsq");
    const paymentsObject = await db.collection("payments").findOne({ email });
    if (!paymentsObject) {
      return NextResponse.json({ items: [] });
    }
    // console.log("data",paymentsObject?.payments)
    let totalSpent = paymentsObject?.payments?.reduce(
      (sum: number, item: {paymentIntent:paymentIntentType,billingInformation:Record<string,string>}) => {
          return sum += Number(item.paymentIntent.amount);
      },
      0
    );

    totalSpent = Math.floor(totalSpent / 100);

    console.log("total spent",totalSpent)

    return NextResponse.json({paymentsObject,totalSpent});
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
});