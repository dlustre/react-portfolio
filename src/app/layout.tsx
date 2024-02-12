import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const neue = localFont({
  src: '../fonts/Neue-Regrade-Variable.ttf',
  variable: '--neue'
});

export const metadata: Metadata = {
  title: "Dennis Lustre",
  description: "Dennis Lustre | Software Developer",
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
