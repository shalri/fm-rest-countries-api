"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from 'react';

export default function CountryPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  return (
    <main className="">
      hello
    </main>
  )
}
