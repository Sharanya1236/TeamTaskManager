import { LogOut } from "lucide-react";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
} from "lucide-react";

import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const handleLogout = () => {

  localStorage.removeItem("user");

  window.location.href = "/";

};

  const navigate = useNavigate();
  const user =
  JSON.parse(
    localStorage.getItem("user")
  );
  return (

    <div className="min-h-screen bg-[#0B0F19] text-white flex">

      {/* Sidebar */}
      <div className="w-64 bg-[#111827] border-r border-gray-800 p-6 hidden md:flex flex-col justify-between">

        <div>

          <h1 className="text-2xl font-bold text-green-400 mb-10">
            Team Task 🚀
          </h1>
          <p className="text-sm text-gray-400 mb-8">

  Logged in as:
  {" "}

  <span className="text-green-400 capitalize">

    {user?.role}

  </span>

</p>

          <nav className="space-y-4">

            <div
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-xl cursor-pointer transition"
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </div>

            <div
              onClick={() => navigate("/projects")}
              className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-xl cursor-pointer transition"
            >
              <FolderKanban size={20} />
              <span>Projects</span>
            </div>

            <div
              onClick={() => navigate("/tasks")}
              className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-xl cursor-pointer transition"
            >
              <CheckSquare size={20} />
              <span>Tasks</span>
            </div>

            <div
              onClick={() => navigate("/team")}
              className="flex items-center gap-3 hover:bg-white/5 p-3 rounded-xl cursor-pointer transition"
            >
              <Users size={20} />
              <span>Team</span>
            </div>

          </nav>
          <button
  onClick={handleLogout}
  className="flex items-center gap-3 text-red-400 hover:text-red-500 mt-10"
>
  <LogOut size={22} />

  <span>
    Logout
  </span>
</button>
        </div>

        
      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        {/* Topbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Team Task Manager
            </h1>

            <p className="text-gray-400 mt-1">
              Manage projects and tasks efficiently.
            </p>
          </div>

          <div className="flex items-center gap-4">

            

            

          </div>
        </div>

        {/* Page Content */}
        <Outlet />

      </div>
    </div>
  );
};

export default Layout;