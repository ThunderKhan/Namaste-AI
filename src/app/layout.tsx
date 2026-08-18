import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

const BASE_URL = "https://namaste-ai-dev.vercel.app";

export const metadata: Metadata = {
  title: "Namaste AI",
  description:
    "Namaste AI by Akshay Saini (Founder of NamasteDev) — Notes, learnings, and projects — exploring LLMs, RAG, AI agents, MCP, and AI-powered applications",
  keywords: [
    "artificial-intelligence",
    "ai",
    "generative-ai",
    "llm",
    "large-language-models",
    "ai-applications",
    "ai-agents",
    "agentic-ai",
    "rag",
    "retrieval-augmented-generation",
    "mcp",
    "model-context-protocol",
    "prompt-engineering",
    "transformers",
    "chatgpt",
    "openai",
    "machine-learning",
    "ai-engineering",
    "ai-native",
    "software-engineering",
  ],
  authors: [{ name: "Chetan Nada", url: "https://www.linkedin.com/in/chetannada/" }],
  openGraph: {
    title: "Namaste AI",
    description:
      "Namaste AI by Akshay Saini (Founder of NamasteDev) — Notes, learnings, and projects — exploring LLMs, RAG, AI agents, MCP, and AI-powered applications",
    type: "website",
  },

  generator: "Next.js",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
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
  other: {
    referrer: "no-referrer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-body text-text">
        <ThemeProvider>
          <Header />
          <main className="grow flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
