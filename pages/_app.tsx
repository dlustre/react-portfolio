import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Shippori_Antique } from 'next/font/google'
import localFont from 'next/font/local';

const shippori_antique = Shippori_Antique({
  subsets: ['latin'],
  weight: ["400"],
  variable: '--font-shippori_antique',
});

const neue_regrade = localFont({
  src: './Neue-Regrade-Variable.ttf',
  variable: '--font-neue_regrade',
});

export default function App({ Component, pageProps }: AppProps) {
  return (

    <main className={`${shippori_antique.variable} ${neue_regrade.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}