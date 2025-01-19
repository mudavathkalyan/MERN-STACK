import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// Base URL for the socket server
  const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // Check authentication status
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error(
        "Error in checkAuth:",
        error?.response?.data?.message || error.message || "Unknown error"
      );
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Signup function
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

  // Login function
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

  // Update profile
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

  // Initialize socket connection
  initializeSocket: () => {
    const socketInstance = io(BASE_URL); // Connect to socket server
    set({ socket: socketInstance });

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected.");
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
      toast.error("Failed to connect to the server.");
    });
  },

  // Logout user and disconnect socket
  logout: async () => {
    try {
      const socket = get().socket;
      if (socket) socket.disconnect(); // Disconnect socket on logout

      await axiosInstance.post("/auth/logout");
      set({ authUser: null, socket: null }); // Clear authUser and socket state
      toast.success("Logged out successfully");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || error?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("Logout error:", errorMessage);
    }
  },
}));
