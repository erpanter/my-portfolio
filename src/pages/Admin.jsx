import { useState } from "react";
import { Link } from "react-router-dom";
import { uploadToS3 } from "../utils/s3Upload";

export default function Admin({ projects, setProjects, photos, setPhotos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [projectImage, setProjectImage] = useState(null);
  const [photoImage, setPhotoImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // ADD OR UPDATE PROJECT
  const handleSaveProject = async () => {
  try {
    if (!title || !description || !fullDescription) return;

    let imageUrl = null;

    if (projectImage) {
      console.log("Uploading project image...");
      imageUrl = await uploadToS3(projectImage);
      console.log("Uploaded:", imageUrl);
    }

    if (editingId) {
      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === editingId
            ? {
                ...proj,
                title,
                description,
                fullDescription,
                image: imageUrl || proj.image
              }
            : proj
        )
      );
    } else {
      const newProject = {
        id: Date.now(),
        title,
        description,
        fullDescription,
        image: imageUrl
      };

      setProjects((prev) => [...prev, newProject]);
    }

    // RESET
    setTitle("");
    setDescription("");
    setFullDescription("");
    setProjectImage(null);
    setEditingId(null);

    console.log("Project saved!");
  } catch (err) {
    console.error("PROJECT ERROR:", err);
  }
};

  // DELETE PROJECT
  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  // EDIT PROJECT (prefill form)
  const handleEditProject = (proj) => {
    setTitle(proj.title);
    setDescription(proj.description);
    setFullDescription(proj.fullDescription);
    setEditingId(proj.id);
  };

  // ADD PHOTO
  const handleAddPhoto = async () => {
  try {
    if (!photoImage) return;

    console.log("Uploading photo...");

    const imageUrl = await uploadToS3(photoImage);

    console.log("Uploaded:", imageUrl);

    setPhotos((prev) => [...prev, imageUrl]);

    setPhotoImage(null);
  } catch (err) {
    console.error("PHOTO ERROR:", err);
  }
};

  // DELETE PHOTO
  const handleDeletePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      {/* BACK */}
      <Link to="/" className="inline-block mb-8 text-gray-400 hover:text-white">
        ← Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-10">Admin Panel</h1>

      {/* PROJECT FORM */}
      <div className="mb-16">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Project" : "Add Project"}
        </h2>

        <div className="flex flex-col gap-4 max-w-lg">

          <input
            className="p-3 rounded bg-gray-800"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="p-3 rounded bg-gray-800"
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <textarea
            className="p-3 rounded bg-gray-800 h-32"
            placeholder="Full Description"
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProjectImage(e.target.files[0])}
          />

          {projectImage && (
            <img
              src={URL.createObjectURL(projectImage)}
              className="w-48 rounded"
            />
          )}

          <button
            onClick={handleSaveProject}
            className="bg-white text-black py-2 rounded hover:opacity-80"
          >
            {editingId ? "Update Project" : "Add Project"}
          </button>

        </div>
      </div>

      {/* EXISTING PROJECTS */}
      <div className="mb-16">
        <h2 className="text-xl font-semibold mb-4">Manage Projects</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-gray-900 p-4 rounded-xl">
              <img src={proj.image} className="h-32 w-full object-cover rounded mb-2" />
              <h3 className="font-semibold">{proj.title}</h3>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEditProject(proj)}
                  className="px-3 py-1 bg-blue-500 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteProject(proj.id)}
                  className="px-3 py-1 bg-red-500 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PHOTO UPLOAD */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Add Photography</h2>

        <div className="flex flex-col gap-4 max-w-lg">

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoImage(e.target.files[0])}
          />

          {photoImage && (
            <img
              src={URL.createObjectURL(photoImage)}
              className="w-48 rounded"
            />
          )}

          <button
            onClick={handleAddPhoto}
            className="bg-white text-black py-2 rounded"
          >
            Add Photo
          </button>

        </div>
      </div>

      {/* PHOTO GALLERY (DELETE) */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Manage Photos</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((src, index) => (
            <div key={index} className="relative">
              <img src={src} className="rounded w-full" />

              <button
                onClick={() => handleDeletePhoto(index)}
                className="absolute top-2 right-2 bg-red-500 px-2 py-1 text-xs rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}