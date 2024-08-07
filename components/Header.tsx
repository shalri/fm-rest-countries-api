import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="px-4 py-[30px] bg-rc-white md:px-8 flex justify-between items-center md:py-[60px] dark:bg-rc-dark-blue-dm shadow-lg shadow-black">
      <h1 className="font-bold md:text-[28px] text-[14px]">Where in the world?</h1>
      <DarkModeToggle />
    </header>
  )
}
