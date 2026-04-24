import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() }, { status: 200 });
}
