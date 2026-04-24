import { NextRequest, NextResponse } from 'next/server';
import { validateBody } from '@/lib/validators';
import { translateSchema } from '@/schemas/translate.schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = validateBody(translateSchema, body);

    if (error) {
      return NextResponse.json({ error: 'Validation failed', details: error }, { status: 400 });
    }

    const { code, sourceLang, targetLang } = data!;

    // Here we'd call OpenAI API. We use a mock response per requirements for a working demo.
    const mockOutput = `// Translated from ${sourceLang} to ${targetLang}\n\n${code}`;
    
    // We return a mock AST as well, for the 3D visualizer
    const ast = [
      { id: '1', type: 'Function', label: 'main' },
      { id: '2', type: 'Variable', label: 'x' },
      { id: '3', type: 'Import', label: 'utils' }
    ];
    
    const edges = [
      { source: '1', target: '2' },
      { source: '3', target: '1' }
    ];

    return NextResponse.json({ translatedCode: mockOutput, ast: { nodes: ast, edges } }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
