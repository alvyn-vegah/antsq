import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import clientPromise from "@/lib/mongodb";

// GET ai products
export const GET = withCORS(async (req: NextRequest) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  try {
    const client = await clientPromise;
    const db = client.db("antsq");
    const forms = await db.collection("custom-user-requests").find().toArray();
    return NextResponse.json(forms);
  } catch (error) {
    console.error("Error fetching custom forms:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
});