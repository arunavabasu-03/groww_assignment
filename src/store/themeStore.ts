import { create } from "zustand";

interface TThemeStore {
  theme: any;
}
interface TThemeActions {
  setTheme: any;
}
const useThemeStore = create<TThemeStore & TThemeActions>((set) => ({
  theme: {},
  setTheme: (newTheme: any) => set({ theme: newTheme }),
}));

export default useThemeStore;
