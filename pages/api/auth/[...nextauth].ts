import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  // your configs
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      return session;
    },
  },
};

export default NextAuth(authOptions);
