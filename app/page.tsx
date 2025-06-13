import Image from "next/image"
import Link from "next/link"
import { HeroSlider } from "@/components/hero-slider"
import { ProductTabs } from "@/components/product-tabs"
import { Button } from "@/components/ui/button"

// Sample data for hero slider
const heroSlides = [
  {
    id: 1,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Summer Collection 2025",
    subtitle: "Discover the hottest trends for the season",
    cta: "Shop Now",
    link: "/shop/summer-collection",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Exclusive Designer Pieces",
    subtitle: "Limited edition items you won't find anywhere else",
    cta: "Explore",
    link: "/shop/exclusive",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=600&width=1200",
    title: "Sale Up To 50% Off",
    subtitle: "Grab amazing deals before they're gone",
    cta: "View Offers",
    link: "/shop/sale",
  },
]

// Sample product data
const newArrivals = [
  {
    id: "1",
    name: "Slim Fit Cotton Shirt",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Tops",
    rating: 4.5,
    isNew: true,
    colors: ["white", "blue", "black"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "2",
    name: "Classic Denim Jacket",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Jackets",
    rating: 4.8,
    isNew: true,
    colors: ["blue", "black"],
    sizes: ["S", "M", "L", "XL"],
  },
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
  {
    id: "7",
    name: "Strappy Heeled Sandals",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Heels",
    rating: 4.2,
    isNew: true,
    colors: ["black", "nude", "red"],
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "8",
    name: "Graphic Print T-Shirt",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "T-Shirts",
    rating: 4.1,
    isNew: true,
    colors: ["white", "black", "gray"],
    sizes: ["S", "M", "L", "XL"],
  },
]

const topSelling = [
  {
    id: "9",
    name: "Classic White Sneakers",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Shoes",
    rating: 4.9,
    colors: ["white", "black"],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
  },
  {
    id: "10",
    name: "High-Waisted Skinny Jeans",
    price: 69.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Western",
    rating: 4.7,
    colors: ["blue", "black", "gray"],
    sizes: ["24", "26", "28", "30", "32"],
  },
  {
    id: "11",
    name: "Oversized Knit Sweater",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sweaters",
    rating: 4.6,
    colors: ["beige", "gray", "black"],
    sizes: ["S", "M", "L"],
  },
  {
    id: "12",
    name: "Leather Crossbody Bag",
    price: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    rating: 4.8,
    colors: ["black", "brown", "tan"],
    sizes: ["One Size"],
  },
  {
    id: "13",
    name: "Slim Fit Chino Pants",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Pants",
    rating: 4.5,
    colors: ["khaki", "navy", "olive"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: "14",
    name: "Cotton Blend Polo Shirt",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "T-Shirts and Shirts",
    rating: 4.4,
    colors: ["navy", "white", "black", "red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "15",
    name: "Floral Maxi Dress",
    price: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Women's Western Styles",
    rating: 4.7,
    colors: ["blue", "pink", "yellow"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "16",
    name: "Leather Belt",
    price: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    rating: 4.6,
    colors: ["black", "brown"],
    sizes: ["S", "M", "L"],
  },
]

const onSale = [
  {
    id: "17",
    name: "Puffer Jacket",
    price: 89.99,
    originalPrice: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Jackets",
    rating: 4.5,
    isSale: true,
    colors: ["black", "navy", "red"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "18",
    name: "Embellished Evening Dress",
    price: 129.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Women Mini Dresses",
    rating: 4.7,
    isSale: true,
    colors: ["black", "navy", "burgundy"],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "19",
    name: "Suede Chelsea Boots",
    price: 99.99,
    originalPrice: 159.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Shoes",
    rating: 4.6,
    isSale: true,
    colors: ["brown", "black"],
    sizes: ["40", "41", "42", "43", "44", "45"],
  },
  {
    id: "20",
    name: "Cashmere Blend Scarf",
    price: 49.99,
    originalPrice: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    rating: 4.8,
    isSale: true,
    colors: ["gray", "camel", "burgundy"],
    sizes: ["One Size"],
  },
  {
    id: "21",
    name: "Slim Fit Dress Shirt",
    price: 39.99,
    originalPrice: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "T-Shirts and Shirts",
    rating: 4.4,
    isSale: true,
    colors: ["white", "light blue", "pink"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "22",
    name: "Embroidered Silk Saree",
    price: 199.99,
    originalPrice: 299.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Ethnic",
    rating: 4.9,
    isSale: true,
    colors: ["red", "blue", "green", "gold"],
    sizes: ["One Size"],
  },
  {
    id: "23",
    name: "Block Heel Pumps",
    price: 59.99,
    originalPrice: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Heels",
    rating: 4.3,
    isSale: true,
    colors: ["black", "nude", "red"],
    sizes: ["36", "37", "38", "39", "40"],
  },
  {
    id: "24",
    name: "Wool Blend Coat",
    price: 149.99,
    originalPrice: 249.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Jackets",
    rating: 4.7,
    isSale: true,
    colors: ["camel", "black", "gray"],
    sizes: ["S", "M", "L", "XL"],
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero Slider */}
      <section>
        <HeroSlider slides={heroSlides} />
      </section>

      {/* Featured Categories */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">Shop By Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/shop/fashion" className="group relative overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Fashion"
                width={300}
                height={300}
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">Fashion</h3>
              </div>
            </Link>
            <Link href="/shop/ethnic" className="group relative overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Ethnic"
                width={300}
                height={300}
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">Ethnic</h3>
              </div>
            </Link>
            <Link href="/shop/western" className="group relative overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Western"
                width={300}
                height={300}
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">Western</h3>
              </div>
            </Link>
            <Link href="/shop/shoes" className="group relative overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=300&width=300"
                alt="Shoes"
                width={300}
                height={300}
                className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">Shoes</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Tabs */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">Our Products</h2>
          <ProductTabs newArrivals={newArrivals} topSelling={topSelling} onSale={onSale} />
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-12">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Women's Collection"
                width={600}
                height={400}
                className="w-full aspect-[3/2] object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-white text-2xl font-bold mb-2">Women's Collection</h3>
                <p className="text-white/90 mb-4">Discover the latest trends for women</p>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white/20 text-white hover:bg-white hover:text-foreground"
                >
                  <Link href="/shop/women">Shop Now</Link>
                </Button>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Men's Collection"
                width={600}
                height={400}
                className="w-full aspect-[3/2] object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-white text-2xl font-bold mb-2">Men's Collection</h3>
                <p className="text-white/90 mb-4">Elevate your style with our men's range</p>
                <Button
                  asChild
                  variant="outline"
                  className="bg-white/20 text-white hover:bg-white hover:text-foreground"
                >
                  <Link href="/shop/men">Shop Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary h-6 w-6"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On orders over $50</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary h-6 w-6"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">100% Secure Payment</h3>
              <p className="text-sm text-muted-foreground">Safe & secure checkout</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary h-6 w-6"
                >
                  <path d="m2 9 3-3 3 3"></path>
                  <path d="M13 18H7a2 2 0 0 1-2-2V6"></path>
                  <path d="m22 15-3 3-3-3"></path>
                  <path d="M11 6h6a2 2 0 0 1 2 2v10"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">30-day return policy</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary h-6 w-6"
                >
                  <path d="M12 12h7"></path>
                  <path d="M12 20h7"></path>
                  <path d="M12 4h7"></path>
                  <path d="M5 4v16"></path>
                </svg>
              </div>
              <h3 className="font-medium mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">Customer service support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
