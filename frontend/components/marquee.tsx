export function Marquee() {
  const text = "rethink • reuse • refill"
  const repeatedText = Array(4).fill(text).join(" ")

  return (
    <section className="py-12 md:py-16 bg-primary text-primary-foreground overflow-hidden">
      <div className="relative flex items-center">
        <div className="animate-scroll-marquee whitespace-nowrap text-4xl md:text-6xl font-bold">{repeatedText}</div>
        <div className="animate-scroll-marquee whitespace-nowrap text-4xl md:text-6xl font-bold absolute left-full">
          {repeatedText}
        </div>
      </div>
    </section>
  )
}
