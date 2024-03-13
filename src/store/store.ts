import { TProduct } from "@/types/types";
import { create } from "zustand";

export interface StoreState {
  products: TProduct[];
  paymentMethods: string[];
  loading: boolean;
  error: string | null;
  fetchOrderDetails: () => Promise<void>;
  removeFromCart: (productId: number) => void;
  cartTotal: () => number;
}

const useStore = create<StoreState>((set, get) => ({
  // Initial state
  products: [],
  paymentMethods: [],
  loading: false,
  error: null, // Add error state

  // Action to fetch order details
  fetchOrderDetails: async () => {
    set({ loading: true, error: null }); // Reset error state on new fetch
    try {
      const response = await fetch(
        "https://groww-intern-assignment.vercel.app/v1/api/order-details"
      );
      if (!response.ok) throw new Error("Failed to fetch data from the server");
      const data: { products: TProduct[]; paymentMethods: string[] } =
        await response.json();
      set({ ...data, loading: false });
    } catch (error) {
      console.error("Fetch error:", error);
      set({
        loading: false,
        error: "Failed to load order details. Please try again.",
      });
    }
  },

  // Remove item from cart
  removeFromCart: (productId: number) => {
    const { products } = get();
    const updatedProducts = products
      .map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      })
      .filter((product) => product.quantity > 0); // Remove item if quantity is 0
    set({ products: updatedProducts });
  },

  // Calculate cart total
  cartTotal: () => {
    const { products } = get();
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  },
}));

