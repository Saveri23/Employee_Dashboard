import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const fetchEmployees = async () => {
  try {
    const response = await axios.post(
      `${API}/gettabledata.php`,
      {
        username: "test",
        password: "123456",
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};