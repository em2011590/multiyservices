import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, mode } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1]?.content || '';
    const lowerMessage = lastMessage.toLowerCase();

    // Intelligent AI response based on user input
    let aiResponse = '';

    // Code Analysis & Debugging
    if (lowerMessage.includes('fix') || lowerMessage.includes('error') || lowerMessage.includes('bug')) {
      aiResponse = "🔧 **Debugging Assistant**\n\nI see you're looking for help with an error. Here's my approach:\n\n1. **Identify the Error**: What's the error message you're seeing?\n2. **Check the Stack Trace**: Look for the file name and line number\n3. **Review Recent Changes**: What did you modify before the error?\n4. **Test in Isolation**: Try running just the problematic code\n\n💡 **Pro Tip**: Share the error message and relevant code snippet for more specific help!";
    } else if (lowerMessage.includes('code review') || lowerMessage.includes('review')) {
      aiResponse = "📋 **Code Review Checklist**\n\n✅ **Performance**\n- Check for unnecessary loops\n- Optimize database queries\n- Minimize re-renders\n\n✅ **Security**\n- Validate user input\n- Sanitize outputs\n- Check authentication\n\n✅ **Readability**\n- Use meaningful variable names\n- Add comments for complex logic\n- Follow consistent formatting\n\n✅ **Testing**\n- Add unit tests\n- Test edge cases\n- Include error handling\n\nShare your code and I'll give specific feedback!";
    } else if (lowerMessage.includes('optimize') || lowerMessage.includes('performance')) {
      aiResponse = "⚡ **Performance Optimization Tips**\n\n**Frontend:**\n- Use code splitting & lazy loading\n- Minimize bundle size\n- Optimize images\n- Enable caching\n\n**Backend:**\n- Use database indexes\n- Implement caching (Redis)\n- Batch database queries\n- Use async/await efficiently\n\n**General:**\n- Profile your code\n- Monitor network requests\n- Use CDNs for static files\n\nWhat specific performance issue are you facing?";
    } else if (lowerMessage.includes('regex') || lowerMessage.includes('pattern')) {
      aiResponse = "🔍 **Regular Expression Helper**\n\nCommon patterns:\n\n**Email**: `/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/`\n**URL**: `/^https?:\\/\\/.+/`\n**Phone**: `/^\\+?[\\d\\s-()]{7,}$/`\n**Hex Color**: `/^#(?:[0-9a-fA-F]{3}){1,2}$/`\n**Alphanumeric**: `/^[a-zA-Z0-9]+$/`\n\nDescribe the pattern you need, and I'll help you create it!";
    } else if (lowerMessage.includes('translate') || lowerMessage.includes('convert')) {
      aiResponse = "🔄 **Code Translation Guide**\n\nOur services support:\n- **JavaScript** ↔ **TypeScript**\n- **Python** ↔ **JavaScript**\n- **Java** ↔ **C++**\n- **And 12+ more languages**\n\nTo translate code:\n1. Go to Code Translator in Dashboard\n2. Select source language\n3. Select target language\n4. Paste your code\n5. Review the converted syntax\n\nWant help with a specific conversion?";
    } else if (lowerMessage.includes('api') || lowerMessage.includes('endpoint')) {
      aiResponse = "🔌 **API Explorer Guide**\n\n**Features:**\n- Build HTTP requests visually\n- Save favorite endpoints\n- View response history\n- Test authentication headers\n- Validate JSON responses\n\n**Common HTTP Methods:**\n- `GET` - Fetch data\n- `POST` - Create resource\n- `PUT` - Update entire resource\n- `PATCH` - Partial update\n- `DELETE` - Remove resource\n\nNeed help building an API request?";
    } else if (lowerMessage.includes('deploy') || lowerMessage.includes('production')) {
      aiResponse = "🚀 **Deployment Checklist**\n\n✅ **Pre-Deployment**\n- Run tests (unit & integration)\n- Check environment variables\n- Build in production mode\n- Audit dependencies\n\n✅ **Security**\n- Enable HTTPS\n- Set security headers\n- Implement rate limiting\n- Validate all inputs\n\n✅ **Monitoring**\n- Set up error tracking\n- Monitor performance\n- Configure alerts\n- Enable logging\n\nWhat platform are you deploying to?";
    } else if (lowerMessage.includes('search') || lowerMessage.includes('npm') || lowerMessage.includes('github')) {
      aiResponse = "🔎 **Deep Search Guide**\n\n**Search NPM Packages:**\n- Find packages by name/keywords\n- Check version history\n- View downloads & popularity\n- Read documentation\n\n**Search GitHub:**\n- Find open-source projects\n- Explore code examples\n- Review issues & PRs\n- Check stars & activity\n\n**Tips:**\n- Use specific keywords\n- Filter by language\n- Sort by relevance\n- Check maintenance status\n\nWhat are you looking for?";
    } else if (lowerMessage.includes('json') || lowerMessage.includes('yaml') || lowerMessage.includes('xml')) {
      aiResponse = "📦 **Format Converter Reference**\n\n**Supported Formats:**\n- JSON - Lightweight data format\n- YAML - Human-readable markup\n- XML - Structured data\n- CSV - Comma-separated values\n- TOML - Configuration files\n\n**JSON to YAML**\n```json\n{\"name\": \"John\", \"age\": 30}\n```\nBecomes:\n```yaml\nname: John\nage: 30\n```\n\nPaste your data and select format!";
    } else if (lowerMessage.includes('how') || lowerMessage.includes('what') || lowerMessage.includes('help')) {
      aiResponse = "👋 **Welcome to DevSphere AI Assistant!**\n\nI can help you with:\n\n📝 **Code Analysis** - Review, debug, and optimize code\n🔄 **Code Translation** - Convert between 15+ languages\n🔎 **Deep Search** - Find NPM packages & GitHub repos\n🔌 **API Help** - Build and test REST APIs\n📦 **Format Conversion** - Convert JSON, YAML, XML, etc.\n🚀 **DevOps Tips** - Deployment & performance advice\n\nJust ask me anything about development!";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage === '') {
      aiResponse = "👋 **Hello! I'm your DevSphere AI Assistant.**\n\nI'm here to help you with:\n- Coding questions & debugging\n- Code reviews & optimization\n- API design & testing\n- Language translation\n- Data format conversion\n- Development best practices\n\n💡 Try asking me about any development topic or share code for analysis!";
    } else {
      // Default intelligent response
      aiResponse = `🤖 **AI Assistant Response**\n\nYour Question: "${lastMessage}"\n\nI'm analyzing your request...\n\n💡 **Suggestions:**\n- Share code snippets for better analysis\n- Describe the problem in detail\n- Include error messages if applicable\n- Specify what language/framework you're using\n\n**I can help with:**\n✓ Debugging & fixing errors\n✓ Code reviews & optimization\n✓ API development & testing\n✓ Language translation\n✓ Best practices & architecture\n\nWhat would you like help with?`;
    }

    return NextResponse.json({
      role: 'assistant',
      content: aiResponse,
      mode: mode || 'chat'
    }, { status: 200 });
  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { 
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please try again.' 
      }, 
      { status: 500 }
    );
  }
}
