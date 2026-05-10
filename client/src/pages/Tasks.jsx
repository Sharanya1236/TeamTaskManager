import { useEffect, useState } from "react";
import {
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";
import {
  Plus,
  CheckSquare,
} from "lucide-react";

import {
  getTasks,
  createTask,
  updateTaskStatus,
} from "../services/taskService";

import {
  getProjects,
} from "../services/projectService";

import {
  getUsers,
} from "../services/userService";


const Tasks = () => {
const navigate =
  useNavigate();
const user =
  JSON.parse(
    localStorage.getItem("user")
  );
  const [tasks, setTasks] =
    useState([]);

  const [projects, setProjects] =
    useState([]);
  const [users, setUsers] = 
    useState([]);
  const [showModal, setShowModal] =
    useState(false);

  const [taskTitle, setTaskTitle] =
    useState("");

  const [
    taskDescription,
    setTaskDescription,
  ] = useState("");

  const [
    selectedProject,
    setSelectedProject,
  ] = useState("");

  const [assignedUser, setAssignedUser] =
  useState("");

  const [taskStatus, setTaskStatus] =
    useState("Pending");
  const [dueDate, setDueDate] =
    useState("");
  const [search, setSearch] =
  useState("");

  useEffect(() => {

    fetchTasks();
fetchProjects();
fetchUsers();

  }, []);

  const fetchTasks = async () => {

    try {

      const data = await getTasks();

      setTasks(data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchProjects = async () => {

    try {

      const data =
        await getProjects();

      setProjects(data);

    } catch (error) {

      console.log(error);
    }
  };
  const fetchUsers = async () => {

  try {

    const data =
      await getUsers();

    setUsers(data);

  } catch (error) {

    console.log(error);
  }
};

  const handleCreateTask =
    async () => {

      try {

        const newTask =
          await createTask({
            title: taskTitle,
            description:
              taskDescription,
            project:
              selectedProject,
            status: taskStatus,
            assignedTo: assignedUser,
            dueDate,
          });

        setTasks([
          ...tasks,
          newTask,
        ]);

        setTaskTitle("");
        setTaskDescription("");
        setSelectedProject("");
        setAssignedUser("");
        setTaskStatus("Pending");
        setDueDate("");

        setShowModal(false);

      } catch (error) {

        console.log(error);
      }
    };

  const handleStatusChange =
    async (
      taskId,
      newStatus
    ) => {

      try {

        const updatedTask =
          await updateTaskStatus(
            taskId,
            newStatus
          );

        setTasks(
          tasks.map((task) =>
            task._id === taskId
              ? updatedTask
              : task
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

          <h1 className="text-4xl font-bold">
            Tasks ✅
          </h1>

          <p className="text-gray-400 mt-2">
            Manage all your tasks.
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
    onClick={() =>
      setShowModal(true)
    }
    className="bg-yellow-500 hover:bg-yellow-600 px-5 py-3 rounded-xl flex items-center gap-2 font-medium transition"
  >

    <Plus size={18} />

    New Task

  </button>

)}

      </div>
      <div className="mb-6">

  <input
    type="text"
    placeholder="Search tasks..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="w-full md:w-[350px] p-3 rounded-xl bg-[#111827] border border-gray-700 outline-none"
  />

</div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {
  tasks
    .filter((task) =>
      task.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )
  .filter((task) => {

    if (user?.role === "admin") {
      return true;
    }

    return (
      task.assignedTo?._id ===
      user?._id
    );
  })
  .map((task) => (

          <div
            key={task._id}
            className="bg-[#111827] border border-gray-800 rounded-2xl p-6"
          >

            <div className="flex items-center justify-between mb-4">

              <CheckSquare
                className="text-yellow-400"
                size={26}
              />

              <span
                className={`px-3 py-1 rounded-full text-sm
                ${
                  task.status ===
                  "Completed"
                    ? "bg-green-500/20 text-green-400"
                    : task.status ===
                      "In Progress"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {task.status}
              </span>

            </div>

            <h2 className="text-2xl font-semibold mb-2">
              {task.title}
            </h2>

            <p className="text-gray-400 mb-3">
              {task.description}
            </p>

            <p className="text-sm text-gray-500 mb-5">
              Project:
              {" "}
              {task.project?.title}
            </p>
            <p className="text-sm text-blue-400 mt-1">
              <p
  className={`text-sm mt-1
  ${
    new Date(task.dueDate) <
      new Date() &&
    task.status !==
      "Completed"
      ? "text-red-400"
      : "text-gray-400"
  }`}
>

  Due:
  {" "}

  {task.dueDate
    ? new Date(
        task.dueDate
      ).toLocaleDateString()
    : "No deadline"}

</p>

  Assigned:
  {" "}
  {task.assignedTo?.name || "Unassigned"}

</p>

            <div className="flex gap-2 flex-wrap">

              <button
                onClick={() =>
                  handleStatusChange(
                    task._id,
                    "Pending"
                  )
                }
                className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded"
              >
                Pending
              </button>

              <button
                onClick={() =>
                  handleStatusChange(
                    task._id,
                    "In Progress"
                  )
                }
                className="text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded"
              >
                Progress
              </button>

              <button
                onClick={() =>
                  handleStatusChange(
                    task._id,
                    "Completed"
                  )
                }
                className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded"
              >
                Done
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* Modal */}
      {showModal && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-[#0B0F19] p-8 rounded-2xl w-[450px] border border-gray-800">

            <h2 className="text-2xl font-bold mb-6">
              Create New Task
            </h2>

            <input
              type="text"
              placeholder="Task Title"
              value={taskTitle}
              onChange={(e) =>
                setTaskTitle(
                  e.target.value
                )
              }
              className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
            />

            <textarea
              placeholder="Task Description"
              value={
                taskDescription
              }
              onChange={(e) =>
                setTaskDescription(
                  e.target.value
                )
              }
              className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
            />

            <select
              value={selectedProject}
              onChange={(e) =>
                setSelectedProject(
                  e.target.value
                )
              }
              className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
            >

              <option value="">
                Select Project
              </option>

              {projects.map(
                (project) => (

                  <option
                    key={
                      project._id
                    }
                    value={
                      project._id
                    }
                  >
                    {project.title}
                  </option>
                )
              )}

            </select>
<select
  value={assignedUser}
  onChange={(e) =>
    setAssignedUser(
      e.target.value
    )
  }
  className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
>

  <option value="">
    Assign Team Member
  </option>

  {users.map((user) => (

    <option
      key={user._id}
      value={user._id}
    >
      {user.name}
    </option>
  ))}

</select>
            <input
  type="date"
  value={dueDate}
  onChange={(e) =>
    setDueDate(
      e.target.value
    )
  }
  className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
/>
            <select
              value={taskStatus}
              onChange={(e) =>
                setTaskStatus(
                  e.target.value
                )
              }
              className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-6"
            >

              <option value="Pending">
                Pending
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

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
                  handleCreateTask
                }
                className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600"
              >
                Create Task
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Tasks;