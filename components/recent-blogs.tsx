"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getAllBlogs } from "@/lib/blog-utils"
import type { Blog } from "@/lib/types"
import { ArrowRight } from "lucide-react"
import BlogGrid from "@/components/blog-grid"

export default function RecentBlogs() {
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = () => {
      const allBlogs = getAllBlogs()
      setRecentBlogs(allBlogs.slice(0, 6))
      setLoading(false)
    }

    fetchBlogs()
  }, [])

  if (loading) {
    return (
      <div className="py-8">
        <div className="flex justify-center items-center h-[200px]">
          <p>Loading blogs...</p>
        </div>
      </div>
    )
  }

  if (recentBlogs.length === 0) {
    return (
      <div className="py-8">
        <h2 className="text-3xl font-bold mb-8">Recent Blogs</h2>
        <div className="text-center py-12 bg-muted rounded-lg">
          <h3 className="text-xl font-medium mb-2">No blogs yet</h3>
          <p className="text-muted-foreground mb-4">Be the first to create a blog!</p>
          <Button asChild>
            <Link href="/create-blog">Create Blog</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Recent Blogs</h2>
        <Button variant="outline" asChild>
          <Link href="/blogs" className="group">
            View All
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
      <BlogGrid blogs={recentBlogs} />
    </div>
  )
}
