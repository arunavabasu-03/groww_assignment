import { create } from "zustand";
import { TProduct } from "@/types/types";

interface TCartState {
  loading: boolean;
  error: string | null;
  products: TProduct[]; // all the products
  paymentMethods: string[]; // all the payment methods
  taxRate: number; // Added tax rate
}
interface TCartActions {
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

export const useCartStore = create<TCartState & TCartActions>((set, get) => ({
  products: [],
  paymentMethods: [],
  loading: false,
  error: null,
  taxRate: 0.18,

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
