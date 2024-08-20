"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { useCountry, Country } from './CountryContext';
import BorderLinkComponent from "./BorderLinkComponent";
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
    return (
      <AnimatePresence>
        <motion.div
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SkeletonCountryPage />
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div className="overflow-hidden md:max-h-[550px]">
      <AnimatePresence>
        <motion.main className="px-7 mt-9 pb-8 md:px-0" key={country.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <section className="mt-16 md:mt-20 md:grid md:grid-cols-2 md:items-center">
            <div className="w-full md:pr-20">
              <div className="relative aspect-[505/362]">
                <Image
                  src={country.flags.svg}
                  alt={`${country.name} flag`}
                  fill
                  // className="absolute object-contain w-full h-full" />
                  className="absolute object-cover" />
              </div>
            </div>
            <div className="md:pl-10">
              <h1 className="mt-8 text-[22px] font-bold md:text-[31px] md:mt-0">{country.name}</h1>

              <div className="md:flex md:justify-between md:gap-x-4">
                <div className="text-[14px] mt-5 flex flex-col gap-y-[11px] md:text-[16px]">
                  <h2 className=""><span className="font-semiBold">Native Name:</span> {country.nativeName}</h2>
                  <h2><span className="font-semiBold">Population:</span> {country.population.toLocaleString()}</h2>
                  <h2><span className="font-semiBold">Region:</span> {country.region}</h2>
                  <h2><span className="font-semiBold">Sub Region:</span> {country.subregion}</h2>
                  <h2><span className="font-semiBold">Capital:</span> {country.capital ? country.capital : "N/A"}</h2>
                </div>

                <div className="mt-[42px] flex flex-col gap-y-[11px] md:mt-5">
                  <h3><span className="font-semiBold">Top Level Domain:</span> {country.topLevelDomain.join(", ")}</h3>
                  <h3><span className="font-semiBold">Currencies:</span> {country.currencies.map(currency => currency.name).join(", ")}</h3>
                  <h3><span className="font-semiBold">Languages:</span> {country.languages.join(", ")}</h3>
                </div>
              </div>

              <BorderLinkComponent borders={country.borders} className="mt-[38px]" />
            </div>
          </section>
        </motion.main>
      </AnimatePresence> </div>

  );
}

