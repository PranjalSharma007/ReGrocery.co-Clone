import { Header } from "@/components/header"
import { HeroCarousel } from "@/components/hero-carousel"
import { FeaturedProducts } from "@/components/featured-products"
import { Marquee } from "@/components/marquee"
import { InfoSection } from "@/components/info-section"
import { InstagramFeed } from "@/components/instagram-feed"
import { MissionSection } from "@/components/mission-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroCarousel />
      <FeaturedProducts />
      <Marquee />
      <InfoSection />
      <InstagramFeed />
      <MissionSection />
      <Footer />
    </main>
  )
}
