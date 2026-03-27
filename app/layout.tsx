import type { Metadata } from "next";
import "./globals.css";
import ChatWidget from "@/app/components/ChatWidget";

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
      <body className="antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
