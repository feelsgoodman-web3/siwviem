import "./global.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Flex, Box } from "@feelsgoodman/frogspawn/components";
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
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <Flex direction="col" asChild>
            <main>
              <Box
                asChild
                className="fs-max-w-[850px]"
                py={20}
                px={16}
                mx="auto"
              >
                <section>{children}</section>
              </Box>
            </main>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
