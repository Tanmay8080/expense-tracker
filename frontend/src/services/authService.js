import axios from "axios";
const API = "http://localhost:5000/api/auth";

export const signup = (email, password) =>
  axios.post(`${API}/signup`, { email, password });

export const login = async (email, password) => {
  const res = await axios.post(`${API}/login`, { email, password });
  localStorage.setItem("token", res.data.token);
};