"use client";

import { useStore } from "@/store/useStore";
import { useState, useEffect, useCallback } from "react";
import LanguageSelector from "./LanguageSelector";
import TextArea from "./TextArea";
import { ArrowRightLeft, Copy, Volume2, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Translator() {
  const {
    theme,
    sourceLanguage,
    targetLanguage,
    sourceText,
    translatedText,
    isTranslating,
    setSourceLanguage,
    setTargetLanguage,
    setSourceText,
    setTranslatedText,
    setIsTranslating,
    swapLanguages,
  } = useStore();

  const [copied, setCopied] = useState(false);

  // Debounced translation
  useEffect(() => {
    if (!sourceText.trim()) {
      setTranslatedText("");
      return;
    }

    const timer = setTimeout(async () => {
      setIsTranslating(true);

      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: sourceText,
            sourceLang: sourceLanguage,
            targetLang: targetLanguage,
          }),
        });

        const data = await response.json();
        setTranslatedText(data.translatedText || "");
      } catch (error) {
        console.error("Translation error:", error);
        setTranslatedText("Translation failed. Please try again.");
      } finally {
        setIsTranslating(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    sourceText,
    sourceLanguage,
    targetLanguage,
    setTranslatedText,
    setIsTranslating,
  ]);

  const handleCopy = useCallback(async () => {
    if (translatedText) {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [translatedText]);

  const handleSwap = useCallback(() => {
    swapLanguages();
  }, [swapLanguages]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-3xl p-8 shadow-2xl transition-all duration-300 ${
          theme === "dark"
            ? "bg-gray-900/50 backdrop-blur-xl border border-gray-800"
            : "bg-white/80 backdrop-blur-xl border border-gray-200"
        }`}
      >
        {/* Language Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 mb-6">
          <LanguageSelector
            value={sourceLanguage}
            onChange={setSourceLanguage}
            label="From"
          />

          <div className="flex items-end justify-center pb-3">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSwap}
              className={`p-3 rounded-full transition-all duration-300 ${
                theme === "dark"
                  ? "bg-purple-600 hover:bg-purple-500 text-white"
                  : "bg-purple-500 hover:bg-purple-600 text-white"
              }`}
              aria-label="Swap languages"
            >
              <ArrowRightLeft size={20} />
            </motion.button>
          </div>

          <LanguageSelector
            value={targetLanguage}
            onChange={setTargetLanguage}
            label="To"
          />
        </div>

        {/* Text Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <TextArea
              value={sourceText}
              onChange={setSourceText}
              placeholder="Enter text to translate..."
            />
          </div>

          <div className="flex flex-col relative">
            <TextArea
              value={translatedText}
              placeholder="Translation will appear here..."
              readOnly
              isTranslating={isTranslating}
            />

            {translatedText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-4 right-4 flex gap-2"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopy}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                  aria-label="Copy translation"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const utterance = new SpeechSynthesisUtterance(
                      translatedText
                    );
                    utterance.lang = targetLanguage;
                    speechSynthesis.speak(utterance);
                  }}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                  aria-label="Listen to translation"
                >
                  <Volume2 size={18} />
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Character Count & Info */}
        {sourceText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 text-sm text-center ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Real-time translation powered by AI
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
