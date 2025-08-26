import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import clientPromise from "@/lib/mongodb";

// GET ai products
export const GET = withCORS(async (req: NextRequest) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  try {
    const client = await clientPromise;
    const db = client.db("antsq");
    const products = await db.collection("products").find().toArray();
    const aiProducts = await db.collection("ai-products").find().toArray();
    const allProducts = [...products,...aiProducts];
    return NextResponse.json(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
});