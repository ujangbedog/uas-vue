import { reactive, computed } from "vue";
import type { Product } from "@/services/productService";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const state = reactive<CartState>({
  items: [],
});

export const useCartStore = () => {
  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = state.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      state.items.push({ product, quantity });
    }
  };

  const removeFromCart = (productId: number) => {
    const index = state.items.findIndex(
      (item) => item.product.id === productId
    );
    if (index !== -1) {
      state.items.splice(index, 1);
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    const item = state.items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  };

  const clearCart = () => {
    state.items = [];
  };

  const totalItems = computed(() => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return state.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  });

  return {
    items: computed(() => state.items),
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
};
