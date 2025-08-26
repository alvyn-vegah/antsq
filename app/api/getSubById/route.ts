import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";


export const GET = withCORS(async (req: NextRequest) => {
    const session = await getServerSession(authOptions);
    const userId = req.nextUrl.searchParams.get("userId");
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const client = await clientPromise;
      const db = client.db("antsq");
      const user = await db.collection("subscriptions").findOne({ _id: new ObjectId(userId?.toString()) });
      if(user) {
        return NextResponse.json({ user });
      } else return NextResponse.json([]);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  });