import "./global.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Flex } from "@feelsgoodman/fs-ui/components";
import Providers from "@fs/app/providers";
import { Header } from "@fs/common/components/Header";
import { Metadata } from "next";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Feels Good Man",
    default: "Frogspawn | Feels Good Man",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          <Flex direction="col" asChild>
            <main>{children}</main>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
