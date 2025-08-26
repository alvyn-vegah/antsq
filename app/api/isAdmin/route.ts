import { NextRequest, NextResponse } from 'next/server'
import { withCORS } from "@/lib/cors";
import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export const GET = withCORS(async (req: NextRequest) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ isAdmin: false }, { status: 200 });
    }
    const client = await clientPromise;
    const db = client.db('antsq');
    const user = await db.collection('users').findOne({ email });
    return NextResponse.json({ isAdmin: user?.privilege=="admin" }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
});
