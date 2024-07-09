import { create } from "zustand"

const useLogStore = create((set) => ({
    isLoggedIn: false,
    toggleIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }), 
  }))
  
  export { useLogStore }