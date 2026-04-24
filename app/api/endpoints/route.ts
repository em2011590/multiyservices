import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import SavedEndpoint from '@/models/SavedEndpoint';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const endpoints = await SavedEndpoint.find({ userId: session.user.id }).sort({ createdAt: -1 });

    return NextResponse.json({ endpoints }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    
    await connectToDatabase();
    const newEndpoint = new SavedEndpoint({
      ...body,
      userId: session.user.id,
    });

    await newEndpoint.save();
    return NextResponse.json({ endpoint: newEndpoint }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
