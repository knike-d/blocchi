import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, getSession } from "next-auth/react";

const Home: NextPage = ({ session }) => {
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
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}

export default Home;
