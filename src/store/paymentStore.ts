import { create } from "zustand";

export interface TPaymentMethodsState {
  loading: boolean;
  error: string | null;
  paymentMethods: string[];
  selectedPaymentMethod: string | null;
}

export interface TPaymentMethodsAction {
  setPaymentMethods: (paymentMethods: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  selectPaymentMethod: (method: string) => void;
}

export const usePaymentMethodsStore = create<
  TPaymentMethodsState & TPaymentMethodsAction
>((set) => ({
  paymentMethods: [],
  selectedPaymentMethod: null,
  loading: false,
  error: null,
  setPaymentMethods: (paymentMethods) => set(() => ({ paymentMethods })),
  setLoading: (loading) => set(() => ({ loading })),
  setError: (error) => set(() => ({ error })),
  selectPaymentMethod: (method) =>
    set(() => ({ selectedPaymentMethod: method })),
}));
