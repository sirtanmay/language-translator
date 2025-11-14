"use client";

import { useStore } from "@/store/useStore";
import { languages } from "@/lib/languages";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface LanguageSelectorProps {
  readonly value: string;
  readonly onChange: (lang: string) => void;
  readonly label: string;
}

export default function LanguageSelector({
  value,
  onChange,
  label,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useStore();

  const selectedLanguage = languages.find((lang) => lang.code === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label
        className={`block text-sm font-medium mb-2 ${
          theme === "dark" ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {label}
      </label>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-xl flex items-center justify-between transition-all duration-300 ${
          theme === "dark"
            ? "bg-gray-800 text-white border border-gray-700 hover:border-purple-500"
            : "bg-white text-gray-900 border border-gray-300 hover:border-purple-400 shadow-sm"
        }`}
      >
        <span className="flex items-center gap-2">
          <span className="text-2xl">{selectedLanguage?.flag}</span>
          <span className="font-medium">{selectedLanguage?.name}</span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 w-full mt-2 rounded-xl overflow-hidden shadow-2xl border ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="max-h-64 overflow-y-auto overflow-x-hidden custom-scrollbar">
              {languages.map((lang) => {
                const isSelected = value === lang.code;
                const selectedBg =
                  theme === "dark" ? "bg-purple-900/30" : "bg-purple-100";

                return (
                  <motion.button
                    key={lang.code}
                    whileHover={{ x: 4 }}
                    onClick={() => {
                      onChange(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                      theme === "dark"
                        ? "hover:bg-gray-700 text-white"
                        : "hover:bg-gray-100 text-gray-900"
                    } ${isSelected ? selectedBg : ""}`}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                    {isSelected && (
                      <span className="ml-auto text-purple-500">✓</span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
