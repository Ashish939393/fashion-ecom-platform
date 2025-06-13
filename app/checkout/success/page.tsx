"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, ShoppingBag } from "lucide-react"

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const { cart } = useCart()

  // If cart is not empty, redirect to home
  useEffect(() => {
    if (cart.length > 0) {
      router.push("/")
    }
  }, [cart, router])

  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0")}`

  return (
    <div className="container py-12">
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white rounded-lg border p-8">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>

          <div className="bg-muted p-4 rounded-lg mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Order Number:</span>
              <span>{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Order Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <Package className="h-4 w-4 text-primary" />
              <span>You will receive a shipping confirmation email once your order ships.</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm">
              <ShoppingBag className="h-4 w-4 text-primary" />
              <span>You can track your order in the "My Orders" section of your account.</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/account/orders">View My Orders</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
