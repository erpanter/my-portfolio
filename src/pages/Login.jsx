import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (input === import.meta.env.VITE_ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-6 rounded-xl w-80">
        <h2 className="text-xl mb-4">Admin Login</h2>

        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-2 mb-4 bg-gray-800 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-white text-black py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}