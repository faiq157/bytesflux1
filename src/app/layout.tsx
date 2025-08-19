
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
  description: "BytesFlux is a leading digital solutions agency in Pakistan, delivering web development, mobile apps, graphic design, and SEO since 2019. We specialize in custom solutions, e-commerce platforms, and enterprise software using modern technologies like React, Next.js, and Node.js. Our mission is to help businesses grow with scalable, innovative, and cost-effective digital solutions—making us a trusted partner for clients in Pakistan and worldwide.",
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
    description: 'BytesFlux is Pakistan\'s premier digital solutions company, delivering comprehensive web development, mobile app development, graphic design, and SEO services since 2019. Our expert team specializes in creating custom digital solutions, e-commerce platforms, and enterprise software that drive business growth and digital transformation.',
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
    description: 'BytesFlux is Pakistan\'s premier digital solutions company, delivering comprehensive web development, mobile app development, graphic design, and SEO services since 2019. Our expert team specializes in creating custom digital solutions, e-commerce platforms, and enterprise software that drive business growth and digital transformation.',
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
    other: {
      'google-site-verification': 'your-google-verification-code',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: 'any', type: 'image/png' }
    ],
    apple: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* Google Brand Logo Meta Tags */}
        <meta name="brand" content="BytesFlux" />
        <meta name="application-name" content="BytesFlux" />
        <meta name="msapplication-TileImage" content="/logo.png" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-H5WX4ZZV1H"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H5WX4ZZV1H');
            `,
          }}
        />
        
        {/* Organization Logo Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "BytesFlux",
              "alternateName": "BytesFlux Digital Solutions",
              "url": "https://bytesflux.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://bytesflux.com/logo.png",
                "width": 512,
                "height": 512,
                "caption": "BytesFlux Logo"
              },
              "image": "https://bytesflux.com/logo.png",
              "description": "Professional web development, mobile app development, graphic design, and SEO services in Pakistan",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Pakistan"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://facebook.com/bytesflux",
                "https://twitter.com/bytesflux",
                "https://instagram.com/bytesflux"
              ]
            }),
          }}
        />
        
        {/* Brand Logo Schema for Google Search Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Brand",
              "name": "BytesFlux",
              "description": "Professional web development and digital solutions company in Pakistan",
              "url": "https://bytesflux.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://bytesflux.com/logo.png",
                "width": 512,
                "height": 512
              },
              "image": "https://bytesflux.com/logo.png",
              "brand": "BytesFlux",
              "foundingDate": "2019",
              "areaServed": "Pakistan",
              "serviceType": "Web Development, Mobile App Development, Graphic Design, SEO Services"
            }),
          }}
        />
        
        {/* Google Knowledge Graph Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "BytesFlux",
              "alternateName": "BytesFlux Digital Solutions",
              "url": "https://bytesflux.com",
              "description": "Pakistan's premier digital solutions company offering web development, mobile app development, graphic design, and SEO services",
              "publisher": {
                "@type": "Organization",
                "name": "BytesFlux",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://bytesflux.com/logo.png",
                  "width": 512,
                  "height": 512
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://bytesflux.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
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
