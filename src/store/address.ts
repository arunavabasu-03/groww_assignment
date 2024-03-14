import { create } from "zustand";

export interface AddressState {
  address: string;
  city: string;
  pin: string;
  setAddress: (address: string) => void;
  setCity: (city: string) => void;
  setPin: (pin: string) => void;
}

export const useAddressStore = create<AddressState>((set) => ({
  address: "",
  city: "",
  pin: "",
  setAddress: (address) => set({ address }),
  setCity: (city) => set({ city }),
  setPin: (pin) => set({ pin }),
}));
