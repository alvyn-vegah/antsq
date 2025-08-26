import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";


export async function GET() {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const client = await clientPromise;
      const db = client.db("antsq");
      const user = await db.collection("subscriptions").findOne({ email: session?.user?.email });
      if(user) {
        return NextResponse.json({ subscriptions:user.subscriptions });
      } else return NextResponse.json([]);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }