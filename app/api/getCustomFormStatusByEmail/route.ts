import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";

// GET user's cart
export const GET = withCORS(async (req: NextRequest) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("antsq");
    const form = await db.collection("custom-user-requests").findOne({ sessionUserEmail: session?.user?.email });
    if (!form) {
      return NextResponse.json({ canSubmit:true });
    } else return NextResponse.json({canSubmit:false});
  } catch (error) {
    console.error("Error reviewing form status", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
});