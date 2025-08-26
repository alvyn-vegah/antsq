import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export const PATCH = withCORS(async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const { itemId, quantity } = await req.json();
      if (!itemId || typeof quantity !== 'number') {
        return NextResponse.json({ error: "Item ID and quantity are required" }, { status: 400 });
      }
      const client = await clientPromise;
      const db = client.db("antsq");
      const cartCollection = db.collection("cart");
      const userEmail = session.user.email;
      const result = await cartCollection.updateOne(
        { userEmail: userEmail, "items.id": itemId },
        { $set: { "items.$.quantity": quantity } }
      );
      if (result.modifiedCount === 0) {
        return NextResponse.json({ error: "Item not found or quantity not updated" }, { status: 404 });
      }
      return NextResponse.json({ message: "Quantity updated successfully" });
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  });