import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "@/app/globals.css"



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-500 dark:bg-gray-900">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'GulshanX.dev',
      description: 'GulshanX.dev is a blogging platform where you can share your thoughts, stories, and ideas with the world. Create and publish your own blogs in minutes.',
      keywords: ['GulshanX.dev', 'blogging platform', 'share thoughts', 'create blogs', 'publish blogs'],
      authors: [{ name: 'GulshanX.dev', url: 'https://gulshanx.dev' }],
      creator: 'GulshanX.dev',
      publisher: 'GulshanX.dev',
    };
