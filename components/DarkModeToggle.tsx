"use client";
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
    htmlElement.classList.toggle('dark');
    if (newMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="">{
        isDarkMode ?
          (<div className="flex">
            <MdOutlineDarkMode /> Dark
          </div>) :
          (<div className="flex">
            <MdOutlineLightMode /> Light
          </div>)
      }
    </button>
  )
}
