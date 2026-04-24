import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import connectToDatabase from './mongodb';
import User from '@/models/User';
import { authConfig } from './auth.config';

/**
 * Full auth config — runs in Node.js runtime only (API routes, server components).
 * Extends the Edge-safe authConfig with the Credentials provider that uses bcrypt.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers,
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.passwordHash) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.avatar,
        };
      },
    }),
  ],
});
