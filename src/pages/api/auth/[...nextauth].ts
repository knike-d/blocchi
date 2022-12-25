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
    async jwt({ token, user, account = {}, profile, isNewUser }) {
      if (account.provider && !token[account.provider]) {
        token[account.provider] = {};
      }

      if (account.oauth_token) {
        token[account.provider].oauthToken = account.oauth_token;
      }

      if (account.oauth_token_secret) {
        token[account.provider].oauthTokenSecret = account.oauth_token_secret;
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
