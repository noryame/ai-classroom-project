"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

export default function DashboardPage() {

  const [attendances, setAttendances] =
    useState<any[]>([]);

  async function fetchAttendances() {

    try {

      const res = await fetch(
        "http://localhost:3001/auth/attendances"
      );

      const data = await res.json();

      if (!Array.isArray(data)) return;

      const uniqueStudents =
        Object.values(

          data.reduce(
            (
              acc: any,
              item: any
            ) => {

              acc[
                item.studentId
              ] = item;

              return acc;

            },
            {}
          )
        );

      setAttendances(
        uniqueStudents as any[]
      );

    } catch (error) {

      console.log(error);
    }
  }

  useEffect(() => {

    fetchAttendances();

    const interval =
      setInterval(
        fetchAttendances,
        5000
      );

    return () =>
      clearInterval(interval);

  }, []);

  const totalStudents =
    attendances.length;

  const presentStudents =
    attendances.filter(
      (a) => a.present
    ).length;

  const averageFocus =
    attendances.length > 0

      ? Math.floor(

          attendances.reduce(
            (
              acc,
              item
            ) =>

              acc +
              item.focusScore,

            0
          ) /
          attendances.length
        )

      : 0;

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
        Professor Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >

        <DashboardCard
          title="Students"
          value={
            totalStudents
          }
          color="cyan"
        />

        <DashboardCard
          title="Present"
          value={
            presentStudents
          }
          color="lime"
        />

        <DashboardCard
          title="Average Focus"
          value={
            averageFocus + "%"
          }
          color="orange"
        />

      </div>

      <h2
        style={{
          marginTop: "50px",
          color: "cyan",
        }}
      >
        Students Analysis
      </h2>

      <div
        style={{
          marginTop: "30px",
          display: "grid",

          gridTemplateColumns:
            "repeat(auto-fill, minmax(350px, 1fr))",

          gap: "20px",
        }}
      >

        {attendances.map(
          (item: any) => (

            <div
              key={item.id}

              style={{
                background:
                  "#111827",

                padding:
                  "25px",

                borderRadius:
                  "25px",

                border:
                  "1px solid #1e293b",
              }}
            >

              <div
                style={{
                  display:
                    "flex",

                  gap:
                    "20px",

                  alignItems:
                    "center",
                }}
              >

                <img
              src={
                item.student
                  ?.profilePhoto ||

                "http://localhost:3001/uploads/default.png"
              }

              alt="student"

              width={100}

              height={100}

              style={{
                borderRadius:
                  "50%",

                objectFit:
                  "cover",
              }}
            />

                <div>

                  <h2>
                    {
                      item.student
                        ?.firstName
                    }
                    {" "}
                    {
                      item.student
                        ?.lastName
                    }
                  </h2>

                  <p>
                    {
                      item.student
                        ?.email
                    }
                  </p>

                  <p
                    style={{
                      color:
                        item.present
                          ? "lime"
                          : "red",
                    }}
                  >

                    {
                      item.present
                        ? "Present"
                        : "Absent"
                    }

                  </p>

                </div>

              </div>

              <div
                style={{
                  marginTop:
                    "25px",

                  display:
                    "flex",

                  flexDirection:
                    "column",

                  gap:
                    "15px",
                }}
              >

                <ProgressBar
                  label="Focus"

                  value={
                    item.focusScore
                  }

                  color="lime"
                />

                <ProgressBar
                  label="Distracted"

                  value={
                    item.distractionScore
                  }

                  color="orange"
                />

                <ProgressBar
                  label="Talking"

                  value={
                    item.talkingScore
                  }

                  color="red"
                />

              </div>

            </div>
          )
        )}

      </div>

      <h2
        style={{
          marginTop: "60px",
          color: "cyan",
        }}
      >
        Live AI Monitor
      </h2>

      <iframe
        src="/ai-monitor"

        width="100%"

        height="700"

        style={{
          border:
            "none",

          borderRadius:
            "25px",

          marginTop:
            "20px",
        }}
      />

    </main>
  );
}

function DashboardCard({

  title,
  value,
  color,

}: any) {

  return (

    <div
      style={{
        background:
          "#111827",

        padding:
          "25px",

        borderRadius:
          "20px",

        width:
          "250px",
      }}
    >

      <h3
        style={{
          color,
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          fontSize:
            "45px",
        }}
      >
        {value}
      </h1>

    </div>
  );
}

function ProgressBar({

  label,
  value,
  color,

}: any) {

  return (

    <div>

      <div
        style={{
          display:
            "flex",

          justifyContent:
            "space-between",
        }}
      >

        <span>
          {label}
        </span>

        <span>
          {value}%
        </span>

      </div>

      <div
        style={{
          height:
            "12px",

          background:
            "#1e293b",

          borderRadius:
            "20px",

          marginTop:
            "6px",
        }}
      >

        <div
          style={{
            width:
              `${value}%`,

            height:
              "100%",

            background:
              color,

            borderRadius:
              "20px",
          }}
        />

      </div>

    </div>
  );
}