import type { Metadata } from "next";
import { DM_Sans, Merriweather, Montserrat, Poppins, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const bellaboo = localFont({
  src: "../../public/BELLABOO-Regular.ttf",
  variable: "--font-bellaboo",
  display: "swap",
});

const caveat = localFont({
  src: [
    { path: "../fonts/Caveat-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Caveat-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/Caveat-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/Caveat-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sakhee AI",
  description: "AI-powered teaching assistant for educators",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`light ${montserrat.variable} ${roboto.variable} ${merriweather.variable} ${poppins.variable} ${dmSans.variable} ${bellaboo.variable} ${caveat.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <head />
      <body className="antialiased font-roboto">{children}</body>
    </html>
  );
}
