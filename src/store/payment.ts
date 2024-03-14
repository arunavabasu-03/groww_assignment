// PaymentMethodsStore.js

import { create } from "zustand";

// Define the structure of the store's state
export interface PaymentMethodsState {
  paymentMethods: string[];
  selectedPaymentMethod: string | null;
  loading: boolean;
  error: string | null;
  fetchPaymentMethods: () => Promise<void>;
  selectPaymentMethod: (method: string) => void;
}

// Create the Zustand store
export const usePaymentMethodsStore = create<PaymentMethodsState>((set) => ({
  paymentMethods: [],
  selectedPaymentMethod: null,
  loading: false,
  error: null,

  // Fetches payment methods from the API
  fetchPaymentMethods: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        "https://groww-intern-assignment.vercel.app/v1/api/order-details"
      );
      if (!response.ok) throw new Error("API call failed");
      const data = await response.json();
      set({ paymentMethods: data.paymentMethods, loading: false });
    } catch (error) {
      set({ error:"error", loading: false });
    }
  },

  // Selects a payment method
  selectPaymentMethod: (method: string) => {
    set({ selectedPaymentMethod: method });
  },
}));
