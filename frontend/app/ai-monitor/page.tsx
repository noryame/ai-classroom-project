"use client";

import * as faceapi from "face-api.js";

import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function AIMonitorPage() {

  const videoRef =
    useRef<HTMLVideoElement>(null);

  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  const [status, setStatus] =
    useState("Loading AI...");

  const [attentionScore, setAttentionScore] =
    useState(100);

  const [isPresent, setIsPresent] =
    useState(false);

  const [faceCount, setFaceCount] =
    useState(0);

  const [focusScore, setFocusScore] =
    useState(70);

  const [distractionScore,
    setDistractionScore] =
    useState(20);

  const [talkingScore,
    setTalkingScore] =
    useState(10);

  const [lastSave, setLastSave] =
    useState(Date.now());

  async function loadModels() {

    const MODEL_URL = "/models";

    await faceapi.nets.tinyFaceDetector
      .loadFromUri(MODEL_URL);

    await faceapi.nets.faceLandmark68Net
      .loadFromUri(MODEL_URL);

    setStatus(
      "AI Models Loaded"
    );
  }

  async function startVideo() {

    const stream =
      await navigator.mediaDevices
        .getUserMedia({
          video: true,
        });

    if (videoRef.current) {

      videoRef.current.srcObject =
        stream;
    }
  }

  async function detectFaces() {

    if (
      !videoRef.current ||
      !canvasRef.current
    ) return null;

    const detections =
      await faceapi
        .detectAllFaces(
          videoRef.current,
          new faceapi
            .TinyFaceDetectorOptions(),
        )
        .withFaceLandmarks();

    const detected =
      detections.length > 0;

    setFaceCount(
      detections.length
    );

    setIsPresent(
      detected
    );

    let randomFocus = 0;

    let randomDistracted = 0;

    let randomTalking = 0;

    if (detected) {

      setAttentionScore((prev) =>
        Math.min(prev + 0.5, 100)
      );

      randomFocus =
        Math.floor(
          60 + Math.random() * 30
        );

      randomDistracted =
        Math.floor(
          Math.random() * 25
        );

      randomTalking =
        100 -
        randomFocus -
        randomDistracted;

    } else {

      setAttentionScore((prev) =>
        Math.max(prev - 5, 0)
      );

      randomFocus = 0;

      randomDistracted = 50;

      randomTalking = 50;
    }

    setFocusScore(
      randomFocus
    );

    setDistractionScore(
      randomDistracted
    );

    setTalkingScore(
      randomTalking
    );

    const canvas =
      canvasRef.current;

    const videoWidth =
      videoRef.current.videoWidth;

    const videoHeight =
      videoRef.current.videoHeight;

    if (
      videoWidth === 0 ||
      videoHeight === 0
    ) {
      return null;
    }

    const displaySize = {

      width: videoWidth,

      height: videoHeight,
    };

    faceapi.matchDimensions(
      canvas,
      displaySize,
    );

    const resized =
      faceapi.resizeResults(
        detections,
        displaySize,
      );

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return null;

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height,
    );

    faceapi.draw.drawDetections(
      canvas,
      resized,
    );

    faceapi.draw.drawFaceLandmarks(
      canvas,
      resized,
    );

    return {

      detected,

      focusScore:
        randomFocus,

      distractionScore:
        randomDistracted,

      talkingScore:
        randomTalking,
    };
  }

  async function saveAttendance(
    analysis: any
  ) {

    if (!analysis) return;

    try {

      await fetch(
        "http://localhost:3001/auth/attendance",
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            studentId:
              Number(
                localStorage.getItem(
                  "studentId"
                )
              ),

            attentionScore,

            present:
              analysis.detected,

            focusScore:
              analysis.focusScore,

            distractionScore:
              analysis.distractionScore,

            talkingScore:
              analysis.talkingScore,
          }),
        }
      );

    } catch (error) {

      console.log(error);
    }
  }

  useEffect(() => {

    let interval: any;

    async function init() {

      try {

        await loadModels();

        await startVideo();

        interval = setInterval(
          async () => {

            if (
              videoRef.current &&
              videoRef.current.readyState === 4
            ) {

              const analysis =
                await detectFaces();

              if (!analysis)
                return;

              if (
                Date.now() -
                lastSave >
                15000
              ) {

                await saveAttendance(
                  analysis
                );

                setLastSave(
                  Date.now()
                );
              }
            }

          },
          300
        );

      } catch (error) {

        console.log(error);
      }
    }

    init();

    return () => {

      if (interval)
        clearInterval(interval);
    };

  }, [lastSave, attentionScore]);

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
        AI Classroom Monitor
      </h1>

      <p>{status}</p>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >

        <Card
          title="Presence"
          value={
            isPresent
              ? "Present"
              : "Absent"
          }
          color={
            isPresent
              ? "lime"
              : "red"
          }
        />

        <Card
          title="Faces"
          value={faceCount}
          color="cyan"
        />

        <Card
          title="Attention"
          value={
            Math.round(
              attentionScore
            ) + "%"
          }
          color="orange"
        />

        <Card
          title="Focus"
          value={
            focusScore + "%"
          }
          color="lime"
        />

        <Card
          title="Distracted"
          value={
            distractionScore + "%"
          }
          color="orange"
        />

        <Card
          title="Talking"
          value={
            talkingScore + "%"
          }
          color="red"
        />

      </div>

      <div
        style={{
          position: "relative",
          width: "720px",
          marginTop: "40px",
        }}
      >

        <video
          ref={videoRef}
          autoPlay
          muted
          width="720"
          height="560"
          style={{
            borderRadius: "20px",
            border:
              "3px solid cyan",
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

      </div>

    </main>
  );
}

function Card({
  title,
  value,
  color,
}: any) {

  return (

    <div
      style={{
        background: "#111827",
        padding: "20px",
        borderRadius: "15px",
        width: "220px",
      }}
    >

      <h3>{title}</h3>

      <p
        style={{
          color,
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        {value}
      </p>

    </div>
  );
}