"use client";

import { useState } from "react";

export default function StudentsPage() {

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [image, setImage] =
    useState<File | null>(null);

  const [imageUrl, setImageUrl] =
    useState("");

  async function uploadImage() {

    if (!image) return;

    const formData = new FormData();

    formData.append("file", image);

    const res = await fetch(
      "http://localhost:3001/auth/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    setImageUrl(data.imageUrl);

    return data.imageUrl;
  }

  async function createStudent() {

    let uploadedImageUrl = imageUrl;

    if (image && !imageUrl) {

      uploadedImageUrl =
        await uploadImage();
    }

    const res = await fetch(
      "http://localhost:3001/auth/signup",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role: "student",
          profilePhoto:
            uploadedImageUrl,
        }),
      }
    );

    const data = await res.json();

    alert(data.message);
  }

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
          fontSize: "50px",
        }}
      >
        Students Management
      </h1>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          gap: "50px",
        }}
      >

        {/* FORM */}

        <div
          style={{
            background: "#111827",
            padding: "30px",
            borderRadius: "20px",
            width: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >

          <input
            placeholder="First name"
            onChange={(e) =>
              setFirstName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            placeholder="Last name"
            onChange={(e) =>
              setLastName(e.target.value)
            }
            style={inputStyle}
          />

          <input
            placeholder="Email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={inputStyle}
          />

          <label
  style={{
    background: "#1e293b",
    padding: "20px",
    borderRadius: "12px",
    cursor: "pointer",
    textAlign: "center",
  }}
>

  Upload Student Photo

  <input
    type="file"

    style={{
      display: "none",
    }}

    onChange={(e) => {

      if (e.target.files) {

        setImage(
          e.target.files[0]
        );
      }
    }}
  />

</label>

          <button
            onClick={createStudent}
            style={buttonStyle}
          >
            Create Student
          </button>

        </div>

        {/* PREVIEW */}

        <div
          style={{
            background: "#111827",
            padding: "30px",
            borderRadius: "20px",
            width: "350px",
          }}
        >

          <h2
            style={{
              color: "cyan",
            }}
          >
            Student Preview
          </h2>

          <div
            style={{
              marginTop: "30px",
            }}
          >

            {image && (

              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                width={250}
                height={250}
                style={{
                  borderRadius: "20px",
                  objectFit: "cover",
                }}
              />
            )}

            <h3
              style={{
                marginTop: "20px",
              }}
            >
              {firstName} {lastName}
            </h3>

            <p>{email}</p>

          </div>

        </div>

      </div>

    </main>
  );
}

const inputStyle = {
  padding: "15px",
  borderRadius: "10px",
  border: "none",
};

const buttonStyle = {
  padding: "15px",
  background: "cyan",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
};