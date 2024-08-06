
// import { useSearchParams } from "next/navigation";
// import { useState, useEffect } from 'react';
// import { useCountry, Country } from "./CountryContext";
//
// export default function CountryPage() {
//   const searchParams = useSearchParams();
//   const code = searchParams.get('code');
//   const { countries } = useCountry();
//   const [country, setCountry] = useState<Country | null>(null);
//
//   useEffect(() => {
//     console.log('code:', code)
//     // console.log('countries:', countries)
//     // if (code && countries.length > 0) {
//     if (code) {
//       const selectedCountry = countries.find(c => c.alpha2Code === code || c.alpha3Code === code);
//       console.log('selectedCountry:', selectedCountry)
//       setCountry(selectedCountry || null);
//     }
//   }, [code, countries])
//
//   return (
//     <main className="">
//       <h1>{country.name}</h1>
//     </main>
//   )
// }
"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { useCountry, Country } from './CountryContext';

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
      <h1>{country.name}</h1>
      {/* Add more country details here */}
    </main>
  );
}

