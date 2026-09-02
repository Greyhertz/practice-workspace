import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useAuthStore } from './useAuthStore';
interface UserState {
  userName: string;
  points: number;
  updateName: (newName: string) => void;
  addPoint: (amount: number) => void
}

// const currentUser = useAuthStore.getState().currentUser?.name || 'Guest';
const currentUser = useAuthStore.getState().currentUser;
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userName: currentUser?.name || 'Guest',
      points: 0,
      updateName: (newName) => set({ userName: newName }),
      addPoint: (amount) => set((state) => ({ points: state.points + amount })),
    }),
    { name: 'user-xp-storage' }
  )
)

