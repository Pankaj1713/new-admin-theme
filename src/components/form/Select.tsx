import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  name: string;
  value: string;
  onChange: (e: any) => void; // Uses 'any' to accept our synthetic Formik event
  onBlur: (e: any) => void;
  className?: string;
  error?: boolean;
  hint?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  name,
  value,
  onChange,
  onBlur,
  className = "",
  error = false,
  hint,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          setIsOpen(false);
          // Trigger Formik's validation when clicking away
          onBlur({ target: { name } });
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, name, onBlur]);

  // Handle selecting an item
  const handleSelect = (option: Option) => {
    // Send a synthetic event back to Formik's handleChange
    onChange({ target: { name, value: option.value } });
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  // Dynamic Styles
  let selectClasses = `flex items-center justify-between h-11 w-full rounded-lg border bg-transparent px-4 py-2.5 text-sm shadow-theme-xs cursor-pointer focus:outline-hidden focus:ring-3 dark:bg-gray-900 transition-colors duration-200 ${
    value
      ? "text-gray-800 dark:text-white/90"
      : "text-gray-400 dark:text-gray-400"
  } ${className}`;

  if (error) {
    selectClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  } else {
    selectClasses += ` border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800`;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* The main trigger button */}
      <div
        className={selectClasses}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Animated Chevron Icon */}
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* The Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 z-50 w-full mt-1 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 max-h-60"
          >
            <ul className="py-1">
              {options.map((option) => (
                <li
                  key={option.value}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 ${
                    value === option.value
                      ? "bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 font-medium"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Error Animation */}
      <div className="h-[22px] mt-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {error && hint && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-error-500 text-xs"
            >
              {hint}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Select;
