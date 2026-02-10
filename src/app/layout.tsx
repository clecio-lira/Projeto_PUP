import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";
import Asidebar from "@/components/Asidebar/Asidebar";
import Script from "next/script";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Plante uma Planta",
  description: "Site e-commerce de plantas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <AuthProvider>
        <body className={`antialiased`} suppressHydrationWarning>
          <Script
            src="https://website-widgets.pages.dev/dist/sienna.min.js"
            strategy="beforeInteractive"
            defer
          />

          <header>
            <Navbar />
            <Banner />
          </header>

          <main>
            <Asidebar />
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </body>
      </AuthProvider>
    </html>
  );
}
