
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BytesFlux - Professional Web Development & Digital Solutions in Pakistan",
    template: "%s | BytesFlux - Digital Solutions"
  },
  description: "BytesFlux is Pakistan's leading web development, mobile app development, graphic design, and SEO services company. We specialize in custom digital solutions, e-commerce development, and software development. Get expert IT services at competitive prices.",
  keywords: [
    "bytesflux",
    "BytesFlux",
    "web development Pakistan",
    "mobile app development",
    "graphic design services",
    "SEO services Pakistan",
    "digital solutions",
    "custom websites",
    "e-commerce development",
    "software development",
    "IT services Pakistan",
    "digital marketing",
    "web development company",
    "mobile app developers",
    "graphic designers Pakistan",
    "SEO experts Pakistan",
    "digital agency Pakistan",
    "custom software development",
    "website development",
    "app development Pakistan"
  ],
  authors: [{ name: "BytesFlux Team" }],
  creator: "BytesFlux",
  publisher: "BytesFlux",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bytesflux.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bytesflux.com',
    title: 'BytesFlux - Professional Web Development & Digital Solutions in Pakistan',
    description: 'BytesFlux is Pakistan\'s leading web development, mobile app development, graphic design, and SEO services company. We specialize in custom digital solutions, e-commerce development, and software development.',
    siteName: 'BytesFlux',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BytesFlux - Professional Web Development & Digital Solutions in Pakistan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BytesFlux - Professional Web Development & Digital Solutions in Pakistan',
    description: 'BytesFlux is Pakistan\'s leading web development, mobile app development, graphic design, and SEO services company. We specialize in custom digital solutions, e-commerce development, and software development.',
    images: ['/og-image.jpg'],
    creator: '@bytesflux',
    site: '@bytesflux',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: 'any', type: 'image/png' }
    ],
    apple: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' }
    ],
    other: [
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BytesFlux" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        
        {/* Google Analytics - Replace GA_MEASUREMENT_ID with your actual ID */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
