import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ServiceHistory from '@/models/ServiceHistory';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const history = await ServiceHistory.find({ userId: session.user.id }).sort({ createdAt: -1 }).limit(20);

    return NextResponse.json({ history }, { status: 200 });
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
    const { serviceType, inputSnapshot, outputSnapshot } = body;

    await connectToDatabase();
    const historyEntry = new ServiceHistory({
      userId: session.user.id,
      serviceType,
      inputSnapshot,
      outputSnapshot,
    });

    await historyEntry.save();
    return NextResponse.json({ entry: historyEntry }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
