import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const neue = localFont({
  src: '../fonts/Neue-Regrade-Variable.ttf',
  variable: '--neue'
});

const heming = localFont({
  src: '../fonts/Heming Variable.ttf',
  variable: '--heming'
});

export const metadata: Metadata = {
  title: "DENNIS LUSTRE",
  description: "I BUILD SOFTWARE THAT HELPS PEOPLE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${neue.className}`}>{children}</body>
    </html>
  );
}
