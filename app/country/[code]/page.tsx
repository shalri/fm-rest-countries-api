// // app/country/[code]/page.tsx
//
// import { API_RESTCOUNTRIES } from '@/lib/apiConstants';
//
// interface CountryPageProps {
//   params: {
//     code: string;
//   };
// }
//
// async function CountryPage({ params }: CountryPageProps) {
//   try {
//     const response = await fetch(`https://restcountries.com/v3.1/alpha/${params.code}`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch country with code: ${params.code}`);
//     }
//     const [country] = await response.json();
//
//     console.log('Fetched country data:', country);
//
//     return (
//       <main>
//         <h2 className="">{country.name.common}</h2>
//       </main>
//     );
//   } catch (error) {
//     console.error(error);
//     return (
//       <main>
//         <h2 className="">Country not found</h2>
//       </main>
//     );
//   }
// }
//
// export default CountryPage;

import { API_RESTCOUNTRIES } from '@/lib/apiConstants';
import { notFound } from 'next/navigation';

interface CountryPageProps {
  params: {
    code: string;
  };
}

// Fetch country data
async function fetchCountry(code: string) {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  if (!response.ok) {
    return null;
  }
  const country = await response.json();
  return country[0]; // API returns an array, we need the first element
}

// Generate static parameters
export async function generateStaticParams() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) {
      throw new Error('Failed to fetch all countries');
    }
    const countries = await response.json();
    const paths = countries.map((country: any) => ({
      code: country.cca2,
    }));
    return paths.map((path: { code: string }) => ({ params: path }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function CountryPage({ params }: CountryPageProps) {
  const { code } = params;
  const country = await fetchCountry(code);

  if (!country) {
    return notFound();
  }

  return (
    <main>
      <h2 className="">{country.name.common}</h2>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <p>Capital: {country.capital}</p>
      {/* <CountryBorderComponent borders={country.borders} /> */}
    </main>
  );
}

export default CountryPage;
