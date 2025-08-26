import { NextRequest, NextResponse } from 'next/server'
import { withCORS } from "@/lib/cors";;
import clientPromise from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export const POST = withCORS(async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);
    const usermail = session?.user?.email;
    const username = session?.user?.name;
    if (!usermail || !username) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.json();
    const formDataPayload = {...formData,username,usermail}

    const client = await clientPromise;
    const db = client.db('antsq');
    const collection = db.collection('contact-forms');

    // Check if the same data already exists (excluding username/usermail)
    const exists = await collection.findOne({ usermail });
    if (exists) {
      return NextResponse.json({ message: 'Form already exists' }, { status: 200 });
    }

    // Insert with required fields
    await collection.insertOne(formDataPayload);

    return NextResponse.json({ message: 'Request submitted successfully' }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
