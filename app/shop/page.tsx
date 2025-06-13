"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard, type Product } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Sample product data - in a real app, this would come from an API
const allProducts: Product[] = [
  // New Arrivals
  {
    id: "1",
    name: "Slim Fit Cotton Shirt",
    price: 49.99,
    image: "/products/men_wear/puma_regular_tshirt.jpg",
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
    image: "/products/jackets/brown_jackets.jpg",
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
    image: "/products/women_wear/vero_moda_woment_tshirt.jpg",
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
    image: "/products/shoes/formal_brown_shoes_slip.jpeg",
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
    image: "/products/blazer/men_white_blazer.jpeg",
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
  // Top Selling
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
  // On Sale
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
]

const categories = [
  "All Categories",
  "Fashion",
  "Jackets",
  "Sweaters",
  "T-Shirts",
  "T-Shirts and Shirts",
  "Men's Suits and Blazers",
  "Women's Western Styles",
  "Western",
  "Ethnic",
  "Tops",
  "Women's Mini Dresses",
  "Tees",
  "Heels",
  "Flats",
  "Shoes",
]

const colors = [
  { name: "Black", value: "black" },
  { name: "White", value: "white" },
  { name: "Blue", value: "blue" },
  { name: "Red", value: "red" },
  { name: "Green", value: "green" },
  { name: "Gray", value: "gray" },
  { name: "Brown", value: "brown" },
  { name: "Navy", value: "navy" },
  { name: "Beige", value: "beige" },
  { name: "Pink", value: "pink" },
]

export default function ShopPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryParam ? [categoryParam] : [])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300])
  const [sortBy, setSortBy] = useState("featured")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(true)
  const [isColorOpen, setIsColorOpen] = useState(true)
  const [isPriceOpen, setIsPriceOpen] = useState(true)

  // Filter products based on selected filters
  const filteredProducts = allProducts.filter((product) => {
    // Filter by category
    if (selectedCategories.length > 0 && !selectedCategories.includes("All Categories")) {
      if (!selectedCategories.includes(product.category)) {
        return false
      }
    }

    // Filter by color
    if (selectedColors.length > 0) {
      if (!product.colors.some((color) => selectedColors.includes(color))) {
        return false
      }
    }

    // Filter by price
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const handleCategoryChange = (category: string) => {
    if (category === "All Categories") {
      setSelectedCategories(["All Categories"])
    } else {
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories.filter((c) => c !== "All Categories"), category]

      setSelectedCategories(newCategories.length === 0 ? ["All Categories"] : newCategories)
    }
  }

  const handleColorChange = (color: string) => {
    setSelectedColors(
      selectedColors.includes(color) ? selectedColors.filter((c) => c !== color) : [...selectedColors, color],
    )
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]])
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setPriceRange([0, 300])
  }

  // Initialize filters from URL params
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam])
    }
  }, [categoryParam])

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Categories */}
      <div className="border-b pb-4">
        <div
          className="flex items-center justify-between cursor-pointer mb-2"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <h3 className="font-medium">Categories</h3>
          {isCategoryOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {isCategoryOpen && (
          <div className="space-y-2 mt-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="border-b pb-4">
        <div
          className="flex items-center justify-between cursor-pointer mb-2"
          onClick={() => setIsColorOpen(!isColorOpen)}
        >
          <h3 className="font-medium">Colors</h3>
          {isColorOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {isColorOpen && (
          <div className="space-y-2 mt-2">
            {colors.map((color) => (
              <div key={color.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`color-${color.value}`}
                  checked={selectedColors.includes(color.value)}
                  onCheckedChange={() => handleColorChange(color.value)}
                />
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color.value }} />
                  <Label htmlFor={`color-${color.value}`} className="text-sm cursor-pointer">
                    {color.name}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <div
          className="flex items-center justify-between cursor-pointer mb-2"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
        >
          <h3 className="font-medium">Price Range</h3>
          {isPriceOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {isPriceOpen && (
          <div className="space-y-4 mt-4">
            <Slider
              defaultValue={[0, 300]}
              max={300}
              step={1}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex items-center justify-between">
              <div className="border rounded-md p-2 w-20">${priceRange[0]}</div>
              <div className="border rounded-md p-2 w-20 text-right">${priceRange[1]}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Shop</h1>

      {/* Mobile filter button */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter size={16} />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <FilterSidebar />
          </SheetContent>
        </Sheet>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar - desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <FilterSidebar />
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Sort - desktop */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">Showing {sortedProducts.length} products</p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active filters */}
          {(selectedCategories.length > 0 || selectedColors.length > 0 || priceRange[0] > 0 || priceRange[1] < 300) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedCategories.map((category) => (
                <div key={category} className="bg-muted text-sm rounded-full px-3 py-1 flex items-center gap-1">
                  {category}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0"
                    onClick={() => handleCategoryChange(category)}
                  >
                    <X size={12} />
                    <span className="sr-only">Remove {category} filter</span>
                  </Button>
                </div>
              ))}

              {selectedColors.map((color) => {
                const colorName = colors.find((c) => c.value === color)?.name || color
                return (
                  <div key={color} className="bg-muted text-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: color }} />
                    {colorName}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0"
                      onClick={() => handleColorChange(color)}
                    >
                      <X size={12} />
                      <span className="sr-only">Remove {colorName} filter</span>
                    </Button>
                  </div>
                )
              })}

              {(priceRange[0] > 0 || priceRange[1] < 300) && (
                <div className="bg-muted text-sm rounded-full px-3 py-1 flex items-center gap-1">
                  ${priceRange[0]} - ${priceRange[1]}
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0" onClick={() => setPriceRange([0, 300])}>
                    <X size={12} />
                    <span className="sr-only">Remove price filter</span>
                  </Button>
                </div>
              )}

              <Button variant="ghost" size="sm" className="text-sm h-6" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}

          {/* Products grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters to find what you're looking for.</p>
              <Button onClick={clearFilters}>Clear all filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
