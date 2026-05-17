import { Link } from "react-router-dom";
import { useState } from "react";
import profile from "../assets/profile.jpeg";

export default function Home({ projects, photos }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="bg-black text-white scroll-smooth relative">

      {/* BACKGROUND OVERLAY */}
      {expandedId && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setExpandedId(null)}
        ></div>
      )}

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-black/70 backdrop-blur p-4 flex justify-center gap-6 z-[100]">
        <a href="#about" className="hover:text-gray-400">About</a>
        <a href="#projects" className="hover:text-gray-400">Projects</a>
        <a href="#photos" className="hover:text-gray-400">Photography</a>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-6 pt-20">
        <img
          src={profile}
          alt="profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-white"
        />

        <div>
          <h1 className="text-5xl font-bold mb-4">
            Hi! I'm Nicholas Ho :)
          </h1>

          <p className="text-gray-400 max-w-md">
            IT student at Nanyang Polytechnic with experience in cloud systems, automation, and AI-driven applications.
            I have recently completed an internship at NCS, working with real-world systems and enterprise workflows.
            I'm passionate in continuously learning new technologies.
            Outside of tech, I enjoy photography as a creative outlet.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-10 py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>

        <div className="grid md:grid-cols-2 gap-10">

          <div>
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <p className="text-gray-400">
              Teck Ghee Primary School — PSLE (2013 - 2018)
            </p>
            <p className="text-gray-400">
              Maris Stella High School — O Levels (2019 - 2022)
            </p>
            <p className="text-gray-400">
              Nanyang Polytechnic — Diploma in Information Technology (2023 - 2026)
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Skills</h3>
            <p className="text-gray-400">
              Python • JavaScript • C# • React • AWS • SQL • Git • AI
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Experience</h3>
            <p className="text-gray-400">
              Internship at NCS working with enterprise systems, alongside part-time roles at Dyson and Marina Bay Sands where I developed communication, teamwork, and problem-solving skills in fast-paced environments.
            </p>
          </div>

        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="px-10 py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-6">Experience</h2>

        <div className="space-y-4 text-gray-400 max-w-2xl">
          <p>
            <span className="text-white font-semibold">NCS Internship</span> — Worked with enterprise systems and real-world workflows, gaining exposure to industry practices in software and cloud environments.
          </p>

          <p>
            <span className="text-white font-semibold">Dyson</span> — Developed communication and customer-facing problem-solving skills in a tech retail environment.
          </p>

          <p>
            <span className="text-white font-semibold">Marina Bay Sands</span> — Operated critical systems in high-pressure environments, handling event-related transactions and logistics.
          </p>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-10 py-16 border-t border-gray-800 relative z-50">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((proj) => {
            const isOpen = expandedId === proj.id;

            return (
              <div
                key={proj.id}
                onClick={() => setExpandedId(isOpen ? null : proj.id)}
                className={`
                  relative bg-gray-900 rounded-xl p-4 cursor-pointer
                  transition-all duration-500 ease-in-out
                  hover:scale-[1.03] hover:shadow-xl
                  
                  ${isOpen ? "md:col-span-3 scale-[1.02] shadow-2xl z-50 ring-1 ring-white/20" : ""}
                `}
              >
                {/* CLOSE BUTTON */}
                {isOpen && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedId(null);
                    }}
                    className="absolute top-3 right-3 text-white text-sm opacity-70 hover:opacity-100"
                  >
                    ✕
                  </button>
                )}

                <img
                  src={proj.image}
                  className={`
                    rounded mb-3 w-full transition-all duration-500 ease-in-out
                    ${isOpen ? "h-auto object-contain" : "h-48 object-cover"}
                  `}
                />

                <h3 className="font-semibold text-lg">{proj.title}</h3>
                <p className="text-gray-400 text-sm">{proj.description}</p>

                {/* EXPANDABLE CONTENT */}
                <div
                  className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"}
                  `}
                >
                  <div className="text-gray-300 space-y-2">
                    <p>{proj.fullDescription}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PHOTOGRAPHY */}
      <section id="photos" className="px-10 py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-6">Photography 📸</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="overflow-hidden rounded-xl">
              <img
                src={photo.url}
                alt="photo"
                className="w-full h-auto rounded-xl transition-transform duration-300 ease-out hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="
  border-t
  border-gray-800
  py-8
  flex
  flex-col
  items-center
  justify-center
  gap-4
">
        <a
          href="https://aws.amazon.com/what-is-cloud-computing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://d0.awsstatic.com/logos/powered-by-aws-white.png"
            alt="Powered by AWS Cloud Computing"
            className="
        h-10
        object-contain
        opacity-80
        hover:opacity-100
        transition
      "
          />
        </a>

        <p className="text-xs text-gray-600">
          Built with AWS Cloud Services
        </p>

      </footer>

    </div>
  );
}