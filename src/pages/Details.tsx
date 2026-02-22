// Details.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Employee data passed from List page
  const employee = location.state;

  // Start camera safely
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Wait for video metadata to load
        await new Promise<void>((resolve) => {
          videoRef.current!.onloadedmetadata = () => {
            videoRef.current!.play();
            resolve();
          };
        });
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  // Capture photo and navigate
  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return alert("Video not ready");

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL("image/png");

    // Stop camera
    const stream = video.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());

    navigate("/photo", { state: image });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-start">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-dark mb-4">{employee.name}</h2>

        <p className="mb-2"><strong>Salary:</strong> ₹ {employee.salary}</p>
        <p className="mb-4"><strong>City:</strong> {employee.city}</p>

        <button
          onClick={startCamera}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl mt-4 hover:opacity-90 transition"
        >
          🎥 Start Camera
        </button>

        <video
          ref={videoRef}
          autoPlay
          className="mt-4 rounded-xl w-full border border-gray-300"
        />

        <button
          onClick={capturePhoto}
          className="w-full bg-gray-800 text-white py-3 rounded-xl mt-4 hover:opacity-90 transition"
        >
          📸 Capture Photo
        </button>
      </div>
    </div>
  );
}