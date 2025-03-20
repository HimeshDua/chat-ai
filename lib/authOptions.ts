// /lib/authOptions.ts
import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { connectToDB } from "./db";
import User from "../models/user.model";

// Create a custom interface for GitHub profile data
interface GitHubProfile {
  login: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Let NextAuth infer the types automatically by not manually annotating the parameters.
    async signIn({ user, profile }) {
      try {
        await connectToDB();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            gitHubId: user.id,
            // Use user.name if available; otherwise fall back to profile.login from GitHub.
            name: user.name || (profile as GitHubProfile)?.login,
            email: user.email,
            avatar: user.image,
          });
        }
        return true;
      } catch (error) {
        console.error("Error during signIn callback:", error);
        return false;
      }
    },
  },
};
