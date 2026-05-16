import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import { useAuth }
from "react-oidc-context";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

const API_URL =
  import.meta.env.VITE_API_URL;

function App() {

  // =========================
  // COGNITO AUTH
  // =========================
  const auth = useAuth();

  const isAdmin =
    auth.isAuthenticated;

  // =========================
  // STATE
  // =========================
  const [projects, setProjects] =
    useState([]);

  const [photos, setPhotos] =
    useState([]);

  // =========================
  // FETCH CONTENT
  // =========================
  useEffect(() => {

    const fetchContent = async () => {

      try {

        const res = await fetch(
          `${API_URL}/content`
        );

        const data = await res.json();

        // PROJECTS
        const loadedProjects =
          data.filter(
            (item) =>
              item.type === "project"
          );

        // PHOTOS
        const loadedPhotos =
          data.filter(
            (item) =>
              item.type === "photo"
          );

        setProjects(loadedProjects);

        setPhotos(loadedPhotos);

      } catch (err) {

        console.error(
          "FETCH ERROR:",
          err
        );
      }
    };

    fetchContent();

  }, []);

  // =========================
  // LOADING
  // =========================
  if (auth.isLoading) {

    return (
      <div className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
      ">
        Loading...
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (auth.error) {

    return (
      <div className="
        min-h-screen
        bg-black
        text-red-500
        flex
        items-center
        justify-center
      ">
        Auth Error:
        {" "}
        {auth.error.message}
      </div>
    );
  }

  // =========================
  // ROUTES
  // =========================
  return (

    <Routes>

      <Route
        path="/"
        element={
          <Home
            projects={projects}
            photos={photos}
          />
        }
      />

      <Route
        path="/portal"
        element={
          isAdmin ? (
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

    </Routes>
  );
}

export default App;