"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setEmail("")
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-2">Let's Keep in Touch</h3>
            <p className="text-primary-foreground/80 mb-6">Sign-up for 10% off your first online order</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded bg-primary-foreground text-primary placeholder-primary/50 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-primary-foreground text-primary rounded font-medium hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Column 1 */}
          <div>
            <h4 className="font-semibold mb-4">Our Ethos</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link href="#" className="hover:text-primary-foreground transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition-colors">
                  Glossary
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition-colors">
                  E-Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link href="#" className="hover:text-primary-foreground transition-colors">
                  Blog: The Scoop
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition-colors">
                  PopUp Shop
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition-colors">
                  Snack Rack
                </Link>
              </li>
              <li className="pt-2">
                <div className="flex gap-4">
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="hover:text-primary-foreground transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>
                <Link href="#" className="hover:text-primary-foreground transition-colors">
                  club / re_
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition-colors">
                  Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60 text-sm">
          <p>© 2025 re grocery inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
