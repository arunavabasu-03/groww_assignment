// stores/useThemeStore.js
import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: {}, // Initial empty theme
  setTheme: (newTheme: any) => set({ theme: newTheme }),
}));

export default useThemeStore;
