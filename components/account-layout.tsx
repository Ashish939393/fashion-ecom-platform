"use client"

import type React from "react"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { User, Package, MapPin, Heart, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccountLayoutProps {
  children: React.ReactNode
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  if (!user) {
    router.push("/login")
    return null
  }

  const navItems = [
    {
      label: "Profile",
      href: "/account",
      icon: <User className="h-5 w-5 mr-2" />,
    },
    {
      label: "Orders",
      href: "/account/orders",
      icon: <Package className="h-5 w-5 mr-2" />,
    },
    {
      label: "Addresses",
      href: "/account/addresses",
      icon: <MapPin className="h-5 w-5 mr-2" />,
    },
    {
      label: "Wishlist",
      href: "/wishlist",
      icon: <Heart className="h-5 w-5 mr-2" />,
    },
  ]

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <div className="text-center mb-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-2">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      pathname === item.href && "bg-primary/10 text-primary hover:bg-primary/20",
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600" onClick={logout}>
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="md:col-span-3">
          <div className="bg-white p-6 rounded-lg border">{children}</div>
        </div>
      </div>
    </div>
  )
}
