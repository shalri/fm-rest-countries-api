"use client";
import { useState } from "react";
import { useCountry, Country } from "./CountryContext"

export default function FilterComponent() {
  const { search } = useCountry();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Country[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setQuery(value);
    setResults(search(value));
  };


  return (
    <form action="" className="">
      <input type="text"
        value={query}
        onChange={handleSearch}
        className="w-full" placeholder="Search for a country" />
      <div>
        {results.map((country, index) => (
          <div key={index}>
            <h2>{country.name}</h2>
            <img src={country.flags.png} alt={`${country.name} flag`} />
          </div>
        ))}
      </div>
      {/* Dropdown filter */}
      <div className="">Filter by region</div>
    </form>
  )
}
