import FeaturedBlogs from "@/components/featured-blogs"
import HeroSection from "@/components/hero-section"
import RecentBlogs from "@/components/recent-blogs"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <FeaturedBlogs />
      <RecentBlogs />
    </div>
  )
}
