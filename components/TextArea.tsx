"use client";

import { useStore } from "@/store/useStore";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface TextAreaProps {
  readonly value: string;
  readonly onChange?: (text: string) => void;
  readonly placeholder: string;
  readonly readOnly?: boolean;
  readonly isTranslating?: boolean;
}

export default function TextArea({
  value,
  onChange,
  placeholder,
  readOnly = false,
  isTranslating = false,
}: TextAreaProps) {
  const { theme } = useStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <div className="relative w-full h-full">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full h-full min-h-[200px] p-6 rounded-2xl resize-none transition-all duration-300 focus:outline-none focus:ring-2 ${
          theme === "dark"
            ? "bg-gray-800 text-white placeholder-gray-500 focus:ring-purple-500 border border-gray-700"
            : "bg-white text-gray-900 placeholder-gray-400 focus:ring-purple-400 border border-gray-300 shadow-sm"
        } ${readOnly ? "cursor-default" : ""}`}
      />

      {isTranslating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 right-4"
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className={`w-2 h-2 rounded-full ${
                  theme === "dark" ? "bg-purple-400" : "bg-purple-500"
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}

      {!readOnly && value && (
        <div
          className={`absolute bottom-4 right-4 text-sm ${
            theme === "dark" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {value.length} characters
        </div>
      )}
    </div>
  );
}
