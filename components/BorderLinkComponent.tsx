"use client";
import { useRouter } from "next/navigation";
import { useCountry } from "./CountryContext";
import { cn } from "@/lib/utils";

interface BorderLinkProps {
  borders: string[];
  className?: string;
}

export default function BorderLinkComponent({ borders, className }: BorderLinkProps) {
  const router = useRouter();
  const { countries } = useCountry();

  const handleBorderClick = (borderCode: string) => {
    router.push(`/country?code=${borderCode}`)
  }

  const getCountryName = (code: string) => {
    const country = countries.find(c => c.alpha2Code === code || c.alpha3Code === code);
    return country ? country.name : code;
  }

  return (
    <div className={cn("flex gap-x-3 flex-col", className)}>
      <h3 className="font-semiBold">
        Border Countries:
      </h3>
      <ul className="flex mt-4 gap-[10px] flex-wrap">
        {borders ? borders.map((border) => (
          <li
            // className="cursor-pointer dark:bg-rc-dark-blue-dm bg-rc-white px-8 py-[6px] text-[12px] shadow-xl rounded-md shadow-black"

            className="cursor-pointer dark:bg-rc-dark-blue-dm bg-rc-white px-8 py-[6px] text-[12px] shadow-rc-shadow rounded-sm"
            onClick={() => handleBorderClick(border)}
            key={border}
          >
            {getCountryName(border)}
          </li>
        )) : (<li>N/A</li>)}
      </ul>
    </div>
  )
}
