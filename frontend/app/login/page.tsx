"use client";

import { useState } from "react";

export default function LoginPage() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function login() {

    const res = await fetch(
      "http://localhost:3001/auth/login",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    console.log(data);

    if (data.message === "Connexion réussie") {
  window.location.href = "/dashboard";
}
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >

      <div
        style={{
          background: "#111827",
          padding: "40px",
          borderRadius: "20px",
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >

        <h1
          style={{
            color: "cyan",
            fontSize: "40px",
          }}
        >
          Login
        </h1>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "15px",
            borderRadius: "10px",
            border: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "15px",
            borderRadius: "10px",
            border: "none",
          }}
        />

<button
  onClick={() => {
    console.log("CLICK");
    login();
  }}
  style={{
    padding: "15px",
    background: "cyan",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
  Login
</button>

      </div>

    </main>
  );
}