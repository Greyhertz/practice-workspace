import { useAuthStore } from "@/store/useAuthStore";
// could live in useAuthStore.ts, or its own file like useStorageKey.ts
export function useTaskStorageKey() {
  const currentUser = useAuthStore((state) => state.currentUser);
  return currentUser ? `expedition-tasks-${currentUser.email}` : "expedition-tasks-guest";
}
export function useClientStorageKey() {
   const currentUser = useAuthStore((state) => state.currentUser);
  return currentUser ? `expedition-clients-${currentUser.email}` : "expedition-tasks-guest";
}