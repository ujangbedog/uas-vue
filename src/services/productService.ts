import { api, handleApiError } from "@/lib/api";

export interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: string;
}

export const productService = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      return handleApiError(error, "fetching products");
    }
  },

  getById: async (id: number): Promise<Product> => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      return handleApiError(error, `fetching product with id ${id}`);
    }
  },

  create: async (product: Product): Promise<Product> => {
    try {
      const response = await api.post("/products", product);
      return response.data;
    } catch (error) {
      return handleApiError(error, "creating product");
    }
  },

  update: async (id: number, product: Product): Promise<Product> => {
    try {
      const response = await api.put(`/products/${id}`, product);
      return response.data;
    } catch (error) {
      return handleApiError(error, `updating product with id ${id}`);
    }
  },

  delete: async (id: number): Promise<void> => {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      handleApiError(error, `deleting product with id ${id}`);
    }
  },
};
