import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import clientPromise from "@/lib/mongodb";

export const GET = withCORS(async (req: NextRequest) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  try {
    const client = await clientPromise;
    const db = client.db("antsq");
    // Get all documents in the payments collection
    const allDocs = await db.collection("payments").find({}).toArray();
    let totalAmount = 0;
    for (const doc of allDocs) {
      if (Array.isArray(doc.payments)) {
        for (const payment of doc.payments) {
          if (payment.paymentIntent && typeof payment.paymentIntent.amount === "number") {
            totalAmount += payment.paymentIntent.amount;
          }
        }
      }
    }
    // Convert from cents to dollars and floor to integer
    const totalDollars = Math.floor(totalAmount / 100);
    return NextResponse.json({ total: totalDollars });
  } catch (error) {
    console.error("Error calculating total payments:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
} );