"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = [
    "Snacks",
    "Bath & Body",
    "Household",
    "Reusables",
    "Oils, Vinegars & Honey",
    "Nuts & Seeds",
    "Coffee & Tea",
    "Superfoods",
    "More",
  ]

  return (
    <>
      <header className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold">
                <span className="text-primary">re_</span>
                <span className="text-foreground">grocery</span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-foreground hover:text-primary transition-colors"
              >
                Menu
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(true)} className="md:hidden p-2" aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </button>

            {/* Order Button */}
            <button className="hidden sm:inline-block bg-primary text-primary-foreground px-6 py-2 rounded hover:opacity-90 transition-opacity font-medium">
              Order
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 border-b border-border">
              <Link href="/" className="text-2xl font-bold">
                <span className="text-primary">re_</span>
                <span className="text-foreground">grocery</span>
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="p-2" aria-label="Close menu">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="py-8 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4">SHOP</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <Link key={category} href="#" className="block text-lg hover:text-primary transition-colors">
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <div className="space-y-3">
                  <Link href="#" className="block text-lg hover:text-primary transition-colors">
                    Order Pickup
                  </Link>
                  <Link href="#" className="block text-lg hover:text-primary transition-colors">
                    Order Delivery
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
