import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Audiowide } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  weight: "400",
  variable: "--font-audiowide",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const SITE_NAME = "Namaste AI";
const SITE_DESCRIPTION =
  "Namaste AI — Handwritten notes, AI concepts, and real-world projects from the Namaste AI course by Akshay Saini (NamasteDev). Learn LLMs, RAG, AI agents, prompt engineering, and build AI-powered applications.";

export const metadata: Metadata = {
  title: {
    default: "Namaste AI — Learn AI Concepts & Build Real-World AI Projects",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "namaste ai",
    "namaste ai course",
    "namaste ai notes",
    "namaste ai handwritten notes",
    "namaste ai by akshay saini",
    "namastedev",
    "akshay saini ai course",
    "artificial intelligence",
    "machine learning",
    "deep learning",
    "neural networks",
    "generative ai",
    "gen ai",
    "large language models",
    "llm",
    "gpt",
    "chatgpt",
    "openai",
    "gemini ai",
    "claude ai",
    "llama",
    "open source llm",
    "prompt engineering",
    "fine tuning llm",
    "rag",
    "retrieval augmented generation",
    "vector database",
    "embeddings",
    "transformers",
    "attention mechanism",
    "ai agents",
    "agentic ai",
    "mcp",
    "model context protocol",
    "ai tools",
    "langchain",
    "ai applications",
    "ai projects",
    "ai powered apps",
    "build with ai",
    "learn ai",
    "ai tutorial",
    "ai notes",
    "ai handwritten notes",
    "ai engineering",
    "ai native",
    "software engineering",
  ],
  authors: [{ name: "Chetan Nada", url: "https://www.linkedin.com/in/chetannada/" }],
  creator: "Chetan Nada",
  publisher: "Chetan Nada",
  openGraph: {
    title: "Namaste AI — Learn AI Concepts & Build Real-World AI Projects",
    description: SITE_DESCRIPTION,
    url: BASE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/hero-ai.webp",
        width: 1200,
        height: 630,
        alt: "Namaste AI — Learn AI from concepts to real projects",
      },
    ],
  },

  generator: "Next.js",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ba0nbpoJTwd43GMnWoqslECLZ68I8E1Ah_GZ-hMi_aM",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: BASE_URL,
  description: SITE_DESCRIPTION,
  author: {
    "@type": "Person",
    name: "Chetan Nada",
    url: "https://www.linkedin.com/in/chetannada",
    sameAs: [
      "https://x.com/chetannada",
      "https://github.com/chetannada",
      "https://www.linkedin.com/in/chetannada",
    ],
  },
  publisher: {
    "@type": "Person",
    name: "Chetan Nada",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${audiowide.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-body text-text">
        <Script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <Header />
          <main className="grow flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
