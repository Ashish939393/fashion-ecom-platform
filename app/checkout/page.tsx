"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import toast from "react-hot-toast"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Landmark, ShieldCheck, ArrowLeft } from "lucide-react"

// Sample addresses data
const addresses = [
  {
    id: "1",
    name: "John Doe",
    type: "home",
    street: "123 Fashion Street",
    city: "Style City",
    state: "SC",
    zip: "12345",
    country: "United States",
    phone: "+1 (555) 123-4567",
    isDefault: true,
  },
  {
    id: "2",
    name: "John Doe",
    type: "work",
    street: "456 Business Avenue",
    city: "Commerce City",
    state: "CC",
    zip: "67890",
    country: "United States",
    phone: "+1 (555) 987-6543",
    isDefault: false,
  },
]

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(addresses[0].id)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [savePaymentInfo, setSavePaymentInfo] = useState(false)
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    billingAddress: "same",
  })

  // Calculate order totals
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  if (cart.length === 0) {
    router.push("/cart")
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate successful order
    toast.success("Thank you for your purchase. Your order has been confirmed")

    // Clear cart and redirect to success page
    clearCart()
    router.push("/checkout/success")
    setIsProcessing(false)
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main checkout form */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address.id} className="flex items-start space-x-3">
                  <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress} className="flex-1">
                    <div className="flex items-start space-x-3">
                      <RadioGroupItem value={address.id} id={`address-${address.id}`} className="mt-1" />
                      <div className="flex-1">
                        <Label
                          htmlFor={`address-${address.id}`}
                          className="flex items-center font-medium cursor-pointer"
                        >
                          {address.type.charAt(0).toUpperCase() + address.type.slice(1)} Address
                          {address.isDefault && (
                            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          )}
                        </Label>
                        <div className="text-sm text-muted-foreground mt-1">
                          <p>{address.name}</p>
                          <p>{address.street}</p>
                          <p>
                            {address.city}, {address.state} {address.zip}
                          </p>
                          <p>{address.country}</p>
                          <p>{address.phone}</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              ))}
              <Button variant="outline" onClick={() => router.push("/account/addresses")}>
                Add New Address
              </Button>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>
            <RadioGroup defaultValue="standard" className="space-y-3">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="standard" id="standard" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="standard" className="flex justify-between cursor-pointer">
                    <span className="font-medium">Standard Shipping (3-5 business days)</span>
                    <span>{subtotal > 50 ? "Free" : "$5.99"}</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">Delivery by Jun 20 - Jun 22</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <RadioGroupItem value="express" id="express" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="express" className="flex justify-between cursor-pointer">
                    <span className="font-medium">Express Shipping (1-2 business days)</span>
                    <span>$12.99</span>
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">Delivery by Jun 18 - Jun 19</p>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
            <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="credit-card" className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" /> Credit Card
                </TabsTrigger>
                <TabsTrigger value="bank-transfer" className="flex items-center">
                  <Landmark className="h-4 w-4 mr-2" /> Bank Transfer
                </TabsTrigger>
              </TabsList>
              <TabsContent value="credit-card" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Expiry Date</Label>
                    <Input
                      id="cardExpiry"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardCvc">CVC</Label>
                    <Input
                      id="cardCvc"
                      name="cardCvc"
                      placeholder="123"
                      value={formData.cardCvc}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="savePaymentInfo"
                    checked={savePaymentInfo}
                    onCheckedChange={(checked) => setSavePaymentInfo(!!checked)}
                  />
                  <Label htmlFor="savePaymentInfo" className="text-sm font-normal">
                    Save this card for future purchases
                  </Label>
                </div>
              </TabsContent>
              <TabsContent value="bank-transfer" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Please use the following information to complete your bank transfer. Your order will be processed once
                  the payment is confirmed.
                </p>
                <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Bank Name:</span> Fashion Bank
                  </p>
                  <p>
                    <span className="font-medium">Account Name:</span> FashionHub Inc.
                  </p>
                  <p>
                    <span className="font-medium">Account Number:</span> 1234567890
                  </p>
                  <p>
                    <span className="font-medium">Routing Number:</span> 987654321
                  </p>
                  <p>
                    <span className="font-medium">Reference:</span> {user?.id}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/cart")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
            </Button>
            <Button onClick={handlePlaceOrder} disabled={isProcessing} className="min-w-[150px]">
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg border p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden relative flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <div className="text-xs text-muted-foreground">
                        <span className="capitalize">{item.color}</span> / {item.size}
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Order Totals */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-4 text-xs text-muted-foreground flex items-center">
                <ShieldCheck className="h-4 w-4 mr-1 text-green-500" />
                Your payment information is encrypted and secure.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
