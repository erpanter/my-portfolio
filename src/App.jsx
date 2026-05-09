import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  console.log("API URL:", import.meta.env.VITE_API_URL);
  // ADMIN AUTH
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  // PROJECTS STATE
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem("projects");

    return savedProjects
      ? JSON.parse(savedProjects)
      : [
        {
          id: 1,
          title: "AI Meeting Summarizer",
          description: "Summarizes meeting transcripts using NLP",
          fullDescription:
            "Built an AI-powered meeting summarization system using datasets such as AMI and SAMSum. The system processes transcripts and generates concise summaries, improving efficiency in reviewing long discussions. Explored natural language processing techniques and worked with real-world datasets.",
          image: "https://via.placeholder.com/300",
          tech: ["Python", "NLP", "AI"]
        },

        {
          id: 2,
          title: "Movie App",
          description: "Movie browsing app using TMDB API",
          fullDescription:
            "Developed a mobile application using Kotlin and Android Studio that integrates TheMovieDB API. Features include viewing popular, top-rated, and upcoming movies, detailed movie pages, and user-friendly UI built with modern Android architecture.",
          image: "https://via.placeholder.com/300",
          tech: ["Kotlin", "Android", "API"]
        }
      ];
  });

  // PHOTOS STATE
  const [photos, setPhotos] = useState(() => {
    const savedPhotos = localStorage.getItem("photos");

    return savedPhotos
      ? JSON.parse(savedPhotos)
      : [];
  });

  // SAVE PROJECTS
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // SAVE PHOTOS
  useEffect(() => {
    localStorage.setItem("photos", JSON.stringify(photos));
  }, [photos]);

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