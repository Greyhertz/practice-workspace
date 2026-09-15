// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { useAuthStore } from "./useAuthStore";
// import { useActivityStore } from "./useActivityStore";
// import { storageKey } from "./useAuthStore";
// interface UserState {
//   userName: string;
//   pointsByUser: Record<string, number>
//   updateName: (newName: string) => void;
//   addPoint: (amount: number) => void;
// }
// const addLog = useActivityStore.getState().addLog;
// const currentUser = useAuthStore.getState().currentUser;
// export const useUserStore = create<UserState>()(
//   persist(
//     (set) => ({
//       userName: currentUser?.name || "Guest",
//       pointsByUser: {},
//       updateName: (newName) => set({ userName: newName }),
//       // addPoint: (amount) => {
//       //   set((state) => ({ points: state.points + amount }));
//       //   addLog({ text: `Earned ${amount}`, type: "xp" });
//       // },
//       addPoint: useAuthStore.getState().currentUser
//     }),
//     { name: "user-xp-storage" },
//   ),
// );

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";
import { useActivityStore } from "./useActivityStore";
import { WindIcon } from "lucide-react";

interface UserState {
  userName: string;
  pointsByUser: Record<string, number>;
  // updateName: (newName: string) => void;
  addPoint: (amount: number) => void;
  // clearPoints: (amount: number) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      userName: "Guest", // we'll revisit this separately, per your earlier note
      pointsByUser: {},
      // updateName: (newName) => set({ userName: newName }),
      addPoint: (amount) => {
        const currentUser = useAuthStore.getState().currentUser;
        if (!currentUser) return; // your call: silently do nothing for guests

        set((state) => {
          const currentPoints = state.pointsByUser[currentUser.email] ?? 0;

          return {
            pointsByUser: {
              ...state.pointsByUser,
              [currentUser.email]: currentPoints + amount,
            },
          };
        });
        useActivityStore.getState().addLog({
          text: `Earned ${amount} XP`,
          type: "xp",
        });
      },
      // clearPoints: (amount) => {
      //    const currentUser = useAuthStore.getState().currentUser;
      //   if (window.confirm("Points will be reduced to 0")) {
      //     set({ pointsByUser: {} });
      //   }
      //   useActivityStore.getState().addLog({
      //     text: `Earned ${amount} XP`,
      //     type: "xp",
      //   });
      // },
    }),
    { name: "user-xp-storage" },
  ),
);
