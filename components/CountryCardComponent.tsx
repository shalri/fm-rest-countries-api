"use client";

import { useRouter } from "next/navigation";
import { Country } from "./CountryContext";

interface CountryCardComponentProps {
  country: Country;
  index: number;
}

export default function CountryCardComponent({ country, index }: CountryCardComponentProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/country?code=${country.alpha3Code}`)
  }
  return (
    <section
      onClick={handleClick}
      className="rounded-lg overflow-hidden bg-white dark:bg-rc-dark-blue-dm cursor-pointer shadow-lg shadow-black pb-16 mb-8">
      <div key={index} className="w-full">
        <img
          src={country.flags.svg}
          alt={`${country.name} flag`}
          className="w-full"
        />
        <div className="mt-8 px-7">
          <h2 className="font-bold mb-4">{country.name}</h2>
          <h3 className=""><span className="font-semiBold">Population:</span> {country.population.toLocaleString()}</h3>
          <h3 className=""><span className="font-semiBold">Region:</span> {country.region}</h3>
          <h3 className=""><span className="font-semiBold">Capital:</span> {country.capital ? country.capital : "N/A"}</h3>
        </div>
      </div>
    </section>
  )
} 
