import { create } from "zustand";
import { TProduct } from "@/types/types";

export interface TCartState {
  loading: boolean;
  error: string | null;
  products: TProduct[]; // all the products
  paymentMethods: string[]; // all the payment methods
  taxRate: number; // Added tax rate
}
export interface TCartActions {
  fetchOrderDetails: () => Promise<void>;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  removeEntireFromCart: (productId: number) => void;
  cartTotal: () => number;
  taxAmount: () => number; // Added tax amount
  finalTotal: () => number; // Added final total
  setProducts: (products: TProduct[]) => void;
  setPaymentMethods: (paymentMethods: string[]) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<TCartState & TCartActions>((set, get) => ({
  // Initial state
  products: [],
  paymentMethods: [],
  loading: false,
  error: null,
  taxRate: 0.18,

  fetchOrderDetails: async () => {
    set({ loading: true, error: null });
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
    return cartTotal * get().taxRate;
  },
  finalTotal: () => {
    const cartTotal = get().cartTotal();
    const taxAmount = get().taxAmount();
    return cartTotal + taxAmount;
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
      .filter((product) => product.quantity > 0);
    set({ products: updatedProducts });
  },
  removeEntireFromCart: (productId: number) => {
    const { products } = get();
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    set({ products: updatedProducts });
  },
  cartTotal: () => {
    const { products } = get();
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  },
  setProducts: (products) => set(() => ({ products })),
  setPaymentMethods: (paymentMethods) => set(() => ({ paymentMethods })),
  setError: (error) => set(() => ({ error })),
  setLoading: (loading) => set(() => ({ loading })),
}));
