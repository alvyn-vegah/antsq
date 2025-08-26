import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export const POST = withCORS(async (req: NextRequest) => {
  const { email, password } = await req.json();
  const client = await clientPromise;
  const db = client.db("antsq");
  const user = await db.collection("users").findOne({ email });

  if (!user || user.authProvider !== "local") {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Return user object expected by NextAuth
  return NextResponse.json({
    id: user._id,
    email: user.email,
    name: user.name,
  });
});
