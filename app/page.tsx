"use client";

import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import Translator from "@/components/Translator";
import { Languages } from "lucide-react";

export default function Home() {
  const { theme } = useStore();

  return (
    <main
      className={`min-h-screen transition-all duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"
          : "bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full blur-3xl ${
            theme === "dark"
              ? "bg-purple-600 opacity-20"
              : "bg-purple-400 opacity-30"
          }`}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-3xl ${
            theme === "dark"
              ? "bg-pink-600 opacity-20"
              : "bg-pink-400 opacity-30"
          }`}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [180, 270, 180],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 rounded-full blur-3xl ${
            theme === "dark"
              ? "bg-blue-600 opacity-10"
              : "bg-blue-400 opacity-25"
          }`}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`p-3 rounded-2xl ${
                theme === "dark"
                  ? "bg-gradient-to-br from-purple-600 to-pink-600"
                  : "bg-gradient-to-br from-purple-500 to-pink-500"
              }`}
            >
              <Languages size={32} className="text-white" />
            </motion.div>
            <div>
              <h1
                className={`text-3xl md:text-4xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                LinguaFlow
              </h1>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Real-time language translation
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>

        {/* Main Translator Component */}
        <Translator />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={`mt-12 text-center text-sm ${
            theme === "dark" ? "text-gray-500" : "text-gray-600"
          }`}
        >
          <p>Powered by advanced AI translation technology</p>
          <p className="mt-2">Supporting 20+ languages worldwide</p>
        </motion.footer>
      </div>
    </main>
  );
}
