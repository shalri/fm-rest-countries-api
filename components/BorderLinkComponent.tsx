"use client";

import { useRouter } from "next/navigation";

interface BorderLinkProps {
  borders: string[];
}

export default function BorderLinkComponent({ borders }: BorderLinkProps) {
  const router = useRouter();

  const handleBorderClick = (borderCode: string) => {
    // router.push(`/country/code?=${borderCode}`)
    router.push(`/country?code=${borderCode}`)
  }

  return (
    <div className="">
      <h3 className="">
        Borders:
      </h3>
      <ul className="">
        {borders ? borders.map((border) => (
          <li className="" key={border}>
            <div className="" onClick={() => handleBorderClick(border)}>{border}</div>
          </li>
        )) : (<li>N/A</li>)}
      </ul>
    </div>
  )
}
