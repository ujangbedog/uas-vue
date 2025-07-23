import { api, handleApiError } from "@/lib/api";

export interface User {
  id?: number;
  name: string;
  email: string;
  avatar?: string;
}

export const userService = {
  getAll: async (): Promise<User[]> => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      return handleApiError(error, "fetching users");
    }
  },

  getById: async (id: number): Promise<User> => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error, `fetching user with id ${id}`);
    }
  },

  create: async (user: User): Promise<User> => {
    try {
      const response = await api.post("/users", user);
      return response.data;
    } catch (error) {
      return handleApiError(error, "creating user");
    }
  },

  update: async (id: number, user: User): Promise<User> => {
    try {
      const response = await api.put(`/users/${id}`, user);
      return response.data;
    } catch (error) {
      return handleApiError(error, `updating user with id ${id}`);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      handleApiError(error, `deleting user with id ${id}`);
    }
  },
};
