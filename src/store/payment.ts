import { create } from "zustand";

export interface TPaymentMethodsState {
  loading: boolean;
  error: string | null;
  paymentMethods: string[]; // all the payment methods
  selectedPaymentMethod: string | null; // selected payment  method
}

export interface TPaymentMethodsAction {
  fetchPaymentMethods: () => Promise<void>; // fetching the payment methods
  selectPaymentMethod: (method: string) => void; // setting  the payment methods
}
export const usePaymentMethodsStore = create<
  TPaymentMethodsState & TPaymentMethodsAction
>((set) => ({
  paymentMethods: [],
  selectedPaymentMethod: null,
  loading: false,
  error: null,
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
      set({ error: "error", loading: false });
    }
  },

  selectPaymentMethod: (method: string) => {
    set({ selectedPaymentMethod: method });
  },
}));
