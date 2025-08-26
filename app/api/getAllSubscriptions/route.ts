import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";


export const GET = withCORS(async (req: NextRequest) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const client = await clientPromise;
      const db = client.db("antsq");
      const subscribers = await db.collection("subscriptions").find().toArray();
        return NextResponse.json(subscribers);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  });