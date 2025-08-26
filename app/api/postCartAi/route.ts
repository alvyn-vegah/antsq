import { NextRequest, NextResponse } from 'next/server'
import { withCORS } from "@/lib/cors";;
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import clientPromise from '@/lib/mongodb';

export const POST = withCORS(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Product id is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("antsq");
    const cartCollection = db.collection("cart");
    const aiProductsCollection = db.collection("ai-products");

    const userEmail = session.user.email;

    // Find the AI product by id
    const product = await aiProductsCollection.findOne({id});
    if (!product) {
      return NextResponse.json({ error: "AI Product not found" }, { status: 404 });
    }

    // Add the AI product to the user's cart
    const result = await cartCollection.findOneAndUpdate(
      { userEmail: userEmail },
      {
        $addToSet: { items: product }, // Use $addToSet to avoid duplicate items
        $setOnInsert: { userEmail: userEmail, createdAt: new Date() }
      },
      {
        upsert: true, // Create the document if it doesn't exist
        returnDocument: "after"
      }
    );

    let doc = result?.value;
    if (!doc) {
      doc = await cartCollection.findOne({ userEmail: userEmail });
    }
    if (!doc) {
      return NextResponse.json({ error: "No document found" }, { status: 404 });
    }
    return NextResponse.json(JSON.parse(JSON.stringify(doc)));
  } catch (error) {
    console.error("Error adding AI product to cart:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
});
