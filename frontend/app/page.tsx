"use client";

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >

      <h1
        style={{
          color: "cyan",
          fontSize: "60px",
        }}
      >
        AI Classroom
      </h1>

      <p
        style={{
          fontSize: "24px",
          color: "#94a3b8",
        }}
      >
        Smart AI platform for students and teachers
      </p>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          gap: "20px",
        }}
      >

        <button
          onClick={() => router.push("/login")}
          style={{
            padding: "15px 30px",
            background: "cyan",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <button
          onClick={() => router.push("/signup")}
          style={{
            padding: "15px 30px",
            background: "#111827",
            color: "white",
            border: "1px solid #334155",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Signup
        </button>

      </div>

    </main>
  );
}