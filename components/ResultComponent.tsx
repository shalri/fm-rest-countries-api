"use client";
import CountryCardComponent from "./CountryCardComponent";
import { CountryProvider } from "./CountryContext";
import FilterComponent from "./FilterComponent";


export default function ResultComponent() {
  return (
    <CountryProvider>
      <main>
        <FilterComponent />
        {/* <CountryCardComponent country={country} index={index} /> */}
      </main>
    </CountryProvider>

  )
}
