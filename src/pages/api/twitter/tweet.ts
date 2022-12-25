import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import TwitterApi from "twitter-api-v2";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.TWITTER_CONSUMER_KEY || !process.env.TWITTER_CONSUMER_SECRET) {
    throw new Error("Twitter api key does not exist");
  }

  const session = await getSession({ req });
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: token.twitter.oauthToken,
    accessSecret: token.twitter.oauthTokenSecret,
  });

  const body = JSON.parse(req.body);
  const { tweetText } = body;

  try {
    const result = await client.v1.tweet(tweetText);
    return res.status(200).json({
      status: "ok",
      data: {
        tweetText: result.full_text,
      },
    });
  } catch (e) {
    return res.status(400).json({
      status: e.message,
    });
  }
};
