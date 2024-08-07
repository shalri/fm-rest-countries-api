"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { useCountry, Country } from './CountryContext';
import BorderLinkComponent from "./BorderLinkComponent";
import { MdKeyboardBackspace } from "react-icons/md";

export default function CountryPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const { countries } = useCountry();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountry = () => {
      setLoading(true);
      if (code) {
        const selectedCountry = countries.find(c => c.alpha2Code === code || c.alpha3Code === code);
        setCountry(selectedCountry || null);
      }
      setLoading(false);
    };

    fetchCountry();
  }, [code, countries]);
  useEffect(() => {
    if (country) {
      console.log(country.languages);
    }
  }, [country]);

  if (loading || !country) {
    return <p>Loading...</p>; // Loading indicator
  }

  // if (!country && !loading) {
  //   return <p>Country not found</p>; // Error message for country not found
  // }
  // Log the country details conditionally
  return (
    <main className="px-7 mt-9">
      <button className="mt-4 flex justify-center items-center cursor-pointer dark:bg-rc-dark-blue-dm bg-rc-white px-6 py-2 text-[14px] shadow-xl rounded-md shadow-black" onClick={() => history.back()}>
        <MdKeyboardBackspace className="text-[20px] mr-2" /> Back
      </button>
      <div className="mt-16 bg-rc-white dark:bg-rc-dark-blue-dm shadow-xl shadow-black rounded-lg overflow-hidden">
        <div className="w-full aspect-w-4 aspect-h-3">
          <img src={country.flags.svg} alt={`${country.name} flag`} className="object-cover w-full h-full" />
        </div>
        <h2>{country.name}</h2>
        <h3>Population: {country.population.toLocaleString()}</h3>
        <h3 className="">Region: {country.region}</h3>
        <h3 className="">Capital: {country.capital ? country.capital : "N/A"}</h3>
        <h3 className="">Top Level Domain: {country.topLevelDomain.join(", ")}</h3>
        <h3 className="">Currencies: {country.currencies.map(currency => currency.name).join(", ")}</h3>
        <h3 className="">Languages: {country.languages.join(", ")}</h3>

        <BorderLinkComponent borders={country.borders} />
      </div>
    </main>
  );
}

