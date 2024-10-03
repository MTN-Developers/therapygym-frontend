import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import axios from "axios";
import { User } from "@/interfaces"; // Your custom User interface

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        const { email, password } = credentials;
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
            { email, password }
          );
          const { status, data } = response;
          // console.log(data);
          if (status === 200) {
            const {
              id,
              email,
              name,
              phone,
              work,
              city,
              nationality,
              birthdate,
            } = data.user;
            const user: User = {
              id,
              email,
              name,
              phone,
              work,
              city,
              nationality,
              birthdate,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
              expiresAt: data.expires_at,
            };
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
