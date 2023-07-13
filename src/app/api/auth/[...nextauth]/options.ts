import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  pages: { signIn: "/signin" },
}
