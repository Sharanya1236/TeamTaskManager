import {
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Register() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("member");

  const handleRegister =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            name,
            email,
            password,
            role,
          }
        );

        navigate("/");

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] text-white px-4">

      <form
        onSubmit={handleRegister}
        className="bg-[#111827] p-8 rounded-2xl w-full max-w-md border border-gray-800"
      >

        <h1 className="text-4xl font-bold mb-2 text-center">

          Register 🚀

        </h1>

        <p className="text-gray-400 text-center mb-8">

          Create your account

        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-4"
          required
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          className="w-full p-3 rounded-lg bg-black border border-gray-700 mb-6"
        >

          <option value="member">
            Team Member
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 transition p-3 rounded-lg font-semibold"
        >

          Register

        </button>

        <p className="text-center text-gray-400 mt-6">

          Already have an account?
          {" "}

          <Link
            to="/"
            className="text-green-400 hover:underline"
          >

            Login

          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;