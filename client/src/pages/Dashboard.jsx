import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../services/projectService";
import { createProject } from "../services/projectService";
import { deleteProject } from "../services/projectService";
import {
  getTasks,
  createTask,
  updateTaskStatus,
} from "../services/taskService";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  Bell,
  Search,
  Plus,
} from "lucide-react";
  const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);

const [taskTitle, setTaskTitle] = useState("");

const [taskDescription, setTaskDescription] = useState("");

const [selectedProject, setSelectedProject] = useState("");

const [taskStatus, setTaskStatus] = useState("Pending");
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

useEffect(() => {

  const fetchProjects = async () => {
    try {

      const data = await getProjects();

      setProjects(data);

    } catch (error) {

      console.log(error);
    }
  };

  fetchProjects();
  const fetchTasks = async () => {

  try {

    const data = await getTasks();

    setTasks(data);

  } catch (error) {

    console.log(error);
  }
};

fetchTasks();

}, []);
const handleCreateProject = async () => {

  try {

    const newProject = await createProject({
      title,
      description,
      status: "Active",
    });

    setProjects([...projects, newProject]);

    setTitle("");
    setDescription("");

    setShowModal(false);

  } catch (error) {

    console.log(error);
  }
};
const handleCreateTask = async () => {

  try {

    const newTask = await createTask({
      title: taskTitle,
      description: taskDescription,
      project: selectedProject,
      status: taskStatus,
    });

    setTasks([...tasks, newTask]);

    setTaskTitle("");
    setTaskDescription("");
    setSelectedProject("");
    setTaskStatus("Pending");

    setShowTaskModal(false);

  } catch (error) {

    console.log(error);
  }
};
const handleStatusChange = async (
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
const handleDeleteProject = async (id) => {

  try {

    await deleteProject(id);

    setProjects(
      projects.filter(
        (project) => project._id !== id
      )
    );

  } catch (error) {

    console.log(error);
  }
};
  return (
    <div className="space-y-8">
      

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
            <h3 className="text-gray-400 mb-2">Total Projects</h3>
            <h1 className="text-4xl font-bold text-green-400">{projects.length}</h1>
          </div>

          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
            <h3 className="text-gray-400 mb-2">Pending Tasks</h3>
            <h1 className="text-4xl font-bold text-yellow-400">{
  tasks.filter(
    (task) =>
      task.status ===
      "Pending"
  ).length
}</h1>
          </div>

          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">
            <h3 className="text-gray-400 mb-2">Completed Tasks</h3>
            <h1 className="text-4xl font-bold text-blue-400">{
  tasks.filter(
    (task) =>
      task.status ===
      "Completed"
  ).length
}</h1>
          </div>
          <div className="bg-[#111827] p-6 rounded-2xl border border-gray-800">

  <h3 className="text-gray-400 mb-2">
    Overdue Tasks
  </h3>

  <h1 className="text-4xl font-bold text-red-400">

    {
      tasks.filter(
        (task) =>

          new Date(task.dueDate) <
            new Date() &&

          task.status !==
            "Completed"
      ).length
    }

  </h1>

</div>
        </div>
      {/* Recent Projects */}
<div className="bg-[#111827] rounded-2xl border border-gray-800 p-6">

  <div className="flex items-center justify-between mb-6">
    <h2 className="text-2xl font-semibold">
      Recent Projects
    </h2>

    <button
  onClick={() =>
    navigate("/projects")
  }
>
  View All
</button>
  </div>

  <div className="space-y-4">

    {projects.map((project) => (

      <div
        key={project._id}
        className="bg-[#0B0F19] border border-gray-800 rounded-xl p-4 flex items-center justify-between"
      >

        <div>

          <h3 className="font-semibold">
            {project.title}
          </h3>

          <p className="text-sm text-gray-400">
            {project.description}
          </p>

        </div>

        <div className="flex items-center gap-3">

          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
            {project.status}
          </span>

          <button
            onClick={() => handleDeleteProject(project._id)}
            className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg hover:bg-red-500/30 transition"
          >
            Delete
          </button>

        </div>

      </div>
    ))}

  </div>
</div>


{/* Recent Tasks */}
<div className="bg-[#111827] rounded-2xl border border-gray-800 p-6 mt-8">

  <div className="flex items-center justify-between mb-6">

    <h2 className="text-2xl font-semibold">
      Recent Tasks
    </h2>

    <button
  onClick={() =>
    navigate("/tasks")
  }
>
  View All
</button>

  </div>

  <div className="space-y-4">

    {tasks.map((task) => (

      <div
        key={task._id}
        className="bg-[#0B0F19] border border-gray-800 rounded-xl p-4 flex items-center justify-between"
      >

        <div>

          <h3 className="font-semibold">
            {task.title}
          </h3>

          <p className="text-sm text-gray-400">
            {task.description}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Project: {task.project?.title}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm
          ${
            task.status === "Completed"
              ? "bg-blue-500/20 text-blue-400"
              : task.status === "In Progress"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {task.status}
        </span>

      </div>
    ))}

  </div>
</div>


{/* Kanban Board */}
<div className="mt-10">

  <h2 className="text-3xl font-bold mb-6">
    Task Board
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Pending */}
    <div className="bg-[#111827] rounded-2xl p-5 border border-gray-800">

      <h3 className="text-xl font-semibold mb-4 text-red-400">
        Pending
      </h3>

      <div className="space-y-4">

        {tasks
          .filter((task) => task.status === "Pending")
          .map((task) => (

            <div
              key={task._id}
              className="bg-[#0B0F19] border border-gray-700 p-4 rounded-xl"
            >

              <h4 className="font-semibold">
                {task.title}
              </h4>

              <p className="text-sm text-gray-400 mt-1">
                {task.description}
              </p>
              <div className="flex gap-2 mt-3 flex-wrap">

  <button
    onClick={() =>
      handleStatusChange(
        task._id,
        "Pending"
      )
    }
    className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded"
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
    className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded"
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
    className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded"
  >
    Done
  </button>

</div>

            </div>
        ))}

      </div>

    </div>


    {/* In Progress */}
    <div className="bg-[#111827] rounded-2xl p-5 border border-gray-800">

      <h3 className="text-xl font-semibold mb-4 text-yellow-400">
        In Progress
      </h3>

      <div className="space-y-4">

        {tasks
          .filter((task) => task.status === "In Progress")
          .map((task) => (

            <div
              key={task._id}
              className="bg-[#0B0F19] border border-gray-700 p-4 rounded-xl"
            >

              <h4 className="font-semibold">
                {task.title}
              </h4>

              <p className="text-sm text-gray-400 mt-1">
                {task.description}
              </p>
              <div className="flex gap-2 mt-3 flex-wrap">

  <button
    onClick={() =>
      handleStatusChange(
        task._id,
        "Pending"
      )
    }
    className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded"
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
    className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded"
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
    className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded"
  >
    Done
  </button>

</div>

            </div>
        ))}

      </div>

    </div>


    {/* Completed */}
    <div className="bg-[#111827] rounded-2xl p-5 border border-gray-800">

      <h3 className="text-xl font-semibold mb-4 text-green-400">
        Completed
      </h3>

      <div className="space-y-4">

        {tasks
          .filter((task) => task.status === "Completed")
          .map((task) => (

            <div
              key={task._id}
              className="bg-[#0B0F19] border border-gray-700 p-4 rounded-xl"
            >

              <h4 className="font-semibold">
                {task.title}
              </h4>

              <p className="text-sm text-gray-400 mt-1">
                {task.description}
              </p>
              <div className="flex gap-2 mt-3 flex-wrap">

  <button
    onClick={() =>
      handleStatusChange(
        task._id,
        "Pending"
      )
    }
    className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded"
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
    className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded"
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
    className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded"
  >
    Done
  </button>

</div>

            </div>
        ))}

      </div>

    </div>

  </div>

</div>
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
  onChange={(e) => setTitle(e.target.value)}
  className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
/>

      <textarea
  placeholder="Project Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
/>

      <div className="flex justify-end gap-3">

        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-2 rounded-lg bg-gray-700"
        >
          Cancel
        </button>

        <button
  onClick={handleCreateProject}
  className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600"
>
  Create
</button>

      </div>

    </div>

  </div>
)}
{showTaskModal && (

  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

    <div className="bg-[#0B0F19] p-8 rounded-2xl w-[450px] border border-gray-800">

      <h2 className="text-2xl font-bold mb-6">
        Create New Task
      </h2>

      <input
        type="text"
        placeholder="Task Title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
      />

      <textarea
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
      />

      {/* Project Select */}
      <select
        value={selectedProject}
        onChange={(e) => setSelectedProject(e.target.value)}
        className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
      >

        <option value="">
          Select Project
        </option>

        {projects.map((project) => (

          <option
            key={project._id}
            value={project._id}
          >
            {project.title}
          </option>
        ))}

      </select>

      {/* Status */}
      <select
        value={taskStatus}
        onChange={(e) => setTaskStatus(e.target.value)}
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
          onClick={() => setShowTaskModal(false)}
          className="px-4 py-2 rounded-lg bg-gray-700"
        >
          Cancel
        </button>

        <button
          onClick={handleCreateTask}
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

export default Dashboard;