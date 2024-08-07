import React, { createContext, useContext, useState, ReactNode } from 'react';
import { API_RESTCOUNTRIES } from '@/lib/apiConstants';

export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  flags: {
    svg: string;
    png: string;
  };
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  languages: {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }[];
  translations: {
    [key: string]: string;
  }
  regionalBlocs: {
    acronym: string;
    name: string;
  }[];
  cioc: string;
  independent: boolean;
}

interface CountryContextProps {
  countries: Country[];
  search: (query: string) => Country[]
}

const CountryContext = createContext<CountryContextProps | undefined>(undefined);

const CountryProvider = ({ children }: { children: ReactNode }) => {
  const [countries, setCountries] = useState<Country[]>([]);

  // Fetch the countries data from data.json
  React.useEffect(() => {
    fetch(API_RESTCOUNTRIES).then(response => response.json()).then((data) => {
      const formattedData = data.map((country: any) => ({
        name: country.name.common,
        flags: country.flags,
        population: country.population,
        region: country.region,
        capital: country.capital,
        borders: country.borders,
        alpha2Code: country.cca2,
        alpha3Code: country.cca3,
        topLevelDomain: country.tld || [],
        currencies: Object.values(country.currencies || []), // Convert to array
        languages: Object.values(country.languages || []), // Convert to array
      }));
      setCountries(formattedData);
      // console.log(formattedData);
    });
  }, [])
  const search = (query: string) => {
    return countries.filter(country =>
      country.name.toLowerCase().includes(query.toLowerCase()) ||
      country.alpha2Code.toLowerCase().includes(query.toLowerCase()) ||
      country.alpha3Code.toLowerCase().includes(query.toLowerCase())
    )
  };

  return (
    <CountryContext.Provider value={{ countries, search }}>
      {children}
    </CountryContext.Provider>
  )
};

const useCountry = () => {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context
};

export { CountryProvider, useCountry };
