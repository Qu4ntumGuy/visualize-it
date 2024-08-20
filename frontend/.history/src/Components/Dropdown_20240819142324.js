import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0] || null);
  const dropdownRef = useRef(null);
  // const [theme, settheme] = useRecoilState(themeState); // [1
  const { resolvedTheme, theme, setTheme } = useTheme();

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative h-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex w-full justify-between border h-full items-center p-2 px-3 ${
          theme === "light"
            ? "border-gray-300 hover:bg-gray-100"
            : "border-gray-700 hover:bg-gray-800"
        } rounded-md shadow-sm  focus:outline-none `}
      >
        {selectedOption ? selectedOption.label : "Select an option"}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={` ${
            theme === "light"
              ? "bg-gray-300 text-black"
              : "bg-gray-900 text-gray-300"
          } origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg focus:outline-none z-10`}
        >
          <div
            className=""
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option)}
                className={`block w-full text-left px-4 py-2 h-11 ${
                  theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-800"
                } focus:outline-none`}
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
