import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserAccount {
  name: string;
  email: string;
  password?: string; // In a real app, we never store passwords in plain text!
}

interface AuthState {
  [x: string]: any;
  registeredUsers: UserAccount[]; // Our "Database"
  currentUser: UserAccount | null; // Our "Session"

  signup: (newUser: UserAccount) => boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      registeredUsers: [],
      currentUser: null,

      signup: (newUser: UserAccount) => {
        const users = get().registeredUsers;
        const exists = users.find((u) => u.email === newUser.email);

        if (exists) return false; // Email already taken

        set({ registeredUsers: [...users, newUser] });
        return true;
      },

      login: (email, pass) => {
        const users = get().registeredUsers;
        const user = users.find(
          (u) => u.email === email && u.password === pass,
        );

        if (user) {
          set({ currentUser: user });
          return true;
        }
        return false;
      },

      logout: () => set({ currentUser: null }),
    }),
    { name: "auth-storage" },
  ),
);
