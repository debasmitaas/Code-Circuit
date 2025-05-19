import type { Metadata } from "next";
import "./globals.css";
import { monaSans, victorMono } from "./fonts";

export const metadata: Metadata = {
  title: "Avatask",
  description: "To-do list with team member avatars and priority color tags.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monaSans.variable} ${victorMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
