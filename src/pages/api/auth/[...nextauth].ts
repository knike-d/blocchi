import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

if (
  !process.env.TWITTER_CLIENT_ID ||
  !process.env.TWITTER_CLIENT_SECRET ||
  !process.env.TWITTER_CONSUMER_KEY ||
  !process.env.TWITTER_CONSUMER_SECRET
) {
  throw new Error("Twitter api key does not exist");
}

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CONSUMER_KEY,
      clientSecret: process.env.TWITTER_CONSUMER_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.provider) {
        if (!token[account.provider]) {
          token[account.provider] = {};
        }

        const oauthTokenDetail = token[account.provider] as Partial<Record<"oauthToken" | "oauthTokenSecret", string>>;
        if (account.oauth_token) {
          oauthTokenDetail.oauthToken = account.oauth_token as string;
        }

        if (account.oauth_token_secret) {
          oauthTokenDetail.oauthTokenSecret = account.oauth_token_secret as string;
        }
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
