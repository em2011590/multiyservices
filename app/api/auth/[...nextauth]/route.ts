// Auth disabled - routes are publicly accessible
// To enable auth in future, restore this file content

export const GET = async () => {
  return new Response('Auth disabled', { status: 503 });
};

export const POST = async () => {
  return new Response('Auth disabled', { status: 503 });
};
