import axios from "axios";

const API_URL = "https://teamtaskmanager-production-491c.up.railway.app/api/auth";

export const loginUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/login`,
    userData
  );

  return response.data;
};