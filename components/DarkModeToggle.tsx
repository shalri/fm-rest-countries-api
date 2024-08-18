"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md"

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      htmlElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      htmlElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = (!isDarkMode);
    setIsDarkMode(newMode);

    const theme = newMode ? "dark" : "light";
    localStorage.setItem('theme', theme);

    const htmlElement = document.documentElement;
    if (newMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="text-[12px] md:text-[25px] overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <div className="">
          {isDarkMode ?
            (<motion.div
              key="light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center">
              <MdOutlineLightMode className="text-[16px] md:text-[30px]" /> <span className="pl-2 md:pl-4 font-semiBold">Light Mode</span>
            </motion.div>) :
            (<motion.div
              key="dark"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center">
              <MdOutlineDarkMode className="text-[16px] md:text-[30px]" /> <span className="pl-2 md:pl-4 font-semiBold">Dark Mode</span>
            </motion.div>)
          }
        </div>
      </AnimatePresence>
    </button>
  )
}
