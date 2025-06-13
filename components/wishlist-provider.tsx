"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import toast from "react-hot-toast"

export type WishlistItem = {
  id: string
  name: string
  price: number
  image: string
  color: string
  size: string
}

type WishlistContextType = {
  wishlist: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  useEffect(() => {
    // Load wishlist from localStorage
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist data:", error)
        localStorage.removeItem("wishlist")
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prevWishlist) => {
      // Check if item already exists in wishlist
      const existingItem = prevWishlist.find((wishlistItem) => wishlistItem.id === item.id)

      if (existingItem) {
        // toast.error(`${item.name} is already in your wishlist`)
        return prevWishlist
      } else {
        // toast.success(`${item.name} has been added to your wishlist`)
        return [...prevWishlist, item]
      }
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlist((prevWishlist) => {
      const itemToRemove = prevWishlist.find((item) => item.id === id)

      if (itemToRemove) {
        // toast.success(`${itemToRemove.name} has been removed from your wishlist`)
      }

      return prevWishlist.filter((item) => item.id !== id)
    })
  }

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id)
  }

  const clearWishlist = () => {
    setWishlist([])
    toast.success("All items have been removed from your wishlist")
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
