import { create } from "zustand";

export interface UserInfoState {
  address: string;
  city: string;
  pin: string;
  selectedPaymentMethod: string | null;
  setAddress: (address: string) => void;
  setCity: (city: string) => void;
  setPin: (pin: string) => void;
  setSelectedPaymentMethod: (method: string) => void;
}

export const useUserInfoStore = create<UserInfoState>((set) => ({
  address: "",
  city: "",
  pin: "",
  selectedPaymentMethod: null,
  setAddress: (address) => set({ address }),
  setCity: (city) => set({ city }),
  setPin: (pin) => set({ pin }),
  setSelectedPaymentMethod: (method) => set({ selectedPaymentMethod: method }),
}));
