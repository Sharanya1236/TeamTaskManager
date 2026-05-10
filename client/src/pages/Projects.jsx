import { useEffect, useState } from "react";
import {
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";
import {
  Plus,
  FolderKanban,
} from "lucide-react";

import {
  getProjects,
  createProject,
  deleteProject,
} from "../services/projectService";

const Projects = () => {
  const navigate =
  useNavigate();
    const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  const [projects, setProjects] = useState([]);

  const [showModal, setShowModal] =
    useState(false);

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");
const [search, setSearch] =
  useState("");
  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const data = await getProjects();

      setProjects(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleCreateProject = async () => {

    try {

      const newProject =
        await createProject({
          title,
          description,
          status: "Active",
        });

      setProjects([
        ...projects,
        newProject,
      ]);

      setTitle("");
      setDescription("");

      setShowModal(false);

    } catch (error) {

      console.log(error);
    }
  };

  const handleDeleteProject =
    async (id) => {

      try {

        await deleteProject(id);

        setProjects(
          projects.filter(
            (project) =>
              project._id !== id
          )
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Projects 🚀
          </h1>

          <p className="text-gray-400 mt-2">
            Manage all your projects here.
          </p>
          <button
  onClick={() =>
    navigate(-1)
  }
  className="flex items-center gap-2 mb-6 text-gray-300 hover:text-white transition"
>
  <ArrowLeft size={18} />

  Back
</button>
        </div>

        {user?.role === "admin" && (

  <button
    onClick={() => setShowModal(true)}
    className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl flex items-center gap-2 font-medium transition"
  >

    <Plus size={18} />

    New Project

  </button>
)}

      </div>
      <div className="mb-6">

  <input
    type="text"
    placeholder="Search projects..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="w-full md:w-[350px] p-3 rounded-xl bg-[#111827] border border-gray-700 outline-none"
  />

</div>
      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {
  projects
    .filter((project) =>
      project.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )
    .map((project) => (

          <div
            key={project._id}
            className="bg-[#111827] border border-gray-800 rounded-2xl p-6"
          >

            <div className="flex items-center justify-between mb-4">

              <FolderKanban
                className="text-green-400"
                size={28}
              />

              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                {project.status}
              </span>

            </div>

            <h2 className="text-2xl font-semibold mb-2">
              {project.title}
            </h2>

            <p className="text-gray-400 mb-6">
              {project.description}
            </p>

            {user?.role === "admin" && (

  <button
    onClick={() =>
      handleDeleteProject(
        project._id
      )
    }
    className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition"
  >
    Delete
  </button>

)}

          </div>
        ))}

      </div>

      {/* Modal */}
      {showModal && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-[#0B0F19] p-8 rounded-2xl w-[400px] border border-gray-800">

            <h2 className="text-2xl font-bold mb-6">
              Create New Project
            </h2>

            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
            />

            <textarea
              placeholder="Project Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="px-4 py-2 rounded-lg bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={
                  handleCreateProject
                }
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600"
              >
                Create
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Projects;