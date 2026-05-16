import { useState } from "react";
import { uploadToS3 } from "../utils/s3Upload";
import { useAuth } from "react-oidc-context";

export default function Admin({
  projects,
  setProjects,
  photos,
  setPhotos
}) {

  const auth = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");

  const [projectImage, setProjectImage] = useState(null);
  const [photoImage, setPhotoImage] = useState(null);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);

  // =========================
  // ADD / UPDATE PROJECT
  // =========================
  const handleSaveProject = async () => {

    try {

      if (!title || !description || !fullDescription) {
        return;
      }

      setLoading(true);

      let imageUrl = null;

      // Upload image if exists
      if (projectImage) {

        console.log("Uploading project image...");

        imageUrl = await uploadToS3(projectImage);

        console.log("Uploaded:", imageUrl);
      }

      // =========================
      // EDIT EXISTING PROJECT
      // =========================
      if (editingId) {

        const updatedProject = {
          id: editingId,
          type: "project",
          title,
          description,
          fullDescription,
          image:
            imageUrl ||
            projects.find((p) => p.id === editingId)?.image ||
            ""
        };

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/project`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProject)
          }
        );

        const data =
          await response.json().catch(() => ({}));

        console.log("UPDATE RESPONSE:", data);

        if (!response.ok) {
          throw new Error(data.error || "Failed to update project");
        }

        // Update frontend state
        setProjects((prev) =>
          prev.map((proj) =>
            proj.id === editingId
              ? updatedProject
              : proj
          )
        );

      } else {

        // =========================
        // CREATE NEW PROJECT
        // =========================
        const newProject = {
          id: crypto.randomUUID(),
          type: "project",
          title,
          description,
          fullDescription,
          image: imageUrl || ""
        };

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/project`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newProject)
          }
        );

        const data =
          await response.json().catch(() => ({}));

        console.log("PROJECT RESPONSE:", data);

        if (!response.ok) {
          throw new Error(data.error || "Failed to save project");
        }

        // Update frontend state
        setProjects((prev) => [...prev, newProject]);
      }

      // =========================
      // RESET FORM
      // =========================
      setTitle("");
      setDescription("");
      setFullDescription("");

      setProjectImage(null);

      setEditingId(null);

      console.log("Project saved!");

    } catch (err) {

      console.error("PROJECT ERROR:", err);

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // DELETE PROJECT
  // =========================
  const handleDeleteProject = async (id) => {

    await fetch(
      `${import.meta.env.VITE_API_URL}/project/${id}`,
      {
        method: "DELETE"
      }
    );

    setProjects((prev) =>
      prev.filter((proj) => proj.id !== id)
    );
  };

  const handleEditProject = (proj) => {

    setTitle(proj.title);
    setDescription(proj.description);
    setFullDescription(proj.fullDescription);

    setEditingId(proj.id);
  };

  // =========================
  // ADD PHOTO
  // =========================
  const handleAddPhoto = async () => {

    try {

      if (!photoImage) return;

      setLoading(true);

      console.log("Uploading photo...");

      const imageUrl = await uploadToS3(photoImage);

      console.log("Uploaded:", imageUrl);

      const photoItem = {
        id: crypto.randomUUID(),
        type: "photo",
        url: imageUrl
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/photo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(photoItem)
        }
      );

      const data =
        await response.json().catch(() => ({}));

      console.log("PHOTO RESPONSE:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to save photo");
      }

      // Update frontend state
      setPhotos((prev) => [...prev, photoItem]);

      // Reset
      setPhotoImage(null);

    } catch (err) {

      console.error("PHOTO ERROR:", err);

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // DELETE PHOTO
  // =========================
  const handleDeletePhoto = async (id) => {

    await fetch(
      `${import.meta.env.VITE_API_URL}/photo/${id}`,
      {
        method: "DELETE"
      }
    );

    setPhotos((prev) =>
      prev.filter((photo) => photo.id !== id)
    );
  };

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {

  auth.removeUser();

  const logoutUri =
    import.meta.env.VITE_COGNITO_LOGOUT_URI;

  const cognitoDomain =
    import.meta.env.VITE_COGNITO_DOMAIN;

  const clientId =
    import.meta.env.VITE_COGNITO_CLIENT_ID;

  window.location.href =
    `${cognitoDomain}/logout?` +
    `client_id=${clientId}` +
    `&logout_uri=${encodeURIComponent(logoutUri)}`;
};

  return (
    <div className="min-h-screen bg-black text-white p-10">

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="mb-6 bg-red-500 px-4 py-2 rounded hover:opacity-80 transition"
      >
        Logout
      </button>

      <h1 className="text-3xl font-bold mb-10">
        Admin Panel
      </h1>

      {/* ========================= */}
      {/* PROJECT FORM */}
      {/* ========================= */}
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
            onChange={(e) =>
              setProjectImage(e.target.files[0])
            }
          />

          {projectImage && (
            <img
              src={URL.createObjectURL(projectImage)}
              className="w-48 rounded"
            />
          )}

          <button
            onClick={handleSaveProject}
            disabled={loading}
            className="bg-white text-black py-2 rounded hover:opacity-80 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : editingId
                ? "Update Project"
                : "Add Project"}
          </button>

        </div>
      </div>

      {/* ========================= */}
      {/* PROJECT LIST */}
      {/* ========================= */}
      <div className="mb-16">

        <h2 className="text-xl font-semibold mb-4">
          Manage Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          {projects.map((proj) => (

            <div
              key={proj.id}
              className="bg-gray-900 p-4 rounded-xl"
            >

              <img
                src={proj.image}
                className="h-32 w-full object-cover rounded mb-2"
              />

              <h3 className="font-semibold">
                {proj.title}
              </h3>

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

      {/* ========================= */}
      {/* PHOTO UPLOAD */}
      {/* ========================= */}
      <div className="mb-10">

        <h2 className="text-xl font-semibold mb-4">
          Add Photography
        </h2>

        <div className="flex flex-col gap-4 max-w-lg">

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setPhotoImage(e.target.files[0])
            }
          />

          {photoImage && (
            <img
              src={URL.createObjectURL(photoImage)}
              className="w-48 rounded"
            />
          )}

          <button
            onClick={handleAddPhoto}
            disabled={loading}
            className="bg-white text-black py-2 rounded hover:opacity-80 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Add Photo"}
          </button>

        </div>
      </div>

      {/* ========================= */}
      {/* PHOTO GALLERY */}
      {/* ========================= */}
      <div>

        <h2 className="text-xl font-semibold mb-4">
          Manage Photos
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {photos.map((photo, index) => (

            <div
              key={index}
              className="relative"
            >

              <img
                src={photo.url}
                className="rounded w-full"
              />

              <button
                onClick={() => handleDeletePhoto(photo.id)}
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