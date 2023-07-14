import { NextAuthOptions } from "next-auth"
import GithubProvider, { GithubProfile } from "next-auth/providers/github"

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      profile(profile: GithubProfile) {
        return {
          ...profile,
          role: profile.role ?? "user",
          id: profile.id.toString(),
        }
      },
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  pages: { signIn: "/signin" },
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    },
  },
}
