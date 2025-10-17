export function InfoSection() {
  const columns = [
    {
      title: "Stay in the Loop",
      description: "From sustainable lifestyle guides to zero-waste recipes, we're sharing it all on the blog.",
      link: "The Scoop",
      image: "/point-of-sale-at-re-grocery-store.jpg",
    },
    {
      title: "We Pop Up!",
      description:
        "Party at your place? Hosting an event? Book our popup shop to give your guests a sustainable experience.",
      link: "PopUp Shop",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Zero-Waste Breakroom",
      description: "Achieve your corporate sustainability goals by switching to package-free office snacks!",
      link: "Snack Rack",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((column, index) => (
            <div key={index} className="flex flex-col">
              <div className="relative overflow-hidden bg-secondary rounded mb-6 h-48">
                <img
                  src={column.image || "/placeholder.svg"}
                  alt={column.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-2xl font-bold mb-3">{column.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">{column.description}</p>
              <a href="#" className="text-primary font-semibold hover:underline transition-colors">
                {column.link} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
