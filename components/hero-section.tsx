import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="py-12 md:py-24 px-4 md:px-12 bg-gradient-to-r from-dark-400 via-blue-900 to-red-400 p-6 text-white rounded-xl">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-white-600">
            Welcome to BlogSphere
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl ">
            Share your thoughts, stories, and ideas with the world. Create and publish your own blogs in minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Button size="lg" className="rounded-full px-8 py-6 text-lg shadow-lg hover:scale-105 transition-transform" asChild>
              <Link href="/create-blog">Start Writing</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg hover:bg-white/20" asChild>
              <Link href="/blogs">Explore Blogs</Link>
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center">
  <video
    src="/White Clean Story Desktop Wallpaper (1).mp4" // Replace with your actual video file name placed inside the public folder
    width={500}
    height={500}
    autoPlay
    loop
    muted
    playsInline
    className="rounded-2xl shadow-lg object-contain"
  />
</div>

      </div>
    </section>
  )
}
