"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { useCountry, Country } from './CountryContext';
import BorderLinkComponent from "./BorderLinkComponent";

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

  if (loading) {
    return <p>Loading...</p>; // Loading indicator
  }

  if (!country) {
    return <p>Country not found</p>; // Error message for country not found
  }

  return (
    <main>
      <div className="cursor-pointer" onClick={() => history.back()}>back</div>
      <div className="">
        <img src={country.flags.svg} alt={`${country.name} flag`} />
        <h2>{country.name}</h2>
        <h3>Population: {country.population.toLocaleString()}</h3>
        <h3 className="">Region: {country.region}</h3>
        <h3 className="">Capital: {country.capital ? country.capital : "N/A"}</h3>
        <BorderLinkComponent borders={country.borders} />
      </div>
    </main>
  );
}

