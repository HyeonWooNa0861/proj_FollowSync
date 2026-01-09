import "./globals.css";
import { SettingsProvider } from "../components/settings/SettingsContext";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.className}>
      <body
        className="
          min-h-screen
          bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.12)_100%),radial-gradient(circle_at_top_left,#ffffff_0%,#f4f5f7_45%,#e9ebef_100%)]
          dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.25)_100%),radial-gradient(circle_at_top_left,#1c2230_0%,#121826_45%,#0b0f1a_100%)]
        "
      >
        <SettingsProvider>{children}</SettingsProvider>
      </body>
    </html>
  );
}
