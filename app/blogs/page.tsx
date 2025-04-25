"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getAllBlogs } from "@/lib/blog-utils"
import BlogGrid from "@/components/blog-grid"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import type { Blog } from "@/lib/types"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = () => {
      const allBlogs = getAllBlogs()
      setBlogs(allBlogs)
      setFilteredBlogs(allBlogs)
      setLoading(false)
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    // Filter blogs based on search term
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.authorName.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Sort blogs
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      } else if (sortBy === "popular") {
        // Sort by like count (you would need to implement getLikeCount)
        const likesA = a.likeCount || 0
        const likesB = b.likeCount || 0
        return likesB - likesA
      }
      return 0
    })

    setFilteredBlogs(sorted)
  }, [blogs, searchTerm, sortBy])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The filtering is already handled in the useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Explore Blogs</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search blogs by title, description or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
          <div className="w-full md:w-48">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <p>Loading blogs...</p>
        </div>
      ) : filteredBlogs.length > 0 ? (
        <BlogGrid blogs={filteredBlogs} />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No blogs found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
