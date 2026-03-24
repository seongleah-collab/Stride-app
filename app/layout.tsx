import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stride",
  description: "Your fitness and social companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
