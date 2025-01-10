// app/page.tsx
"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { getAuthUrl } from "../utils/functions";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      <h1>Welcome to My Spotify App</h1>
      <div>
        {!session ? (
          <button
            onClick={() => signIn("spotify")}
            aria-label="Login with Spotify"
          >
            Login with Spotify
          </button>
        ) : (
          <>
            <p>Welcome, {session.user?.name}</p>
            <Link href="/dashboard">
              <button aria-label="Go to Dashboard">Go to playlists</button>
            </Link>
            <Link href="/me">
              <button aria-label="Go to Dashboard">Go to me</button>
            </Link>
            <button onClick={() => signOut()} aria-label="Logout">
              Logout
            </button>
            <button onClick={() => signOut()} aria-label="Logout">
              Logout
            </button>
          </>
        )}
      </div>
    </main>
  );
}
