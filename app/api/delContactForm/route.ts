import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { ObjectId } from "mongodb";

export const DELETE = withCORS(async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    const {id} = await req.json();
    const objectId = new ObjectId(id as string);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const client = await clientPromise;
      const db = client.db("antsq");
      const formCollection = db.collection("contact-forms");
      const result = await formCollection.deleteOne({
        _id:objectId
    });
      if (!result.acknowledged) {
        return NextResponse.json({ error: "Not able to delete the item" }, { status: 404 });
      }
      return NextResponse.json({ message: "Quantity updated successfully" });
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  });