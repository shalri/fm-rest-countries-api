import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="px-4 py-[30px] bg-rc-white md:px-8 md:py-[22px] dark:bg-rc-dark-blue-dm shadow-lg shadow-black/10">
      <div className="md:max-w-[1275px] md:mx-auto flex justify-between items-center ">
        <h1 className="font-bold text-[14px] md:text-[1.475rem]">Where in the world?</h1>
        <DarkModeToggle />
      </div>
    </header>
  )
}
