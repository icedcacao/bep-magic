import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import User from "~/server/models/user.schema";

// Need to add session role authentication
export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: "/admin/signin",
  },
  providers: [
    CredentialsProvider.default({
      async authorize(credentials: any) {
        const user = await User.findOne({ username: credentials?.username });
        if (
          credentials?.username === user?.username &&
          credentials?.password === user?.password
        ) {
          return {
            name: user?.username,
            role: user?.role,
          };
        } else {
          console.error(
            "Warning: Malicious login attempt registered, bad credentials provided",
          );
          return null;
        }
      },
    }),
  ],
});
