import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";
interface LogActivity {
  id: string;
  text: string;
  timestamp: Date;
  type: "task" | "client" | "xp";
}

interface LogState {
  logs: LogActivity[];
  addLog: (log: { text: string; type: "task" | "client" | "xp" }) => void;
}

// const getCurrentUser = useAuthStore.getState().currentUser;
export const useActivityStore = create<LogState>()(
  persist(
    (set) => ({
      logs: [],
      addLog: (log) =>
        set((state) => ({
          logs: [
             {
              id: Date.now().toString(),
              text: log.text,
              timestamp: new Date(),
              type: log.type,
            },
            ...state.logs,
           
          ],
        })),
    }),
    { name: "logs" },
  ),
);
