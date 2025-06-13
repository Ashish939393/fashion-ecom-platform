"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Heart, ShoppingCart, Share2, Star, Check, ChevronRight, Truck, RotateCcw, Shield } from "lucide-react"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useWishlist } from "@/components/wishlist-provider"
import { ProductCard, type Product } from "@/components/product-card"
import { cn } from "@/lib/utils"

// Sample product data - in a real app, this would come from an API
const products: Record<
  string,
  Product & {
    description: string
    features: string[]
    specifications: Record<string, string>
    images: string[]
  }
> = {
  "1": {
    id: "1",
    name: "Slim Fit Cotton Shirt",
    price: 49.99,
    image: "/products/men_wear/puma_regular_tshirt.jpg",
    category: "Tops",
    rating: 4.5,
    isNew: true,
    colors: ["white", "blue", "black"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This slim-fit cotton shirt is perfect for any occasion. Made from 100% premium cotton, it offers exceptional comfort and breathability. The modern slim fit design provides a sleek silhouette while maintaining comfort throughout the day. Versatile enough for both casual and formal settings, this shirt is a must-have addition to your wardrobe.",
    features: [
      "100% premium cotton fabric",
      "Slim fit design",
      "Button-down collar",
      "Machine washable",
      "Available in multiple colors",
    ],
    specifications: {
      Material: "100% Cotton",
      Fit: "Slim Fit",
      Collar: "Button-Down",
      Sleeve: "Long Sleeve",
      Care: "Machine Wash Cold, Tumble Dry Low",
    },
    images: [
      "/products/men_wear/puma_regular_tshirt.jpg",
      "/placeholder.svg?height=600&width=600&text=Product%20Image%202",
      "/placeholder.svg?height=600&width=600&text=Product%20Image%203",
      "/placeholder.svg?height=600&width=600&text=Product%20Image%204",
    ],
  },
  "2": {
    id: "2",
    name: "Classic Denim Jacket",
    price: 89.99,
    image: "/products/jackets/brown_jackets.jpg",
    category: "Jackets",
    rating: 4.8,
    isNew: true,
    colors: ["blue", "black"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "A timeless denim jacket that never goes out of style. Crafted from premium denim fabric, this jacket offers durability and comfort. The classic design features button closures, chest pockets, and adjustable cuffs. Perfect for layering in any season, this versatile piece will quickly become a staple in your wardrobe.",
    features: [
      "Premium denim fabric",
      "Button front closure",
      "Chest pockets with button flaps",
      "Adjustable button cuffs",
      "Classic fit",
    ],
    specifications: {
      Material: "100% Cotton Denim",
      Fit: "Classic Fit",
      Closure: "Button Front",
      Pockets: "Two Chest Pockets, Two Side Pockets",
      Care: "Machine Wash Cold, Tumble Dry Low",
    },
    images: [
      "/products/jackets/brown_jackets.jpg",
      "/placeholder.svg?height=600&width=600&text=Denim%20Jacket%202",
      "/placeholder.svg?height=600&width=600&text=Denim%20Jacket%203",
      "/placeholder.svg?height=600&width=600&text=Denim%20Jacket%204",
    ],
  },
  "3": {
    id: "3",
    name: "Floral Summer Dress",
    price: 59.99,
    image: "/placeholder.svg?height=600&width=600&text=Summer%20Dress%201",
    category: "Women Mini Dresses",
    rating: 4.3,
    isNew: true,
    colors: ["red", "blue", "green"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "A beautiful floral summer dress perfect for warm weather occasions. The lightweight fabric keeps you cool while the flattering silhouette enhances your figure. The vibrant floral pattern adds a touch of femininity and style to your summer wardrobe.",
    features: ["Lightweight fabric", "Floral pattern", "V-neckline", "Short sleeves", "Above-knee length"],
    specifications: {
      Material: "100% Rayon",
      Fit: "Regular Fit",
      Length: "Mini",
      Closure: "Button Back",
      Care: "Hand Wash Cold, Line Dry",
    },
    images: [
      "/products/women_wear/vero_moda_woment_tshirt.jpg",
      "/placeholder.svg?height=600&width=600&text=Summer%20Dress%202",
      "/placeholder.svg?height=600&width=600&text=Summer%20Dress%203",
      "/placeholder.svg?height=600&width=600&text=Summer%20Dress%204",
    ],
  },
  "4": {
    id: "4",
    name: "Leather Ankle Boots",
    price: 129.99,
    image: "/placeholder.svg?height=600&width=600&text=Ankle%20Boots%201",
    category: "Shoes",
    rating: 4.7,
    isNew: true,
    colors: ["black", "brown"],
    sizes: ["36", "37", "38", "39", "40", "41"],
    description:
      "These stylish leather ankle boots combine fashion with functionality. Crafted from premium leather, they offer durability and comfort for all-day wear. The classic design features a side zipper for easy on and off, while the stacked heel provides just the right amount of height.",
    features: [
      "Genuine leather upper",
      "Side zipper closure",
      "Cushioned insole",
      "Stacked heel",
      "Non-slip rubber outsole",
    ],
    specifications: {
      Material: "Genuine Leather",
      "Heel Height": "2 inches",
      Closure: "Side Zipper",
      Lining: "Textile",
      Care: "Clean with leather conditioner",
    },
    images: [
      "/products/shoes/formal_brown_shoes_slip.jpeg",
      "/placeholder.svg?height=600&width=600&text=Ankle%20Boots%202",
      "/placeholder.svg?height=600&width=600&text=Ankle%20Boots%203",
      "/placeholder.svg?height=600&width=600&text=Ankle%20Boots%204",
    ],
  },
  "5": {
    id: "5",
    name: "Wool Blend Blazer",
    price: 149.99,
    image: "/products/blazer/men_white_blazer.jpg",
    category: "Men's Suits and Blazers",
    rating: 4.6,
    isNew: true,
    colors: ["navy", "gray", "black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "Elevate your formal wardrobe with this sophisticated wool blend blazer. The tailored fit creates a sharp silhouette, while the premium fabric ensures comfort and durability. Perfect for business meetings, special occasions, or pairing with jeans for a smart-casual look.",
    features: ["Wool blend fabric", "Tailored fit", "Two-button closure", "Notched lapels", "Four interior pockets"],
    specifications: {
      Material: "70% Wool, 30% Polyester",
      Fit: "Tailored Fit",
      Closure: "Two-Button",
      Lining: "100% Polyester",
      Care: "Dry Clean Only",
    },
    images: [
      "/products/blazer/men_white_blazer.jpeg",
      "/placeholder.svg?height=600&width=600&text=Blazer%202",
      "/placeholder.svg?height=600&width=600&text=Blazer%203",
      "/placeholder.svg?height=600&width=600&text=Blazer%204",
    ],
  },
  "6": {
    id: "6",
    name: "Embroidered Ethnic Kurta",
    price: 79.99,
    image: "/placeholder.svg?height=600&width=600&text=Kurta%201",
    category: "Ethnic",
    rating: 4.4,
    isNew: true,
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "This beautifully embroidered ethnic kurta combines traditional craftsmanship with contemporary style. The intricate embroidery adds a touch of elegance, while the comfortable cotton fabric ensures you stay cool and comfortable all day long. Perfect for festivals, celebrations, or any special occasion.",
    features: [
      "Hand embroidered details",
      "100% cotton fabric",
      "Straight cut design",
      "Side slits for ease of movement",
      "Button placket",
    ],
    specifications: {
      Material: "100% Cotton",
      Fit: "Regular Fit",
      Length: "Knee Length",
      Closure: "Button Front",
      Care: "Machine Wash Cold, Tumble Dry Low",
    },
    images: [
      "/placeholder.svg?height=600&width=600&text=Kurta%201",
      "/placeholder.svg?height=600&width=600&text=Kurta%202",
      "/placeholder.svg?height=600&width=600&text=Kurta%203",
      "/placeholder.svg?height=600&width=600&text=Kurta%204",
    ],
  },
}

// Sample related products
const relatedProducts: Product[] = [
  {
    id: "3",
    name: "Floral Summer Dress",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Women Mini Dresses",
    rating: 4.3,
    isNew: true,
    colors: ["red", "blue", "green"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "4",
    name: "Leather Ankle Boots",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Shoes",
    rating: 4.7,
    isNew: true,
    colors: ["black", "brown"],
    sizes: ["36", "37", "38", "39", "40", "41"],
  },
  {
    id: "5",
    name: "Wool Blend Blazer",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Men's Suits and Blazers",
    rating: 4.6,
    isNew: true,
    colors: ["navy", "gray", "black"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "6",
    name: "Embroidered Ethnic Kurta",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Ethnic",
    rating: 4.4,
    isNew: true,
    colors: ["red", "blue", "green"],
    sizes: ["S", "M", "L", "XL"],
  },
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const product = products[productId]

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "")
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "")
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you are looking for does not exist.</p>
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: selectedColor,
        size: selectedSize,
      },
      quantity,
    )
  }

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast.success(`${product.name} removed from wishlist`)
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: selectedColor,
        size: selectedSize,
      })
      toast.success(`${product.name} added to wishlist`)
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <Link href="/shop" className="text-muted-foreground hover:text-foreground">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <Link
          href={`/shop/${product.category.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-muted-foreground hover:text-foreground"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
        <span className="font-medium truncate">{product.name}</span>
      </div>

      {/* Product details */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[activeImageIndex] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-md border",
                  activeImageIndex === index && "ring-2 ring-primary",
                )}
                onClick={() => setActiveImageIndex(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                    )}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">{product.rating} (120 reviews)</span>
              </div>
            </div>
          </div>

          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

          <Separator />

          {/* Color selection */}
          <div>
            <h3 className="font-medium mb-3">
              Color: <span className="capitalize">{selectedColor}</span>
            </h3>
            <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex gap-2">
              {product.colors.map((color) => (
                <div key={color} className="flex items-center">
                  <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
                  <Label
                    htmlFor={`color-${color}`}
                    className={cn(
                      "h-8 w-8 rounded-full cursor-pointer flex items-center justify-center border-2",
                      selectedColor === color ? "border-primary" : "border-transparent",
                    )}
                  >
                    <span className="h-6 w-6 rounded-full" style={{ backgroundColor: color }} />
                    {selectedColor === color && <Check className="absolute h-4 w-4 text-white" />}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Size selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">
                Size: <span>{selectedSize}</span>
              </h3>
              <Button variant="link" className="p-0 h-auto text-primary">
                Size Guide
              </Button>
            </div>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <div key={size} className="flex items-center">
                  <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                  <Label
                    htmlFor={`size-${size}`}
                    className={cn(
                      "h-10 min-w-10 px-3 rounded cursor-pointer flex items-center justify-center border",
                      selectedSize === size
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-medium mb-3">Quantity</h3>
            <div className="flex items-center">
              <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={incrementQuantity}>
                +
              </Button>
            </div>
          </div>

          {/* Add to cart and wishlist */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 gap-2" size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={cn("gap-2", isInWishlist(product.id) && "text-red-500")}
              onClick={handleWishlist}
            >
              <Heart className={cn("h-5 w-5", isInWishlist(product.id) && "fill-current")} />
              {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </div>

          {/* Shipping info */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <span>30-day easy returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <span>2-year warranty</span>
            </div>
          </div>

          {/* Share */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Product details tabs */}
      <div className="mb-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="features"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2"
            >
              Features
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2"
            >
              Reviews (120)
            </TabsTrigger>
          </TabsList>
          <div className="pt-6">
            <TabsContent value="description" className="mt-0">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="features" className="mt-0">
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 gap-2 py-2 border-b">
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-0">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Customer Reviews</h3>
                <div className="flex justify-center items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-6 w-6",
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                      )}
                    />
                  ))}
                  <span className="ml-2 text-lg font-medium">{product.rating} out of 5</span>
                </div>
                <p className="text-muted-foreground mb-4">Based on 120 reviews</p>
                <Button>Write a Review</Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Related products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  )
}
