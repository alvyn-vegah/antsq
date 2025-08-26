import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import clientPromise from "@/lib/mongodb";
import { CartItemPayload } from "@/lib/types/cartItem";

export const GET = withCORS(async (req: NextRequest) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const client = await clientPromise;
      const db = client.db("antsq");
      const cart = await db.collection("cart").findOne({ userEmail: session.user.email });
      const cartPlans = (cart?.items || []).map((item: CartItemPayload) => item.plan);
      console.log("Cart plans",cartPlans)
      const products = await db.collection("products").find({ plan: { $nin: cartPlans } }).toArray();
      return NextResponse.json({ items: products });
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  });
  