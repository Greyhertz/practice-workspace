import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";
import { useActivityStore } from "./useActivityStore";
interface UserState {
  userName: string;
  points: number;
  updateName: (newName: string) => void;
  addPoint: (amount: number) => void;
}
const addLog = useActivityStore.getState().addLog;
const currentUser = useAuthStore.getState().currentUser;
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userName: currentUser?.name || "Guest",
      points: 0,

      updateName: (newName) => set({ userName: newName }),
      addPoint: (amount) => {
        set((state) => ({ points: state.points + amount }));
        addLog({ text: `Earned ${amount}`, type: "xp" });
      },
    }),
    { name: "user-xp-storage" },
  ),
);
