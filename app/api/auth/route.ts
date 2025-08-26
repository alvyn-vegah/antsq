import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import clientPromise from "@/lib/mongodb";

export const POST = withCORS(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, email, picture } = body;

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(); // optional: pass your db name (e.g., db('agency'))

    const authCollection = db.collection("auth");

    // Check if user exists
    let user = await authCollection.findOne({ email });

    if (!user) {
      await authCollection.insertOne({
        name,
        email,
        picture,
        role: "user",
        savedFiles: [],
        createdAt: new Date(),
      });
    }

    user = await authCollection.findOne({ email });

    return NextResponse.json(
      { role: user?.role, email: user?.email },
      { status: 201 }
    );
  } catch (e) {
    console.error("Error while authenticating", e);
    return NextResponse.json(
      { message: "Error while authenticating" },
      { status: 500 }
    );
  }
});
