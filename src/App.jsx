import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  // ADMIN AUTH
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const [projects, setProjects] = useState([]);

  // PHOTOS STATE
  const [photos, setPhotos] = useState([]);

  useEffect(() => {

    const fetchContent = async () => {

      try {

        const res = await fetch(
          `${API_URL}/content`
        );

        const data = await res.json();

        // PROJECTS
        const loadedProjects = data.filter(
          (item) => item.type === "project"
        );

        // PHOTOS
        const loadedPhotos = data
          .filter((item) => item.type === "photo")
          .map((item) => item.url);

        // ONLY replace if backend has data
        if (loadedProjects.length > 0) {
          setProjects(loadedProjects);
        }

        if (loadedPhotos.length > 0) {
          setPhotos(loadedPhotos);
        }

      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };

    fetchContent();

  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={<Home projects={projects} photos={photos} />}
      />

      <Route
        path="/admin"
        element={
          isAdmin ? (
            <Admin
              projects={projects}
              setProjects={setProjects}
              photos={photos}
              setPhotos={setPhotos}
              setIsAdmin={setIsAdmin}
            />
          ) : (
            <Login setIsAdmin={setIsAdmin} />
          )
        }
      />
    </Routes>
  );
}

export default App;