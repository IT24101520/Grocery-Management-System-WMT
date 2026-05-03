import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SERVER_URL = "http://10.11.137.67:5001";
const BASE_URL = `${SERVER_URL}/api`;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getImageUri = (imageUrl) => {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('data:')) return imageUrl;
  return `${SERVER_URL}${imageUrl}`;
};

export default api;
