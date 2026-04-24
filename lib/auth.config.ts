import type { NextAuthConfig } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

/**
 * Edge-compatible auth config — NO bcrypt, NO mongoose imports.
 * This file is safe to be bundled into the Edge Runtime (middleware).
 * The Credentials provider with bcrypt lives only in lib/auth.ts (Node.js runtime).
 */
export const authConfig: NextAuthConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Allow all access - no authentication required
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: { strategy: 'jwt' },
};
