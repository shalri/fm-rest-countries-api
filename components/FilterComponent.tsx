"use client";
import { useCallback, useEffect, useState } from "react";
import { useCountry, Country } from "./CountryContext"
import CountryCardComponent from "./CountryCardComponent";
import { AnimatePresence, motion } from "framer-motion";
import { MdSearch } from "react-icons/md";
import SkeletonCountryCard from "./ui/SkeletonCountryCard";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function FilterComponent() {
  const { countries, search } = useCountry();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filterResults = useCallback(() => {
    setLoading(true);
    let filteredCountries = search(query);
    if (selectedRegion !== 'All') {
      filteredCountries = filteredCountries.filter((country) => country.region === selectedRegion);
    }
    setResults(filteredCountries);
    setLoading(false);
  }, [query, selectedRegion, search]);

  useEffect(() => {
    filterResults();
  }, [countries, filterResults]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setDropdownOpen(false);
  }

  const handleRegion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }


  return (
    <form className="mt-6 px-4 md:px-8 md:mt-12" onSubmit={handleSubmit}>
      <div className=" md:max-w-[1275px] mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="relative flex items-center md:w-full md:max-w-[475px]">
            <input
              type="text"
              // autocomplete="on"
              id="country"
              value={query}
              onChange={handleSearch}
              className="w-full dark:bg-rc-dark-blue-dm bg-rc-white pl-[76px] py-4 text-[11px] shadow-rc-shadow rounded-sm border-none outline-none focus:outline-none focus:ring-0 md:py-[18px] md:text-[14px] md:pl-[70px]" placeholder="Search for a country..." />
            <MdSearch className="absolute left-8 text-[20px] md:left-6 md:text-[24px]" />
          </div>
          {/* Semantically correct but very painful to style */}
          {/*   <div className="w-[60%] mt-9 bg-rc-white dark:bg-rc-dark-blue-dm flex shadow-rc-shadow overflow-hidden md:mt-0 md:max-w-[200px]"> */}
          {/*     <select */}
          {/*       // name="" */}
          {/*       id="regions" */}
          {/*       className="px-4 w-full dark:bg-rc-dark-blue-dm py-4 text-[11px] outline-none focus:outline-none focus:ring-0 md:py-[18px] md:text-[14px] appearance-none" */}
          {/*       onChange={handleRegion} */}
          {/*       value={selectedRegion} */}
          {/*     > */}
          {/*       <option value="All" hidden>Filter by region</option> */}
          {/*       <optgroup className=""> */}
          {/*         <option value="All" className="">All</option> */}
          {/*         <option value="Africa">Africa</option> */}
          {/*         <option value="Americas">Americas</option> */}
          {/*         <option value="Asia">Asia</option> */}
          {/*         <option value="Europe">Europe</option> */}
          {/*         <option value="Oceania">Oceania</option> */}
          {/*       </optgroup> */}
          {/*     </select> */}
          {/*   </div> */}
          {/* </div> */}
          <div className="relative w-[60%] mt-9 md:mt-0 md:max-w-[200px]">
            <div
              className="bg-rc-white dark:bg-rc-dark-blue-dm py-4 flex justify-between items-center pr-3 pl-7 text-[11px] md:py-[18px] md:text-[14px] shadow-rc-shadow cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>{selectedRegion === 'All' ? 'Filter by region' : selectedRegion}</span>
              <RiArrowDropDownLine className="text-[20px]" />
            </div>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  key="regions"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 w-full bg-rc-white dark:bg-rc-dark-blue-dm shadow-rc-shadow mt-2 z-10 pb-2 rounded-sm">
                  {['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].map((region, index) => (
                    <motion.div
                      key={region}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => handleRegionSelect(region)}
                      className={`px-7 py-2 text-[11px] md:text-[14px] cursor-pointer hover:bg-gray-200 dark:hover:bg-rc-dark-blue-lm font-semiBold ${index === 0 ? 'mt-4' : ''
                        }`}
                    >
                      {region}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-8 px-[38px]">
          <AnimatePresence mode="wait">
            {loading ? (
              Array(8).fill(0).map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  // This will not to show animation
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
      </div>
    </form>
  )
}
