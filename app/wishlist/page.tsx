"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"
import { useWishlist } from "@/components/wishlist-provider"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Trash2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [searchTerm, setSearchTerm] = useState("")

  // Filter wishlist items based on search term
  const filteredWishlist = wishlist.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddToCart = (item: (typeof wishlist)[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      color: item.color,
      size: item.size,
    })

    toast.success(`${item.name} has been added to your cart`)
  }

  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id)
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} in your wishlist
          </p>
        </div>
        <div className="flex gap-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search wishlist"
              className="pl-9 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {wishlist.length > 0 && (
            <Button variant="outline" className="text-red-500" onClick={clearWishlist}>
              Clear Wishlist
            </Button>
          )}
        </div>
      </div>

      {filteredWishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredWishlist.map((item) => (
            <div key={item.id} className="bg-white border rounded-lg overflow-hidden group">
              <div className="relative aspect-square">
                <Link href={`/product/${item.id}`}>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <Link href={`/product/${item.id}`} className="block">
                  <h3 className="font-medium mb-1 line-clamp-1">{item.name}</h3>
                </Link>
                <div className="text-sm text-muted-foreground mb-2">
                  <span className="capitalize">{item.color}</span> / {item.size}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">${item.price.toFixed(2)}</span>
                  <Button size="sm" variant="outline" onClick={() => handleAddToCart(item)}>
                    <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            {searchTerm
              ? "No items match your search criteria."
              : "Save your favorite items to your wishlist for easy access later."}
          </p>
          <Button asChild size="lg">
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
