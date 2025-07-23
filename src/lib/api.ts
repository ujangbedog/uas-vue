import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://68615b7a8e7486408445b929.mockapi.io/api/v1";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleApiError = (error: any, context: string): never => {
  console.error(`Error ${context}:`, error);
  throw error;
};
