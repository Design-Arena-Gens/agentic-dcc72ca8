import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fujifilm QuickSnap - Available in Kuwait",
  description: "Experience the nostalgia of film photography with Fujifilm QuickSnap disposable camera. Available in Kuwait from Boushahri Group and X-cite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-black">{children}</body>
    </html>
  );
}
