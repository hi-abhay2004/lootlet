import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./components/header/page";
import Footer from "./components/footer/page";
import ToastProvider from "../components/ToastProvider";
import { CartProvider } from "../context/CartContext";
import ScreenLoader from "./components/ScreenLoader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lootlet",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/fevicon.png" type="image/png" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ToastProvider />
          <CartProvider>
            <Header />
            <ScreenLoader />
            {children}
            <Footer />
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
