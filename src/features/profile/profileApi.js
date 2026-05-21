import axios from "axios";
import { BASE_URL } from "../../config/config";

const API = axios.create({
  baseURL: BASE_URL,
});

export const getProfileData = async (userId) => {
  const response = await API.get(`/profile/${userId}`);

  return response.data;
};

export const getDayDetails = async (userId, date) => {
  const response = await API.get(`/profile/${userId}/${date}`);

  return response.data;
};
