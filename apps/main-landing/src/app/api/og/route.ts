import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { createElement } from 'react';

// eslint-disable-next-line @typescript-eslint/require-await
async function loadGoogleFont(font: string, text: string) {
   const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`
   const css = await (await fetch(url)).text()
   const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

   if (resource) {
      const response = await fetch(resource[1]!)
      if (response.status == 200) {
         return await response.arrayBuffer()
      }
   }

   throw new Error('failed to load font data')
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function GET(request: NextRequest) {
   const { searchParams } = request.nextUrl;
   const creatorName = searchParams.get('creatorName');

   const baseUrl = request.nextUrl.origin;
   const imageUrl = `${baseUrl}/og.png`;

   const element = createElement(
      'div',
      {
         style: {
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: 'no-repeat',
            fontSize: 100,
            letterSpacing: -2,
            fontFamily: 'Poppins',
            textAlign: 'center',
         },
      },
      [
         createElement(
            'div',
            {
               style: {
                  fontSize: 90,
                  color: 'white',
               },
            },
            'Donate to',
         ),
         createElement(
            'div',
            {
               style: {
                  fontSize: 100,
                  color: 'white',
               },
            },
            creatorName,
         ),
         createElement(
            'div',
            {
               style: {
                  fontSize: 90,
                  color: 'white',
               },
            },
            'using IDRISS',
         ),
      ],
   );

   return new ImageResponse(element, {
      width: 1200,
      height: 630,
      fonts: [
         {
            name: 'Poppins',
            data: await loadGoogleFont('Poppins', creatorName!),
            style: 'normal',
         },
      ],
   });
}