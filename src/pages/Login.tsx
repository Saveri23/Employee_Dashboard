import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "testuser" && password === "Test123") {
          localStorage.setItem("auth", "true");

      navigate("/list");
    } else {
      setError("Invalid Credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Employee Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border rounded-lg mb-3"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-primary text-white py-3 rounded-lg mt-3 hover:opacity-90"
        >
          Login
        </button>
      </div>
    </div>
  );
}