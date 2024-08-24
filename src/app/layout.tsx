import "./layout.scss";

import type { Metadata } from "next";
import ClientHOCLayout from "@/modules/clientLayout/clientHOCLayout";

export const metadata: Metadata = {
  title: "SOS sample app",
  description: "Developed by @Elliot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={"main"}>
        <ClientHOCLayout>{children}</ClientHOCLayout>
      </body>
    </html>
  );
}
