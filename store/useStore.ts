import { create } from "zustand";

interface TranslatorState {
  theme: "light" | "dark";
  sourceLanguage: string;
  targetLanguage: string;
  sourceText: string;
  translatedText: string;
  isTranslating: boolean;
  toggleTheme: () => void;
  setSourceLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  setSourceText: (text: string) => void;
  setTranslatedText: (text: string) => void;
  setIsTranslating: (status: boolean) => void;
  swapLanguages: () => void;
}

export const useStore = create<TranslatorState>((set) => ({
  theme: "dark",
  sourceLanguage: "en",
  targetLanguage: "es",
  sourceText: "",
  translatedText: "",
  isTranslating: false,

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),

  setSourceLanguage: (lang) => set({ sourceLanguage: lang }),
  setTargetLanguage: (lang) => set({ targetLanguage: lang }),
  setSourceText: (text) => set({ sourceText: text }),
  setTranslatedText: (text) => set({ translatedText: text }),
  setIsTranslating: (status) => set({ isTranslating: status }),

  swapLanguages: () =>
    set((state) => ({
      sourceLanguage: state.targetLanguage,
      targetLanguage: state.sourceLanguage,
      sourceText: state.translatedText,
      translatedText: state.sourceText,
    })),
}));
