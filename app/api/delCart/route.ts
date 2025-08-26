import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { CartItem } from "@/lib/types/cartItem";

interface CartDocument {
  userEmail: string;
  items: Array<CartItem & { id: string }>;
  createdAt?: Date;
}

export const DELETE = withCORS(async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    try {
      const { itemId } = await req.json();
      if (!itemId) {
        return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
      }
  
      const client = await clientPromise;
      const db = client.db("antsq");
      const cartCollection = db.collection<CartDocument>("cart");
  
      const userEmail = session.user.email;
  
      const result = await cartCollection.updateOne(
        { userEmail: userEmail },
        { $pull: { items: { id: itemId } } }
      );
  
      if (result.modifiedCount === 0) {
        return NextResponse.json({ error: "Item not found in cart or cart does not exist" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Item removed successfully" });
    } catch (error) {
      console.error("Error removing from cart:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  });