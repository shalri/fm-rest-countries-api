"use client";
import CountryCardComponent from "./CountryCardComponent";
import { CountryProvider } from "./CountryContext";
import FilterComponent from "./FilterComponent";


export default function ResultComponent() {
  return (
    <CountryProvider>
      <FilterComponent />
    </CountryProvider>

  )
}
