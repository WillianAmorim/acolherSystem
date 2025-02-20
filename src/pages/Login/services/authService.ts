import axios from "axios";
import api from "../../../core/http";

export const login = async (email: string, password: string) => {
  const response = await api.post("/login", { email, password });
  const token = response.data.token;

  localStorage.setItem("authToken", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return token;
};

export const fetchUserData = async () => {
  const response = await api.get("/me");
  localStorage.setItem("usuarioLogado", JSON.stringify(response.data));
  return response.data;
};
