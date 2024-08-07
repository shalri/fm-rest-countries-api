"use client";
import { useEffect, useState } from "react";
import { useCountry, Country } from "./CountryContext"
import CountryCardComponent from "./CountryCardComponent";
import { AnimatePresence, motion } from "framer-motion";
import { MdSearch } from "react-icons/md";

export default function FilterComponent() {
  const { countries, search } = useCountry();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  useEffect(() => {
    filterResults();
    // setResults(countries);
  }, [countries, query, selectedRegion]);

  const filterResults = () => {
    let filteredCountries = search(query);
    if (selectedRegion !== 'All') {
      filteredCountries = filteredCountries.filter((country) => country.region === selectedRegion);
    }
    setResults(filteredCountries);
  }

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
          className="w-full dark:bg-rc-dark-blue-dm bg-white pl-[76px] py-4 text-[11px] shadow-lg rounded-md shadow-black border-none outline-none focus:outline-none focus:ring-0" placeholder="Search for a country..." />
        <MdSearch className="absolute left-8 text-[20px]" />
      </div>
      <div className="w-[60%] mt-9 bg-white dark:bg-rc-dark-blue-dm flex shadow-lg rounded-md shadow-black overflow-hidden px-4">
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
          {results.length > 0 ? (
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
