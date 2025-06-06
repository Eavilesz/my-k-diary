import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.isAdmin = user.email === process.env.ADMIN_EMAIL;
      }
      return token;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
};

export const { auth, signIn, signOut } = NextAuth(authOptions);
