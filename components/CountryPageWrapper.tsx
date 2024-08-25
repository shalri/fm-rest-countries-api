"use client";


import { CountryProvider } from '@/components/CountryContext';
import CountryPage from '@/components/CountryPage';
import { Suspense } from 'react';
import { MdKeyboardBackspace } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import SkeletonCountryCard from './ui/SkeletonCountryPage';

export default function CountryPageWrapper() {
  const router = useRouter();

  return (
    <CountryProvider>
      <div className="mt-9 md:px-6 md:mt-20">
        <div className="md:max-w-[1275px] md:mx-auto">
          <button
            type="button"
            className="ml-7 flex justify-center items-center cursor-pointer dark:bg-rc-dark-blue-dm bg-rc-white px-6 py-2 text-[14px] shadow-rc-shadow rounded-[6px] md:ml-0 md:pl-6 md:pr-11 md:text-[16px] dark:hover:bg-gray-200 hover:bg-gray-200 dark:hover:text-rc-dark-blue-dm transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              router.push("/")
            }}>
            <MdKeyboardBackspace className="text-[20px] mr-2 md:text-[24px]" />
            Back
          </button>
          {/* <Suspense fallback={<p>Loading...</p>}> */}
          <Suspense fallback={<SkeletonCountryCard />}>
            <CountryPage />
          </Suspense>
        </div>
      </div>
    </CountryProvider>
  )
}
