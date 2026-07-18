import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const auth = useAuth();
  const [projects, setProjects] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API_URL}/content`);
        if (!response.ok) throw new Error("Failed to load portfolio content");

        const content = await response.json();
        setProjects(content.filter((item) => item.type === "project"));
        setPhotos(content.filter((item) => item.type === "photo"));
      } catch (error) {
        console.error("Failed to fetch portfolio content:", error);
      }
    };

    fetchContent();
  }, []);

  if (auth.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  if (auth.error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-red-500">
        Auth error: {auth.error.message}
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home projects={projects} photos={photos} />} />
      <Route
        path="/portal"
        element={
          auth.isAuthenticated ? (
            <Admin
              projects={projects}
              setProjects={setProjects}
              photos={photos}
              setPhotos={setPhotos}
            />
          ) : (
            <Login />
          )
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
