import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <h1 className="">Where in the world?</h1>
      <DarkModeToggle />

      {/* <button className="">Dark Mode</button> */}
    </header>
  )
}
