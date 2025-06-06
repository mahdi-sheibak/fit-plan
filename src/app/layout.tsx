import type { Metadata } from 'next';

import { iranSans, iranSansFaNum } from '@/fonts/font';

import './globals.css';

export const metadata: Metadata = {
  title: 'فیت پلن',
  description: 'ارتباط کامل تر با مربی خود',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa">
      <body className={`${iranSansFaNum.className} ${iranSans.className} antialiased`}>{children}</body>
    </html>
  );
}
