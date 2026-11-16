import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Saver",
  description: "Save job offers and write cover letters",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
