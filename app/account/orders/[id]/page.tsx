"use client"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Package, Truck, CheckCircle, MapPin } from "lucide-react"

// Sample order data
const orders = {
  "ORD-12345678": {
    id: "ORD-12345678",
    date: "June 10, 2025",
    status: "Delivered",
    total: 139.98,
    items: [
      {
        id: "1",
        name: "Slim Fit Cotton Shirt",
        quantity: 1,
        price: 49.99,
        image: "/placeholder.svg?height=80&width=80",
        color: "white",
        size: "M",
      },
      {
        id: "2",
        name: "Classic Denim Jacket",
        quantity: 1,
        price: 89.99,
        image: "/placeholder.svg?height=80&width=80",
        color: "blue",
        size: "L",
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
    paymentMethod: "Credit Card (ending in 4242)",
    trackingNumber: "TRK-87654321",
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
        status: "Delivered",
        date: "June 15, 2025",
        time: "11:20 AM",
        location: "Destination Address",
        completed: true,
      },
    ],
  },
  "ORD-87654321": {
    id: "ORD-87654321",
    date: "May 25, 2025",
    status: "Delivered",
    total: 59.99,
    items: [
      {
        id: "3",
        name: "Floral Summer Dress",
        quantity: 1,
        price: 59.99,
        image: "/placeholder.svg?height=80&width=80",
        color: "blue",
        size: "S",
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
    paymentMethod: "Credit Card (ending in 4242)",
    trackingNumber: "TRK-12345678",
    trackingHistory: [
      {
        status: "Order Placed",
        date: "May 25, 2025",
        time: "14:30 PM",
        location: "Online",
        completed: true,
      },
      {
        status: "Order Processed",
        date: "May 26, 2025",
        time: "09:15 AM",
        location: "Warehouse",
        completed: true,
      },
      {
        status: "Shipped",
        date: "May 27, 2025",
        time: "11:45 AM",
        location: "Distribution Center",
        completed: true,
      },
      {
        status: "Delivered",
        date: "May 30, 2025",
        time: "10:20 AM",
        location: "Destination Address",
        completed: true,
      },
    ],
  },
}

export default function OrderDetailPage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string

  if (!user) {
    router.push("/login")
    return null
  }

  const order = orders[orderId as keyof typeof orders]

  if (!order) {
    return (
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <Button variant="outline" asChild className="mb-6">
            <Link href="/account/orders">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
            </Link>
          </Button>
          <div className="bg-white p-6 rounded-lg border text-center">
            <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
            <p className="text-muted-foreground mb-6">The order you are looking for does not exist.</p>
            <Button asChild>
              <Link href="/account/orders">View All Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <Button variant="outline" asChild className="mb-6">
          <Link href="/account/orders">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Link>
        </Button>

        <div className="bg-white p-6 rounded-lg border mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Order #{order.id}</h1>
              <p className="text-muted-foreground">Placed on {order.date}</p>
            </div>
            <Badge className={getStatusBadgeColor(order.status)}>{order.status}</Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <address className="not-italic text-muted-foreground">
                {order.shippingAddress.name}
                <br />
                {order.shippingAddress.street}
                <br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                <br />
                {order.shippingAddress.country}
              </address>
            </div>
            <div>
              <h3 className="font-medium mb-2">Order Information</h3>
              <div className="text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Payment Method:</span> {order.paymentMethod}
                </p>
                <p>
                  <span className="font-medium text-foreground">Tracking Number:</span> {order.trackingNumber}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <h3 className="font-medium mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center">
                <div className="h-20 w-20 bg-gray-100 rounded overflow-hidden relative mr-4">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <div className="text-sm text-muted-foreground">
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

          <Separator className="my-6" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${(order.total * 0.08).toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${(order.total * 1.08).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Tracking History */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-6">Tracking History</h3>
          <div className="relative">
            {order.trackingHistory.map((event, index) => (
              <div key={index} className="flex mb-8 last:mb-0">
                <div className="flex flex-col items-center mr-4">
                  <div
                    className={`rounded-full p-2 ${
                      event.completed ? "bg-primary text-white" : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {index === 0 ? (
                      <Package className="h-5 w-5" />
                    ) : index === order.trackingHistory.length - 1 ? (
                      <MapPin className="h-5 w-5" />
                    ) : index === 1 ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Truck className="h-5 w-5" />
                    )}
                  </div>
                  {index < order.trackingHistory.length - 1 && (
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
      </div>
    </div>
  )
}
