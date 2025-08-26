import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { ObjectId } from "mongodb";

// GET user's cart
export const GET = withCORS(async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  const {searchParams} = new URL(req.url);
  const formId = searchParams.get("formId");
  const objectId = new ObjectId(formId!);
  if (!formId) {
    return NextResponse.json({ error: "No ID is found in query params" }, { status: 401 });
  }
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("antsq");
    const formDetails = await db.collection("custom-user-requests").findOne({ _id:objectId });

    if (!formDetails) {
      return NextResponse.json({ formDetails:{} });
    }

    return NextResponse.json(formDetails);
  } catch (error) {
    console.error("Error fetching form details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
});