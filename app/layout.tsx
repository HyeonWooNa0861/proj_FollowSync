import "./globals.css";
import { SettingsProvider } from "../components/settings/SettingsContext";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <SettingsProvider>{children}</SettingsProvider>
      </body>
    </html>
  );
}

