import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,


  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in checkAuth:", error?.response?.data?.message || error.message || "Unknown error");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("Signup error:", errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("Login error:", errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // logout: async () => {
  //   try {
  //     await axiosInstance.post("/auth/logout");
  //     set({ authUser: null });
  //     toast.success("Logged out successfully");
  //   } catch (error) {
  //     const errorMessage =
  //       error?.response?.data?.message || error?.message || "Something went wrong";
  //     toast.error(errorMessage);
  //     console.error("Logout error:", errorMessage);
  //   }
  // },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("Update profile error:", errorMessage);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },


  initializeSocket: () => {
    const socketInstance = io("http://localhost:5001"); // Replace with your socket server URL
    set({ socket: socketInstance });

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected.");
    });
  },

  logout: async () => {
    try {
      const socket = get().socket;
      if (socket) socket.disconnect(); // Disconnect socket on logout

      await axiosInstance.post("/auth/logout");
      set({ authUser: null, socket: null }); // Clear authUser and socket state
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  },
}));
