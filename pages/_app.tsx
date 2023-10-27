import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Shippori_Antique } from 'next/font/google'

const shippori_antique = Shippori_Antique({
  subsets: ['latin'],
  weight: ["400"],
  variable: '--font-shippori_antique',
});

export default function App({ Component, pageProps }: AppProps) {
  return (

    <main className={`${shippori_antique.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}