"use client";
import { useEffect, useState } from "react";

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
    // {/* <button className="">Dark Mode</button> */}
    <button
      onClick={toggleDarkMode}
      className="">{isDarkMode ? '🌙' : '☀️'}</button>
  )
}
