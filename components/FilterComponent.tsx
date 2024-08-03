"use client";
import { useEffect, useState } from "react";
import { useCountry, Country } from "./CountryContext"
import CountryCardComponent from "./CountryCardComponent";
import { AnimatePresence, motion } from "framer-motion";

export default function FilterComponent() {
  const { countries, search } = useCountry();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Country[]>([]);

  useEffect(() => {
    setResults(countries);
  }, [countries])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setQuery(value);
    setResults(search(value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }


  return (
    <form className="" onSubmit={handleSubmit}>
      <input type="text"
        value={query}
        onChange={handleSearch}
        className="w-full" placeholder="Search for a country" />
      <div className="">Filter by region</div>
      <div>
        <AnimatePresence>
          <motion.div
            key={results.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {results.map((country, index) => (
              <motion.div
              // key={index}
              // initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              // exit={{ opacity: 0 }}
              >
                <CountryCardComponent country={country} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Dropdown filter */}
    </form>
  )
}
