// app/country/[code]/page.tsx

import { API_RESTCOUNTRIES } from '@/lib/apiConstants';

interface CountryPageProps {
  params: {
    code: string;
  };
}

async function CountryPage({ params }: CountryPageProps) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${params.code}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch country with code: ${params.code}`);
    }
    const [country] = await response.json();

    console.log('Fetched country data:', country);

    return (
      <main>
        <h2 className="">{country.name.common}</h2>
      </main>
    );
  } catch (error) {
    console.error(error);
    return (
      <main>
        <h2 className="">Country not found</h2>
      </main>
    );
  }
}

export default CountryPage;


