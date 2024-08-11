import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header"
import "./globals.css";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/providers/auth";
import { StoreProvider } from "@/providers/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prayog - Home",
  description: "Discover Prayog, an open-source platform that connects students and institutes, enabling seamless project uploads and event sharing. Join a thriving community where students showcase their projects, and institutes post seminars, workshops, and more—no login required to explore!",
  applicationName: 'Prayog',
  keywords: ["Prayog",
    "Student projects",
    "Institute events",
    "Next.js platform",
    "Open-source platform",
    "Tailwind CSS",
    "Supabase integration",
    "Project showcase",
    "Educational workshops",
    "Seminars and events",
    "Student-institute collaboration",
    "Upload projects online",
    "Educational community",
    "Innovative projects",
    "Tech workshops"],
  robots: 'index, follow',
  alternates: { canonical: 'https://prayog.vercel.app' },
  openGraph: {
    title: "Prayog, A pioneering initiative that brings together students and institutes on a single platform.",
    type: "website",
    url: "https://prayog.vercel.app",
    description: "Discover Prayog, an open-source platform that connects students and institutes, enabling seamless project uploads and event sharing.",
    siteName: "Prayog",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AuthProvider>
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>

  );
}
