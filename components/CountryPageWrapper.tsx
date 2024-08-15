// wrapper for use client directive, since you can't use "use client"
// directive in page.tsx

"use client";


import { CountryProvider } from '@/components/CountryContext';
import CountryPage from '@/components/CountryPage';
import { Suspense } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useRouter } from 'next/navigation';

export default function CountryPageWrapper() {
  const router = useRouter();
  return (
    <CountryProvider>
      <button className="mt-9 ml-7 flex justify-center items-center cursor-pointer dark:bg-rc-dark-blue-dm bg-rc-white px-6 py-2 text-[14px] shadow-rc-shadow rounded-sm"
        onClick={() => {
          router.push("/")
        }}>
        <MdKeyboardBackspace className="text-[20px] mr-2" /> Back
      </button>
      <Suspense fallback={<p>Loading...</p>}>
        <CountryPage />
      </Suspense>
    </CountryProvider>
  )
}
