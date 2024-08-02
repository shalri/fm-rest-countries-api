import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpa3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  reqion: string;
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
    fetch('/data.json').then(response => response.json()).then(data => setCountries(data));
  }, [])
  const search = (query: string) => {
    return countries.filter(country =>
      country.name.toLowerCase().includes(query.toLowerCase())
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
