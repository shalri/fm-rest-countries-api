"use client";

import { Country } from "./CountryContext";

interface CountryCardComponentProps {
  country: Country;
  index: number;
}

export default function CountryCardComponent({ country, index }: CountryCardComponentProps) {
  return (
    <div className="">
      <div key={index} className="">
        <img src={country.flags.svg} alt={`${country.name} flag`} />
        <h2>{country.name}</h2>
        <h3>Population: {country.population.toLocaleString()}</h3>
        <h3 className="">Region: {country.region}</h3>
        <h3 className="">Capital: {country.capital ? country.capital : "N/A"}</h3>
      </div>
    </div>
  )
} 
