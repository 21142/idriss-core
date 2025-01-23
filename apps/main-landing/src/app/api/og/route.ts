import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { createElement } from 'react';

export const runtime = 'edge';

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(request: NextRequest) {
   const { searchParams } = request.nextUrl;
   const creatorName = searchParams.get('creatorName');

   const element = createElement(
      'div',
      {
         style: {
            display: 'flex',
            fontSize: 60,
            color: 'black',
            background: '#f6f6f6',
            width: '100%',
            height: '100%',
            padding: '50px 200px',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
         },
      },
      `Donate to ${creatorName} on Idriss`,
   );

   return new ImageResponse(element, {
      width: 1200,
      height: 630,
   });
}