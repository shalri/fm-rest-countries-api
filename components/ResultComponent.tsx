"use client";
import { CountryProvider } from "./CountryContext";
import FilterComponent from "./FilterComponent";

export default function ResultComponent() {
  return (
    <CountryProvider>
      <main>
        <FilterComponent />
        Results
      </main>
    </CountryProvider>

  )
}
