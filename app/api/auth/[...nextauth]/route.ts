import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { connectToDB } from "../../../../lib/db";
import User from "../../../../models/user.model";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, profile }) {
      try {
        await connectToDB();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            gitHubId: user.id,
            name: user.name || (profile as any).login,
            email: user.email,
            avatar: user.image,
          });
        }
        return true;
      } catch (error) {
        console.error("signIn error:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
