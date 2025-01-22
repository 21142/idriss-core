'use client'; // Mark this as a client component

import { useSearchParams } from 'next/navigation';

export default function DonorsClient() {
  const searchParams = useSearchParams();
  const creatorName = searchParams.get('creatorName') || '';

  return null;
}
