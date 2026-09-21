import { useAuthStore } from "@/store/useAuthStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { translations, type Language } from "@/lib/translations";

export function useTranslation() {
  const currentUser = useAuthStore((state) => state.currentUser);

  const currentLang: Language = useLanguageStore((state) => {
    if (!currentUser) return "en";

    return state.langByUser[currentUser.email] ?? "en";
  });

  const t = (key: string): string => {
    return translations[currentLang][key] ?? key;
  };

  return { t, currentLang };
}
