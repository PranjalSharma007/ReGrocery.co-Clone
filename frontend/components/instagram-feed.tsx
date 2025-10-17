import { Instagram } from "lucide-react"

export function InstagramFeed() {
  const posts = Array(5)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      image: `/placeholder.svg?height=300&width=300&query=instagram post ${i + 1}`,
    }))

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Follow us on Instagram</h2>
          <p className="text-muted-foreground text-lg">@re_grocery</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {posts.map((post) => (
            <a key={post.id} href="#" className="relative overflow-hidden bg-secondary rounded aspect-square group">
              <img
                src={post.image || "/placeholder.svg"}
                alt="Instagram post"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
