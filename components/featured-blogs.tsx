"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllBlogs, getLikeCount } from "@/lib/blog-utils"
import type { Blog } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export default function FeaturedBlogs() {
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = () => {
      const allBlogs = getAllBlogs()

      // Get blogs with images and sort by likes
      const blogsWithImages = allBlogs.filter((blog) => blog.image)

      // Add like count to each blog
      const blogsWithLikes = blogsWithImages.map((blog) => ({
        ...blog,
        likeCount: getLikeCount(blog.id),
      }))

      // Sort by like count
      const sorted = blogsWithLikes.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0))

      // Take top 3
      setFeaturedBlogs(sorted.slice(0, 3))
      setLoading(false)
    }

    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-3xl font-bold mb-8">Featured Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-[400px] animate-pulse">
              <div className="h-full bg-muted"></div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (featuredBlogs.length === 0) {
    return null
  }

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-8">Featured Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredBlogs.map((blog) => (
          <Card key={blog.id} className="overflow-hidden group h-[400px] relative">
            {blog.image && (
              <div className="relative w-full h-full">
                <Image
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <CardContent className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="mb-2 text-sm opacity-90">{formatDate(blog.createdAt)}</div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="mb-4 line-clamp-2 text-gray-200">{blog.description}</p>
                  <Button asChild variant="secondary" className="group/button">
                    <Link href={`/blog/${blog.id}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
