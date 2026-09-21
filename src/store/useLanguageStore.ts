import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";
import { Language } from "@/lib/translations";

interface LangState {
  langByUser: Record<string, Language>;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LangState>()(
  persist(
    (set) => ({
      langByUser: {},
      setLanguage: (lang: Language) => {
        const currentUser = useAuthStore.getState().currentUser;
        if (!currentUser) return;

        set((state) => ({
          langByUser: {
            ...state.langByUser,
            [currentUser.email]: lang,
          },
        }));
      },
    }),
    { name: "language-storage" },
  ),
);
