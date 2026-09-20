import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";
import "./pages.css";

export const metadata: Metadata = {
  title: {
    default: "Andrew Franklin Leo - A map of economic civilization",
    template: "%s - Andrew Franklin Leo",
  },
  description: "An evolving map of intelligence, capability, economic coordination, and civilization.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body><SiteNav />{children}<SiteFooter /></body>
    </html>
  );
}
