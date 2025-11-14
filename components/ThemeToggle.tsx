"use client";

import { useStore } from "@/store/useStore";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useStore();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`p-3 rounded-full transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
          : "bg-gray-200 text-purple-600 hover:bg-gray-300"
      }`}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
      </motion.div>
    </motion.button>
  );
}
