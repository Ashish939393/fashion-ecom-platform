"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [couponError, setCouponError] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState("")
  const router = useRouter()

  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping - discount

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  const handleRemoveItem = (id: string) => {
    removeFromCart(id)
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code")
      return
    }

    setIsApplyingCoupon(true)
    setCouponError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demo purposes, accept specific coupon codes
    if (couponCode.toUpperCase() === "WELCOME10") {
      const discountAmount = subtotal * 0.1 // 10% discount
      setDiscount(Number.parseFloat(discountAmount.toFixed(2)))
      setAppliedCoupon("WELCOME10")
      toast.success("10% discount has been applied to your order")
    } else if (couponCode.toUpperCase() === "FREESHIP") {
      setDiscount(shipping)
      setAppliedCoupon("FREESHIP")
      toast.success("Free shipping has been applied to your order")
    } else {
      setCouponError("Invalid or expired coupon code")
      toast.error("Invalid or expired coupon code")
    }

    setIsApplyingCoupon(false)
  }

  const handleRemoveCoupon = () => {
    setDiscount(0)
    setCouponCode("")
    setAppliedCoupon("")
    toast.success("The coupon has been removed from your order")
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Please add items to your cart before proceeding to checkout")
      return
    }

    router.push("/checkout")
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cart.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="p-4 bg-muted">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <h3 className="font-medium">Product</h3>
                  </div>
                  <div className="col-span-2 text-center">
                    <h3 className="font-medium">Price</h3>
                  </div>
                  <div className="col-span-2 text-center">
                    <h3 className="font-medium">Quantity</h3>
                  </div>
                  <div className="col-span-2 text-right">
                    <h3 className="font-medium">Total</h3>
                  </div>
                </div>
              </div>

              {cart.map((item) => (
                <div key={item.id} className="p-4 border-b last:border-b-0">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden relative">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="text-sm text-muted-foreground">
                            <span className="capitalize">{item.color}</span> / {item.size}
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-sm text-red-500 flex items-center mt-1"
                          >
                            <Trash2 className="h-3 w-3 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">${item.price.toFixed(2)}</div>
                    <div className="col-span-2">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="col-span-2 text-right font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => router.push("/shop")}>
                Continue Shopping
              </Button>
              <Button variant="outline" onClick={clearCart} className="text-red-500">
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg border p-4">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="flex items-center">
                      Discount
                      <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        {appliedCoupon}
                      </span>
                      <button onClick={handleRemoveCoupon} className="ml-1 text-red-500">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Code */}
              {!appliedCoupon && (
                <div className="mt-4">
                  <h4 className="font-medium text-sm mb-2">Apply Coupon Code</h4>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button onClick={handleApplyCoupon} disabled={isApplyingCoupon}>
                      {isApplyingCoupon ? "Applying..." : "Apply"}
                    </Button>
                  </div>
                  {couponError && <p className="text-red-500 text-sm mt-1">{couponError}</p>}
                  <p className="text-xs text-muted-foreground mt-2">
                    Try <span className="font-medium">WELCOME10</span> for 10% off or{" "}
                    <span className="font-medium">FREESHIP</span> for free shipping
                  </p>
                </div>
              )}

              <Button className="w-full mt-6" size="lg" onClick={handleCheckout}>
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="bg-muted p-4 rounded-lg text-sm space-y-2">
              <div className="flex items-start space-x-2">
                <ShoppingBag className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <p>Free shipping on orders over $50</p>
              </div>
              <div className="flex items-start space-x-2">
                <ShoppingBag className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <p>30-day easy returns</p>
              </div>
              <div className="flex items-start space-x-2">
                <ShoppingBag className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <p>100% secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild size="lg">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
