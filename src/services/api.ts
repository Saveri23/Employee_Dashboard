import axios from "axios";

export const fetchEmployees = async () => {
  const response = await axios.post(
    "/api/gettabledata.php",
    {
      username: "test",
      password: "123456",
    }
  );

  return response.data;
};