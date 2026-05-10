import {
  Users,
  Mail,
  ShieldCheck,
} from "lucide-react";
import {
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";
import {
  useEffect,
  useState,
} from "react";

import {
  getUsers,
} from "../services/userService";

const Team = () => {
  const navigate =
  useNavigate();
  const [members, setMembers] =
    useState([]);
  const [search, setSearch] =
  useState("");

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers =
    async () => {

      try {

        const data =
          await getUsers();

        setMembers(data);

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Team 👥
        </h1>

        <p className="text-gray-400 mt-2">
          Collaborate with your team members.
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
      <div className="mb-6">

  <input
    type="text"
    placeholder="Search team members..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="w-full md:w-[350px] p-3 rounded-xl bg-[#111827] border border-gray-700 outline-none"
  />

</div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {
  members
  .filter((member) =>
    (member.name || "")
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  )
    .map((member) => (

          <div
            key={member._id}
            className="bg-[#111827] border border-gray-800 rounded-2xl p-6"
          >

            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-2xl font-bold mb-5">

              {member.name?.charAt(0)}

            </div>

            {/* Name */}
            <h2 className="text-2xl font-semibold mb-1">

              {member.name}

            </h2>

            {/* Role */}
            <div className="flex items-center gap-2 text-green-400 mb-4">

              <ShieldCheck size={18} />

              <span>

                {member.role || "Member"}

              </span>

            </div>

            {/* Email */}
            <div className="flex items-center gap-2 text-gray-400 mb-4">

              <Mail size={18} />

              <span>

                {member.email}

              </span>

            </div>

            {/* Assigned Tasks */}
            <div className="flex items-center justify-between bg-[#0B0F19] border border-gray-700 rounded-xl p-4">

              <div className="flex items-center gap-2">

                <Users
                  size={18}
                  className="text-blue-400"
                />

                <span>
                  Assigned Tasks
                </span>

              </div>

              <span className="text-xl font-bold text-blue-400">

                {member.taskCount}

              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Team;