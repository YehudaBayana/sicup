// app/page.tsx (Homepage)
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to My Spotify App</h1>
      <Link href="/dashboard">
        <button>Go to Dashboard</button>
      </Link>
    </main>
  );
}
