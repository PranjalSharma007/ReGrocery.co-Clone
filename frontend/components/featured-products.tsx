"use client"

import { useState } from "react"

const products = {
  "New Arrivals": [
    {
      id: 1,
      name: "Organic Quinoa",
      price: "$4.99–$12.99",
      tags: ["Organic", "Vegan"],
      image: "/organic-quinoa-in-bowl.jpg",
    },
    {
      id: 2,
      name: "Raw Almonds",
      price: "$6.99–$14.99",
      tags: ["Non-GMO", "Vegan"],
      image: "/raw-almonds-in-bowl.jpg",
    },
    {
      id: 3,
      name: "Coconut Oil",
      price: "$8.99–$16.99",
      tags: ["Organic", "Vegan"],
      image: "/coconut-oil-in-glass-jar.jpg",
    },
    {
      id: 4,
      name: "Chia Seeds",
      price: "$5.99–$13.99",
      tags: ["Organic", "Vegan"],
      image: "/chia-seeds-in-bowl.jpg",
    },
  ],
  Staples: [
    {
      id: 5,
      name: "Brown Rice",
      price: "$2.99–$8.99",
      tags: ["Organic"],
      image: "/brown-rice-in-bowl.jpg",
    },
    {
      id: 6,
      name: "Pasta",
      price: "$1.99–$5.99",
      tags: ["Vegan"],
      image: "/pasta-in-bowl.jpg",
    },
    {
      id: 7,
      name: "Olive Oil",
      price: "$9.99–$18.99",
      tags: ["Organic", "Vegan"],
      image: "/olive-oil-in-glass-bottle.jpg",
    },
    {
      id: 8,
      name: "Honey",
      price: "$7.99–$15.99",
      tags: ["Organic"],
      image: "/honey-in-glass-jar.jpg",
    },
  ],
  Bestsellers: [
    {
      id: 9,
      name: "Pretzel Nuggets",
      price: "$1.99–$9.77",
      tags: ["Non-GMO", "Vegan"],
      image: "/pretzel-nuggets-in-bowl.jpg",
    },
    {
      id: 10,
      name: "Dark Chocolate",
      price: "$3.99–$11.99",
      tags: ["Organic", "Vegan"],
      image: "/dark-chocolate-pieces.jpg",
    },
    {
      id: 11,
      name: "Peanut Butter",
      price: "$4.99–$12.99",
      tags: ["Organic", "Vegan"],
      image: "/peanut-butter-in-glass-jar.jpg",
    },
    {
      id: 12,
      name: "Granola",
      price: "$5.99–$13.99",
      tags: ["Organic", "Vegan"],
      image: "/granola-in-bowl.jpg",
    },
  ],
}

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("New Arrivals")

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex gap-8 mb-12 border-b border-border">
          {Object.keys(products).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 font-medium transition-colors ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products[activeTab as keyof typeof products].map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden bg-secondary rounded mb-4 h-64">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{product.name}</h3>
              <p className="text-muted-foreground mb-3">{product.price}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-secondary text-foreground px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <button className="w-full bg-primary text-primary-foreground py-2 rounded hover:opacity-90 transition-opacity font-medium">
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Shop All Button */}
        <div className="flex justify-center">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded hover:opacity-90 transition-opacity font-medium">
            Shop All
          </button>
        </div>
      </div>
    </section>
  )
}
