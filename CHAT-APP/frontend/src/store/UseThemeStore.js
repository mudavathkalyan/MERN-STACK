import { create } from "zustand";

const UseThemeStore = create((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
}));

export default UseThemeStore;
