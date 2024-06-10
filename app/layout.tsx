'use client'
//import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";
import { QueryClient, QueryClientProvider } from 'react-query';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

//export const metadata: Metadata = {
  //title: "aizh's little shop",
  //description: "get the best handmade products here! <3",
//};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <QueryClientProvider client={queryClient}>
        <Header />
        {children}
        <Footer />
        </QueryClientProvider>
        </body>
    </html>
  );
}
