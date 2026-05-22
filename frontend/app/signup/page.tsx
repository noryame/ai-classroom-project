"use client";
import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [
    firstName,
    setFirstName,
  ] = useState("");

  const [
    lastName,
    setLastName,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    image,
    setImage,
  ] = useState<File | null>(null);

  async function uploadImage() {

    if (!image) return "";

    const formData =
      new FormData();

    formData.append(
      "file",
      image
    );

    const res =
      await fetch(
        "http://localhost:3001/auth/upload",
        {
          method: "POST",
          body: formData,
        }
      );

    const data =
      await res.json();

    return data.imageUrl;
  }

  async function signup() {

    try {

      const imageUrl =
        await uploadImage();

      const res =
        await fetch(
          "http://localhost:3001/auth/signup",
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              firstName,
              lastName,
              email,
              password,

              role:
                "student",

              profilePhoto:
                imageUrl,
            }),
          }
        );

      const data =
        await res.json();

      if (
        data.user
      ) {

        localStorage.setItem(
          "studentId",
          data.user.id
            .toString()
        );

        router.push(
          "/login"
        );

      } else {

        alert(
          data.message
        );
      }

    } catch (error) {

      console.log(error);
    }
  }

  return (
    <main
      style={{
        minHeight:
          "100vh",

        background:
          "#020617",

        display:
          "flex",

        justifyContent:
          "center",

        alignItems:
          "center",

        fontFamily:
          "Arial",
      }}
    >

      <div
        style={{
          background:
            "#111827",

          padding:
            "40px",

          borderRadius:
            "25px",

          width:
            "420px",

          display:
            "flex",

          flexDirection:
            "column",

          gap:
            "15px",

          boxShadow:
            "0 0 40px rgba(0,255,255,0.2)",
        }}
      >

        <h1
          style={{
            color:
              "cyan",

            textAlign:
              "center",

            fontSize:
              "40px",
          }}
        >
          AI Classroom
        </h1>

        <p
          style={{
            color:
              "white",

            textAlign:
              "center",
          }}
        >
          Student Registration
        </p>

        <input
          placeholder="First Name"
          onChange={(e) =>
            setFirstName(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          placeholder="Last Name"
          onChange={(e) =>
            setLastName(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          style={inputStyle}
        />

        <label
          style={{
            background:
              "#1e293b",

            padding:
              "15px",

            borderRadius:
              "12px",

            color:
              "white",

            textAlign:
              "center",

            cursor:
              "pointer",
          }}
        >

          Upload Face Photo

          <input
            type="file"

            style={{
              display:
                "none",
            }}

            onChange={(e) => {

              if (
                e.target.files
              ) {

                setImage(
                  e.target
                    .files[0]
                );
              }
            }}
          />
        </label>

        <button
          onClick={signup}
          style={{
            padding:
              "15px",

            border:
              "none",

            borderRadius:
              "12px",

            background:
              "cyan",

            fontWeight:
              "bold",

            cursor:
              "pointer",
          }}
        >
          Create Account
        </button>

        <button
          onClick={() =>
            router.push(
              "/login"
            )
          }

          style={{
            background:
              "transparent",

            border:
              "1px solid cyan",

            color:
              "cyan",

            padding:
              "12px",

            borderRadius:
              "12px",

            cursor:
              "pointer",
          }}
        >
          Already have an account ?
        </button>

      </div>

    </main>
  );
}

const inputStyle = {

  padding:
    "15px",

  border:
    "none",

  borderRadius:
    "12px",

  background:
    "#1e293b",

  color:
    "white",
};