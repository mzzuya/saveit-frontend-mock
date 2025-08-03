import { create } from "zustand"


const useTokenStore = create((set) => ({
  token: localStorage.getItem("jwt") || null,
  setToken: (token) => {
    localStorage.setItem("jwt", token);
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem("jwt");
    set({ token: null });
  },
}));

export default useTokenStore