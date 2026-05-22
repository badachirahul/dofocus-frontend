import axios from "axios";
import { BASE_URL } from "../../config/config";
import { getToken } from "../../utils/localStorage";

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["Content-Type"] = "application/json";

  return config;
});

export const getProfileData = async (userId) => {
  const response = await API.get(`/profile/${userId}`);

  return response.data;
};

export const getDayDetails = async (userId, date) => {
  const response = await API.get(`/profile/${userId}/${date}`);

  return response.data;
};
