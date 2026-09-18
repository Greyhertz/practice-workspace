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
  // logs: LogActivity[];
  addLog: (log: { text: string; type: "task" | "client" | "xp" }) => void;
  logsByUser: Record<string, LogActivity[]>;
}

// const getCurrentUser = useAuthStore.getState().currentUser;
export const useActivityStore = create<LogState>()(
  persist(
    (set) => ({
      logsByUser: {},
      addLog: (log) => {
        const currentUser = useAuthStore.getState().currentUser;
        if (!currentUser) return;
        set((state) => {
          const currentLogs = state.logsByUser[currentUser.email] ?? [];
          const newLog: LogActivity = {
            id: Date.now().toString(),
            text: log.text,
            timestamp: new Date(),
            type: log.type,
          };
          return {
            logsByUser: {
              ...state.logsByUser,
              [currentUser.email]: [newLog, ...currentLogs],
            },
          };
        });
      },
    }),
    {
      name: "logs",
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return { logsByUser: {} };
        }
        return persistedState;
      },
    },
  ),
);
