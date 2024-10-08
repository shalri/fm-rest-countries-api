import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const nunitosans = Nunito_Sans({ subsets: ["latin"], weight: ["300", "600", "800"] });

export const metadata: Metadata = {
  title: "Countries REST API | FScode",
  description: "Solution for Countries REST API challenge from Frontend Mentor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
            const theme = localStorage.getItem('theme');
            if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            } else {
            document.documentElement.classList.remove('dark');
            }
            })();
            `,
          }}
        />
      </head>
      <body className={`${nunitosans.className} bg-rc-very-light-gray-lm-bg dark:bg-rc-very-dark-blue-dm dark:text-rc-white transition-color duration-300`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
