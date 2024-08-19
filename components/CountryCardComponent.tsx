"use client";

import { useRouter } from "next/navigation";
import { Country } from "./CountryContext";
import Image from 'next/image';

interface CountryCardComponentProps {
  country: Country;
  index: number;
}

export default function CountryCardComponent({ country, index }: CountryCardComponentProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/country?code=${country.alpha3Code}`)
  }
  return (
    <section
      onClick={handleClick}
      className="rounded-lg overflow-hidden bg-rc-white dark:bg-rc-dark-blue-dm cursor-pointer shadow-rc-shadow pb-16 mb-8 md:mb-[74px] md:pb-6">
      <div key={index} className="w-full">
        <div className="relative aspect-[265/160]">
          <Image
            src={country.flags.svg}
            alt={`${country.name} flag`}
            fill
            className="w-full object-cover"
          />
        </div>
        <div className="mt-8 px-7 md:mt-6">
          <h2 className="font-bold md:text-[18px]">{country.name}</h2>
          <div className="mb-4 md:mt-3 md:text-[16px]">
            <h3 className=""><span className="font-semiBold">Population:</span> {country.population.toLocaleString()}</h3>
            <h3 className=""><span className="font-semiBold">Region:</span> {country.region}</h3>
            <h3 className=""><span className="font-semiBold">Capital:</span> {country.capital ? country.capital : "N/A"}</h3>
          </div>
        </div>
      </div>
    </section>
  )
}
