import { useEffect, useState } from "react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Movie App",
      description: "Uses TMDB API",
      fullDescription:
        "A mobile app built using Kotlin that integrates TheMovieDB API to display popular, top-rated, and upcoming movies. Includes features like reviews, detailed movie pages, and user interaction.",
      image: "https://via.placeholder.com/300"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
          >
            <img src={proj.image} className="w-full h-48 object-cover" />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{proj.title}</h2>
              <p className="text-gray-400">{proj.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}