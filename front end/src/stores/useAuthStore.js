import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
    token: localStorage.getItem("token") || null,
    user: null,
    loading: false, // Añadido para manejar el estado de carga
  
    login: async (email, password) => {
      try {
        set({ loading: true }); // Inicia el estado de carga
        const response = await axios.post("/api/users/login", {
          email,
          password,
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        set({ token });
  
        await useAuthStore.getState().fetchUser(); // Carga el usuario después del login
      } catch (error) {
        throw error;
      } finally {
        set({ loading: false }); // Termina el estado de carga
      }
    },
  
    register: async (email, password, nombre, direccion, telefono) => {
      try {
        set({ loading: true }); // Inicia el estado de carga
        const response = await axios.post("/api/users/register", {
          email,
          password,
          nombre,
          direccion,
          telefono,
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        set({ token });
  
        await useAuthStore.getState().fetchUser(); // Carga el usuario después del registro
      } catch (error) {
        throw error;
      } finally {
        set({ loading: false }); // Termina el estado de carga
      }
    },
  
    logout: () => {
      set({ token: null, user: null, loading: false });
      localStorage.removeItem("token");
    },
  
    fetchUser: async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          set({ loading: true }); // Inicia el estado de carga
          const response = await axios.get("/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ user: response.data });
        } catch (error) {
          console.error("Error fetching user:", error);
          set({ token: null, user: null });
          localStorage.removeItem("token");
        } finally {
          set({ loading: false }); // Termina el estado de carga
        }
      }
    },
  
    // No necesitas `setUser`, ya que `fetchUser` cubre esa funcionalidad
  }));
  
  export default useAuthStore;