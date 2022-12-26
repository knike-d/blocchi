import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, getSession } from "next-auth/react";
import { useState } from "react";

const Home: NextPage = ({ session }: any) => {
  const [myTweets, setMyTweets] = useState<string[]>([]);

  async function submitTweet(event: any) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const tweetText = formData.get("tweet");

    const results = await fetch("/api/twitter/tweet", {
      method: "POST",
      body: JSON.stringify({
        tweetText,
      }),
    }).then((res) => res.json());

    setMyTweets([results.data.tweetText, myTweets]);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Blocchi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        {session ? (
          <>
            <p>Signed in as {session.user?.name}</p>
            <button className="rounded border p-2" onClick={() => signOut()}>
              Twitter ログアウト
            </button>
          </>
        ) : (
          <button className="rounded border p-2" onClick={() => signIn("twitter")}>
            Twitter ログイン
          </button>
        )}

        <form onSubmit={submitTweet}>
          <div className="border">
            <textarea name="tweet" />
          </div>
          <button type="submit" className="rounded border p-2">
            ツイートする
          </button>
        </form>

        {myTweets && (
          <ul>
            {myTweets.map((myTweet, index) => {
              return (
                <li key={`my-tweet-${index}`}>
                  <p>{myTweet}</p>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}

export default Home;
