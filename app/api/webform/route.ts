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
    const { enquiry_on, ...rest } = formData;
    if (!enquiry_on) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('antsq');
    const collection = db.collection('custom-user-requests');

    // Check if the same data already exists (excluding username/usermail)
    const exists = await collection.findOne({ ...rest, enquiry_on, username, usermail });
    if (exists) {
      return NextResponse.json({ message: 'Request already exists' }, { status: 200 });
    }

    // Insert with required fields
    await collection.insertOne({
      ...rest,
      username,
      usermail,
      enquiry_on,
      enquiry: 'custom web development',
    });

    return NextResponse.json({ message: 'Request submitted successfully' }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
});
