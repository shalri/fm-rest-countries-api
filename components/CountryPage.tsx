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
        // console.log(selectedCountry);
      }
      setLoading(false);
    };

    fetchCountry();
  }, [code, countries]);

  // Checking the country object
  // useEffect(() => {
  //   if (country) {
  //     console.log(country);
  //   }
  // }, [country]);

  if (loading || !country) {
    return <p>Loading...</p>; // Loading indicator
  }

  // if (!country && !loading) {
  //   return <p>Country not found</p>; // Error message for country not found
  // }
  // Log the country details conditionally
  return (
    <main className="px-7 mt-9 pb-8">
      <button className="mt-4 flex justify-center items-center cursor-pointer dark:bg-rc-dark-blue-dm bg-rc-white px-6 py-2 text-[14px] shadow-rc-shadow rounded-md" onClick={() => history.back()}>
        <MdKeyboardBackspace className="text-[20px] mr-2" /> Back
      </button>

      {/* <section className="mt-16 bg-rc-white dark:bg-rc-dark-blue-dm shadow-xl shadow-black rounded-lg overflow-hidden"> */}
      <section className="mt-16">
        <div className="w-full aspect-w-4 aspect-h-3">
          <img src={country.flags.svg} alt={`${country.name} flag`} className="object-cover w-full h-full" />
        </div>
        <h1 className="mt-8 text-[22px] font-bold">{country.name}</h1>

        <div className="mt-5 flex flex-col gap-y-[11px]">
          <h2 className="text-[14px]"><span className="font-semiBold">Native Name:</span> {country.nativeName}</h2>
          <h2 className="text-[14px]"><span className="font-semiBold">Population:</span> {country.population.toLocaleString()}</h2>
          <h2 className="text-[14px]"><span className="font-semiBold">Region:</span> {country.region}</h2>
          <h2 className="text-[14px]"><span className="font-semiBold">Sub Region:</span> {country.subregion}</h2>
          <h2 className="text-[14px]"><span className="font-semiBold">Capital:</span> {country.capital ? country.capital : "N/A"}</h2>
        </div>

        <div className="mt-[42px] flex flex-col gap-y-[11px]">
          <h3 className="text-[14px]"><span className="font-semiBold">Top Level Domain:</span> {country.topLevelDomain.join(", ")}</h3>
          <h3 className="text-[14px]"><span className="font-semiBold">Currencies:</span> {country.currencies.map(currency => currency.name).join(", ")}</h3>
          <h3 className="text-[14px]"><span className="font-semiBold">Languages:</span> {country.languages.join(", ")}</h3>
        </div>

        <BorderLinkComponent borders={country.borders} className="mt-[38px]" />
      </section>
    </main>
  );
}

