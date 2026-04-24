import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url, method, headers, body } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const options: RequestInit = {
      method: method || 'GET',
      headers: headers || {},
    };

    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      options.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const response = await fetch(url, options);
    
    // We try to parse JSON, if it fails, read as text
    const contentType = response.headers.get("content-type");
    let responseData;
    if (contentType && contentType.indexOf("application/json") !== -1) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
      data: responseData,
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
