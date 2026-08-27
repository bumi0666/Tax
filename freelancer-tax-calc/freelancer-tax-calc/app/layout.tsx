import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "프리랜서 종합소득세 계산기 | 3.3% 환급·추가납부 미리 확인",
  description:
    "프리랜서 3.3% 원천징수 사업소득자를 위한 종합소득세 계산기. 경비율, 인적공제, 기납부세액을 반영해 환급 또는 추가납부액을 바로 확인하세요.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Sans+KR:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
