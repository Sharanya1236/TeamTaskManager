import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await loginUser(formData);

      localStorage.setItem(
        "token",
        data.token
      );
      localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex overflow-hidden">

      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-zinc-950 via-black to-green-950 items-center justify-center p-12 border-r border-zinc-800">

        <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/20 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-xl">

          <div className="flex items-center gap-3 mb-8">

            <div className="bg-green-500 p-3 rounded-2xl shadow-lg shadow-green-500/30">
              <span className="text-2xl">💼</span>
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Team Task Manager
              </h1>

              <p className="text-zinc-400 text-sm">
                Smart project collaboration platform
              </p>
            </div>
          </div>

          <h2 className="text-5xl font-extrabold leading-tight mb-6">
            Manage Projects.
            <br />
            Track Tasks.
            <br />
            Grow Faster 🚀
          </h2>

          <p className="text-zinc-400 text-lg leading-relaxed mb-10">
            Organize teams, assign tasks, monitor progress,
            and collaborate seamlessly with a modern productivity dashboard.
          </p>

          <div className="space-y-5">

            <div className="flex items-center gap-4 bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl p-4 hover:border-green-500/40 transition-all">

              <div className="bg-green-500/20 p-3 rounded-xl text-green-400">
                <span>👥</span>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Team Collaboration
                </h3>

                <p className="text-zinc-400 text-sm">
                  Assign tasks and manage teams effectively.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl p-4 hover:border-green-500/40 transition-all">

              <div className="bg-green-500/20 p-3 rounded-xl text-green-400">
                <span>✅</span>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Task Tracking
                </h3>

                <p className="text-zinc-400 text-sm">
                  Monitor pending, completed, and overdue tasks.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-2xl p-4 hover:border-green-500/40 transition-all">

              <div className="bg-green-500/20 p-3 rounded-xl text-green-400">
                <span>🔒</span>
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Secure Access
                </h3>

                <p className="text-zinc-400 text-sm">
                  JWT authentication with role-based access control.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 bg-gradient-to-b from-black via-zinc-950 to-black relative">

        <div className="absolute top-10 right-10 w-52 h-52 bg-green-500/10 rounded-full blur-3xl" />

        <div className="w-full max-w-md relative z-10">

          <div className="mb-10 text-center lg:text-left">

            <h2 className="text-4xl font-bold mb-3">
              Welcome Back 👋
            </h2>

            <p className="text-zinc-400 text-lg">
              Login to continue managing your workspace.
            </p>
          </div>

          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl shadow-black/40">

            <form
              className="space-y-6"
              onSubmit={handleSubmit}
            >

              <div>

                <label className="block text-sm text-zinc-300 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-4 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500 transition-all"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>

                <div className="flex items-center justify-between mb-2">

                  <label className="block text-sm text-zinc-300">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm text-green-400 hover:text-green-300"
                  >
                    Forgot Password?
                  </button>
                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-4 bg-zinc-950 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-green-500 transition-all"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 font-semibold text-lg"
              >
                Login to Dashboard
              </button>

            </form>

            <div className="relative my-8">

              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800"></div>
              </div>

              <div className="relative flex justify-center text-sm">
                <span className="bg-zinc-900 px-4 text-zinc-500">
                  OR CONTINUE WITH
                </span>
              </div>
            </div>

            <button className="w-full border border-zinc-700 hover:border-zinc-500 transition-all py-4 rounded-xl bg-zinc-950 text-zinc-200 font-medium">
              Continue with Google
            </button>

            <p className="text-center text-zinc-400 mt-8">

              Don’t have an account?{" "}

              <Link
                to="/register"
                className="text-green-400 hover:text-green-300 font-semibold"
              >
                Create Account
              </Link>

            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;