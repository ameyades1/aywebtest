import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AntarYog Foundation - Making Bharat a Vishwa Guru",
  description: "Reviving timeless knowledge of ancient scriptures under the guidance of Jeevan Mukt Sadguru Acharya Upendra Ji. Explore Vedanta, Naadi Jyotish, Vastu Rupantaran, Gurukul, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${lora.variable} antialiased bg-white text-text`}
      >
        {children}
      </body>
    </html>
  );
}
