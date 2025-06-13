import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"
import { AuthProvider } from "@/components/auth-provider"
import { WishlistProvider } from "@/components/wishlist-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FashionHub - Your Ultimate Fashion Destination",
  description: "Shop the latest trends in fashion with FashionHub",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 3000,
                    style: {
                      background: "#fff",
                      color: "#333",
                      border: "1px solid #eee",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    },
                    success: {
                      iconTheme: {
                        primary: "#ff8800",
                        secondary: "#fff",
                      },
                    },
                  }}
                />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
      </body>
    </html>
  )
}
