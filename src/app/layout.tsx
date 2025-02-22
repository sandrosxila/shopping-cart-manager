import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/providers/apollo-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Loading from "./loading";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Take Home",
  description: "GraphQL + Next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Navbar />
        <main className="flex flex-col py-2">
          <ApolloWrapper>
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </ApolloWrapper>
        </main>
      </body>
    </html>
  );
}
