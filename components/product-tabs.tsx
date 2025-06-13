"use client"

import { useState } from "react"
import { ProductCard, type Product } from "@/components/product-card"
import { cn } from "@/lib/utils"

interface ProductTabsProps {
  newArrivals: Product[]
  topSelling: Product[]
  onSale: Product[]
}

export function ProductTabs({ newArrivals, topSelling, onSale }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("new-arrivals")

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex justify-center border-b">
        <button
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors relative",
            activeTab === "new-arrivals"
              ? "text-primary border-b-2 border-primary -mb-px"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setActiveTab("new-arrivals")}
        >
          New Arrivals
        </button>
        <button
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors relative",
            activeTab === "top-selling"
              ? "text-primary border-b-2 border-primary -mb-px"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setActiveTab("top-selling")}
        >
          Top Selling
        </button>
        <button
          className={cn(
            "px-4 py-2 text-sm font-medium transition-colors relative",
            activeTab === "on-sale"
              ? "text-primary border-b-2 border-primary -mb-px"
              : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => setActiveTab("on-sale")}
        >
          On Sale
        </button>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {activeTab === "new-arrivals" &&
          newArrivals.map((product) => <ProductCard key={product.id} product={product} />)}
        {activeTab === "top-selling" && topSelling.map((product) => <ProductCard key={product.id} product={product} />)}
        {activeTab === "on-sale" && onSale.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  )
}
