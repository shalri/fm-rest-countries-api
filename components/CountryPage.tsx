"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { useCountry, Country } from './CountryContext';
import BorderLinkComponent from "./BorderLinkComponent";
import { MdKeyboardBackspace } from "react-icons/md";
import SkeletonCountryPage from "./ui/SkeletonCountryPage";
import { AnimatePresence, motion } from "framer-motion";

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
    return <SkeletonCountryPage />
  }

  return (
    <AnimatePresence>
      <motion.main className="px-7 mt-9 pb-8" key={country.name}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <section className="mt-16">
          {/* <div className="w-full aspect-w-4 aspect-h-3"> */}
          <div className="w-full">
            <img src={country.flags.svg} alt={`${country.name} flag`} className="object-contain w-full h-full" />
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
      </motion.main>
    </AnimatePresence>
  );
}

