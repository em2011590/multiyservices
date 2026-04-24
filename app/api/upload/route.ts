import { NextRequest, NextResponse } from 'next/server';
import { uploadAssetInfo } from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to base64 for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;

    const result = await uploadAssetInfo(base64Data, 'devsphere_uploads');

    return NextResponse.json({ url: result.secure_url, publicId: result.public_id, format: result.format, size: result.bytes }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
