"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main style={{ textAlign: "center", marginTop: "100px" }}>
      {!session ? (
        <>
          <h1>Welcome Stranger 👋</h1>
          <button
            onClick={() => signIn("github")}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Sign in with GitHub
          </button>
        </>
      ) : (
        <>
          <h1>Welcome, {session.user?.name} 😎</h1>
          <img
            src={session.user?.image ?? ""}
            alt="avatar"
            style={{ borderRadius: "50%", width: "100px", margin: "20px" }}
          />
          <p>{session.user?.email}</p>
          <button
            onClick={() => signOut()}
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Sign out
          </button>
        </>
      )}
    </main>
  );
}
