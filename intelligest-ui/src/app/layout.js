import Head from "next/head";
import "./globals.css";

export const metadata = {
  title: "IntelliGest GUI",
  description: "Developed by IntelliGest Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      <body>{children}</body>
    </html>
  );
}