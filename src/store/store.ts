import { TProduct } from "@/types/types";
import { create } from "zustand";

export interface StoreState {
  products: TProduct[];
  paymentMethods: string[];
  loading: boolean;
  error: string | null;
  fetchOrderDetails: () => Promise<void>;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  removeEntireFromCart: (productId: number) => void;
  cartTotal: () => number;
  taxRate: number; // Added tax rate
  taxAmount: () => number; // Added tax amount
  finalTotal: () => number; // Added final total
}

export const useStore = create<StoreState>((set, get) => ({
  // Initial state
  products: [],
  paymentMethods: [],
  loading: false,
  error: null, // Add error state
  taxRate: 0.18,

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
  taxAmount: () => {
    const cartTotal = get().cartTotal();
    return cartTotal * get().taxRate; // 18% of cart total
  },
  finalTotal: () => {
    const cartTotal = get().cartTotal();
    const taxAmount = get().taxAmount();
    return cartTotal + taxAmount; // Sum of cart total and tax
  },
  addToCart: (productId: number) => {
    const { products } = get();
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    set({ products: updatedProducts });
  },
  removeFromCart: (productId: number) => {
    const { products } = get();
    const updatedProducts = products
      .map((product) => {
        if (product.id === productId) {
          const newQuantity = product.quantity - 1;
          return { ...product, quantity: newQuantity >= 0 ? newQuantity : 0 };
        }
        return product;
      })
      .filter((product) => product.quantity > 0); // Keep items with quantity more than 0
    set({ products: updatedProducts });
  },
  removeEntireFromCart: (productId: number) => {
    const { products } = get();
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
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

