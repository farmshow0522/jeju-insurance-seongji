import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.fullName} — ${SITE.slogan}`,
    template: `%s · ${SITE.name} — ${SITE.slogan}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.fullName} — ${SITE.slogan}`,
    description: SITE.description,
    type: "website",
    locale: "ko_KR",
    siteName: `${SITE.name} — ${SITE.slogan}`,
  },
  // 네이버 서치어드바이저 등록용 자리 (발급받은 값으로 교체)
  other: {
    "naver-site-verification": "",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
