"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import toast from "react-hot-toast"
import { Heart, ShoppingCart, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { cn } from "@/lib/utils"

export type Product = {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  isNew?: boolean
  isSale?: boolean
  colors: string[]
  sizes: string[]
}

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  const [isHovered, setIsHovered] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      color: product.colors[0],
      size: product.sizes[0],
    })

    toast.success(`${product.name} added to cart`)
  }

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: product.colors[0],
        size: product.sizes[0],
      })
    }
  }

  return (
    <div
      className={cn("group relative rounded-lg overflow-hidden border bg-white product-card-hover", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
        {product.isSale && <Badge className="bg-primary hover:bg-primary/90">-{discount}%</Badge>}
      </div>

      {/* Wishlist button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute top-2 right-2 z-10 rounded-full bg-white/80 hover:bg-white",
          isInWishlist(product.id) ? "text-red-500" : "text-gray-500",
        )}
        onClick={handleWishlist}
      >
        <Heart className={cn("h-5 w-5", isInWishlist(product.id) && "fill-current")} />
        <span className="sr-only">Add to wishlist</span>
      </Button>

      {/* Product image */}
      <Link href={`/product/${product.id}`} className="block aspect-square">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Quick actions */}
      <div className="product-actions absolute bottom-0 left-0 right-0 flex justify-center p-4 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-white hover:bg-white/90 text-foreground"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
          <Link href={`/product/${product.id}`}>
            <Button variant="secondary" size="icon" className="rounded-full bg-white hover:bg-white/90 text-foreground">
              <Eye className="h-4 w-4" />
              <span className="sr-only">Quick view</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-sm mb-1 line-clamp-1">{product.name}</h3>
        </Link>
        <div className="flex items-center mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn("h-3 w-3", i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  )
}
