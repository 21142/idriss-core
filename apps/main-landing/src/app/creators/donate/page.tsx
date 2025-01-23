/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import { Button } from '@idriss-xyz/ui/button';
import { CREATORS_LINK } from '@idriss-xyz/constants';

import { TopBar } from '@/components';
import { backgroundLines2 } from '@/assets';

import { RainbowKitProviders } from './providers';
import { Content } from './content';
import '@rainbow-me/rainbowkit/styles.css';

type Properties = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: Promise<any>; // For dynamic route parameters
  searchParams: Promise<Record<string, string | string[] | undefined>>; // For query parameters (as a Promise)
};

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateMetadata({
  searchParams,
}: Properties): Promise<Metadata> {
  const resolvedSearchParameters = await searchParams;
  const creatorName = resolvedSearchParameters.creatorName as string;

  return {
    title: `Donate to ${creatorName} on Idriss`,
    description: `Support ${creatorName} by donating through Idriss.`,
    openGraph: {
      title: `Donate to ${creatorName} on Idriss`,
      description: `Support ${creatorName} by donating through Idriss.`,
      images: [
        {
          url: `https://idriss-core-git-feat-creators-metadata-21142s-projects.vercel.app/api/og?creatorName=${encodeURIComponent(creatorName)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Donate to ${creatorName} on Idriss`,
      description: `Support ${creatorName} by donating through Idriss.`,
      images: [
        `https://idriss-core-git-feat-creators-metadata-21142s-projects.vercel.app/api/og?creatorName=${encodeURIComponent(creatorName)}`,
      ],
    },
  };
}

// ts-unused-exports:disable-next-line
export default function Donors() {
  return (
    <RainbowKitProviders>
      <TopBar />
      <main className="relative flex min-h-screen grow flex-col items-center justify-around gap-4 overflow-hidden bg-[radial-gradient(181.94%_192.93%_at_16.62%_0%,_#E7F5E7_0%,_#76C282_100%)] px-2 pb-1 pt-[56px] lg:flex-row lg:items-start lg:justify-center lg:px-0">
        <link rel="preload" as="image" href={backgroundLines2.src} />
        <img
          src={backgroundLines2.src}
          className="pointer-events-none absolute top-0 hidden h-full opacity-40 lg:block"
          alt=""
        />

        <Content className="container mt-8 lg:mt-[130px] lg:[@media(max-height:800px)]:mt-[60px]" />
        <Button
          className="px-5 py-3.5 lg:absolute lg:bottom-6 lg:right-7 lg:translate-x-0"
          intent="secondary"
          size="small"
          href={CREATORS_LINK}
          isExternal
          asLink
        >
          CREATE YOUR LINK
        </Button>
      </main>
    </RainbowKitProviders>
  );
}
