import axios from "axios";

const API_URL = "https://teamtaskmanager-rlum.onrender.com/api/tasks";


// GET TASKS
export const getTasks = async () => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    API_URL,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const createTask = async (taskData) => {

  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    taskData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const updateTaskStatus = async (
  id,
  status
) => {

  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/${id}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};