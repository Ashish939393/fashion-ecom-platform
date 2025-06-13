"use client"

import type React from "react"

import { useState } from "react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Package, CheckCircle, Clock, Truck, MapPin } from "lucide-react"

// Sample order data
const sampleOrder = {
  id: "ORD-12345678",
  date: "June 10, 2025",
  status: "In Transit",
  estimatedDelivery: "June 15, 2025",
  trackingNumber: "TRK-87654321",
  items: [
    {
      id: "1",
      name: "Slim Fit Cotton Shirt",
      quantity: 1,
      price: 49.99,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "2",
      name: "Classic Denim Jacket",
      quantity: 1,
      price: 89.99,
      image: "/placeholder.svg?height=80&width=80",
    },
  ],
  shippingAddress: {
    name: "John Doe",
    street: "123 Fashion Street",
    city: "Style City",
    state: "SC",
    zip: "12345",
    country: "United States",
  },
  trackingHistory: [
    {
      status: "Order Placed",
      date: "June 10, 2025",
      time: "09:30 AM",
      location: "Online",
      completed: true,
    },
    {
      status: "Order Processed",
      date: "June 11, 2025",
      time: "10:15 AM",
      location: "Warehouse",
      completed: true,
    },
    {
      status: "Shipped",
      date: "June 12, 2025",
      time: "02:45 PM",
      location: "Distribution Center",
      completed: true,
    },
    {
      status: "In Transit",
      date: "June 13, 2025",
      time: "08:20 AM",
      location: "En Route to Destination",
      completed: true,
    },
    {
      status: "Out for Delivery",
      date: "June 15, 2025",
      time: "Expected",
      location: "Local Courier",
      completed: false,
    },
    {
      status: "Delivered",
      date: "June 15, 2025",
      time: "Expected",
      location: "Destination Address",
      completed: false,
    },
  ],
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderDetails, setOrderDetails] = useState<typeof sampleOrder | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (orderNumber.trim() === "" || email.trim() === "") {
      toast.error("Please enter both order number and email")
      setIsSubmitting(false)
      return
    }

    // For demo purposes, always return the sample order
    setOrderDetails(sampleOrder)
    setIsSubmitting(false)
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Track Your Order</h1>

      {!orderDetails ? (
        <div className="max-w-md mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <p className="text-muted-foreground mb-6">
              Enter your order number and email address to track your order status.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Order Number</Label>
                <Input
                  id="orderNumber"
                  placeholder="e.g., ORD-12345678"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g., john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Tracking..." : "Track Order"}
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Order #{orderDetails.id}</h2>
                <p className="text-muted-foreground">Placed on {orderDetails.date}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {orderDetails.status}
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Shipping Address</h3>
                <address className="not-italic text-muted-foreground">
                  {orderDetails.shippingAddress.name}
                  <br />
                  {orderDetails.shippingAddress.street}
                  <br />
                  {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state}{" "}
                  {orderDetails.shippingAddress.zip}
                  <br />
                  {orderDetails.shippingAddress.country}
                </address>
              </div>
              <div>
                <h3 className="font-medium mb-2">Order Information</h3>
                <div className="text-muted-foreground">
                  <p>
                    <span className="font-medium text-foreground">Tracking Number:</span> {orderDetails.trackingNumber}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Estimated Delivery:</span>{" "}
                    {orderDetails.estimatedDelivery}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <h3 className="text-lg font-semibold mb-6">Tracking History</h3>
            <div className="relative">
              {orderDetails.trackingHistory.map((event, index) => (
                <div key={index} className="flex mb-8 last:mb-0">
                  <div className="flex flex-col items-center mr-4">
                    <div
                      className={`rounded-full p-2 ${
                        event.completed ? "bg-primary text-white" : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {index === 0 ? (
                        <Package className="h-5 w-5" />
                      ) : index === orderDetails.trackingHistory.length - 1 ? (
                        <MapPin className="h-5 w-5" />
                      ) : index === 1 ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : index === 2 ? (
                        <Truck className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                    {index < orderDetails.trackingHistory.length - 1 && (
                      <div className={`w-0.5 h-full ${event.completed ? "bg-primary" : "bg-gray-200"} my-1`}></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{event.status}</h4>
                    <p className="text-sm text-muted-foreground">
                      {event.date} • {event.time}
                    </p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Order Items</h3>
            <div className="space-y-4">
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="h-20 w-20 bg-gray-100 rounded overflow-hidden mr-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    <p className="text-sm">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button variant\
