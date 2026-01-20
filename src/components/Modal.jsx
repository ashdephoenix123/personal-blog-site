import React, { useEffect, useState } from "react";
import { libre } from "@/app/fonts/fonts";

const Modal = ({ isOpen, onClose, title, content }) => {
  const [value, setValue] = useState(content ?? "");

  const updateText = (e) => {
    const val = e.target.value;
    setValue(val);
  };

  useEffect(() => {
    setValue(content ?? "");
  }, [content, isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl h-full md:max-h-[calc(100%-10rem)] lg:rounded-lg bg-zinc-800 shadow-lg">
        <div class="pattern-bg h-full">
          <div class="overlay p-6 h-full">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2
                className={`text-lg font-semibold border-b border-white/20 min-w-24 ${libre.className}`}
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* body */}
            <textarea
              value={value}
              onChange={updateText}
              className="w-full text-sm h-[calc(100%-53px)] bg-transparent border border-white/20 p-2 px-3 rounded-md outline-none resize-none custom-scrollbar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Modal);
