import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get('query');
    const platform = url.searchParams.get('platform') || 'github';

    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    let results = [];

    // Mock search logic per requirements for a generic interface
    if (platform === 'github') {
      const resp = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&per_page=10`);
      const data = await resp.json();
      results = data.items?.map((item: any) => ({
        id: item.id,
        title: item.full_name,
        description: item.description,
        url: item.html_url,
        stars: item.stargazers_count,
        platform: 'GitHub'
      })) || [];
    } else if (platform === 'npm') {
      const resp = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=10`);
      const data = await resp.json();
      results = data.objects?.map((obj: any) => ({
        id: obj.package.name,
        title: obj.package.name,
        description: obj.package.description,
        url: obj.package.links.npm,
        platform: 'NPM'
      })) || [];
    } else {
      // Generic mock fallback
      results = Array.from({ length: 5 }).map((_, i) => ({
        id: `${platform}-${i}`,
        title: `${platform} Result ${i + 1} for "${query}"`,
        description: `This is a simulated search result for the ${platform} API.`,
        url: '#',
        platform: platform.charAt(0).toUpperCase() + platform.slice(1)
      }));
    }

    return NextResponse.json({ results }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
