import Link from "next/link";
import "./globals.css";
import ThemeStatus from "@/components/ThemeStatus";
import ThemeProvider from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <header>
            <p>=== Root Layout Header ===</p>
            <nav>
              <Link href="/">Home</Link> | <Link href="/counter">Counter</Link>
              <br />
              <Link href="/interleaved">Interleaved</Link>
              <br />
              <br />
              Slug Page Menu :&nbsp;
              <Link href="/nextjs">nextjs</Link>&nbsp;|&nbsp;
              <Link href="/routing">routing</Link>&nbsp;|&nbsp;
              <Link href="/ssr-ssg">ssr-sge</Link>&nbsp;|&nbsp;
              <Link href="/dynamic-routes">dynamic-routes</Link>
              <br />
            </nav>
            <ThemeStatus />
          </header>
          <main>{children}</main>
          <footer>=== Root Layout Footer ===</footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
