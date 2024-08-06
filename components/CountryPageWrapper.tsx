// wrapper for use client directive, since you can't use "use client"
// directive in page.tsx

"use client";


import { CountryProvider } from '@/components/CountryContext';
import CountryPage from '@/components/CountryPage';
import { Suspense } from 'react';

export default function CountryPageWrapper() {
  return (
    <CountryProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <CountryPage />
      </Suspense>
    </CountryProvider>
  )
}
