"use client";
import { useCallback, useEffect, useState } from "react";
import { useCountry, Country } from "./CountryContext"
import CountryCardComponent from "./CountryCardComponent";
import { AnimatePresence, motion } from "framer-motion";
import { MdSearch } from "react-icons/md";
import SkeletonCountryCard from "./ui/SkeletonCountryCard";

export default function FilterComponent() {
  const { countries, search } = useCountry();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  const filterResults = useCallback(() => {
    let filteredCountries = search(query);
    if (selectedRegion !== 'All') {
      filteredCountries = filteredCountries.filter((country) => country.region === selectedRegion);
    }
    setResults(filteredCountries);
  }, [query, selectedRegion, search]);

  useEffect(() => {
    setLoading(true);
    filterResults();
    setLoading(false);
    // Debugging Code
    // const timeoutId = setTimeout(() => {
    //   filterResults();
    //   setLoading(false);
    // }, 2000)
  }, [countries, filterResults]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }


  return (
    <form className="mt-6 px-4" onSubmit={handleSubmit}>
      <div className="relative flex items-center">
        <input
          type="text"
          // autocomplete="on"
          id="country"
          value={query}
          onChange={handleSearch}
          className="w-full dark:bg-rc-dark-blue-dm bg-rc-white pl-[76px] py-4 text-[11px] shadow-rc-shadow rounded-sm border-none outline-none focus:outline-none focus:ring-0" placeholder="Search for a country..." />
        <MdSearch className="absolute left-8 text-[20px]" />
      </div>
      <div className="w-[60%] mt-9 bg-rc-white dark:bg-rc-dark-blue-dm flex shadow-rc-shadow overflow-hidden px-4">
        <select
          // name=""
          id="regions"
          className="w-full dark:bg-rc-dark-blue-dm py-4 text-[11px] outline-none focus:outline-none focus:ring-0"
          onChange={handleRegion}
          value={selectedRegion}
        >
          <option value="All" hidden>Filter by region</option>
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="mt-8 px-[38px]">
        <AnimatePresence>
          {loading ? (
            Array(8).fill(0).map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                // initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SkeletonCountryCard />
              </motion.div>
            ))
          ) : results.length > 0 ? (
            <motion.div
              key={results.length}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {results.map((country, index) => (
                <motion.div
                  key={index}
                >
                  <CountryCardComponent country={country} index={index} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            query && (
              <motion.p
                key={results.length}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center font-bold"
              >
                No countries found.
              </motion.p>
            )
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
