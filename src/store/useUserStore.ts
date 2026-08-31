import { create } from 'zustand'

// 1. Define what the data looks like
interface UserState {
  userName: string
  points: number
  updateName: (newName: string) => void
  addPoint: (amount: number) => void
}

// 2. Create the "Shared Brain" (The Store)
export const useUserStore = create<UserState>((set) => ({
  userName: "New Developer",
  points: 0,

  // Action to change the name
  updateName: (newName) => set({ userName: newName }),

  // Action to increment points
  addPoint: (amount) => set((state) => ({ points: state.points + amount })),
}))