// PhotoResult.tsx
import { useLocation } from "react-router-dom";

export default function PhotoResult() {
  const location = useLocation();
  const image = location.state as string;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Captured Photo</h2>
        {image ? (
          <img src={image} alt="Captured" className="rounded-xl w-full border border-gray-300" />
        ) : (
          <p>No photo captured.</p>
        )}
      </div>
    </div>
  );
}