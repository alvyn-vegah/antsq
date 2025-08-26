import { NextRequest, NextResponse } from "next/server"
import { withCORS } from "@/lib/cors";;
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export const POST = withCORS(async (req: NextRequest) => {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("antsq"); // Replace with your DB name

    // Check if the user already exists
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      authProvider: "local",
      privilege:"user",
      createdAt: new Date()
    });

    return NextResponse.json({
      message: "User registered successfully",
      userId: result.insertedId
    });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
});
