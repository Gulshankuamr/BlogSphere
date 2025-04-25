"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getAllBlogs, getLikeCount, getCommentCount } from "@/lib/blog-utils"
import type { Blog } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { Heart, MessageSquare } from "lucide-react"

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const allBlogs = getAllBlogs()
    setBlogs(allBlogs)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p>Loading blogs...</p>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <Card className="text-center p-8 my-8">
        <CardContent className="pt-6">
          <p className="mb-4">No blogs have been published yet.</p>
          <Button asChild>
            <Link href="/create-blog">Create the First Blog</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-8">Latest Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

function BlogCard({ blog }: { blog: Blog }) {
  const likeCount = getLikeCount(blog.id)
  const commentCount = getCommentCount(blog.id)

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <Link href={`/blog/${blog.id}`} className="hover:underline">
            {blog.title}
          </Link>
        </CardTitle>
        <CardDescription>
          <div className="flex justify-between items-center">
            <span>By {blog.authorName}</span>
            <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-3 text-muted-foreground">{blog.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Heart className="mr-1 h-4 w-4" />
            <span>{likeCount}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="mr-1 h-4 w-4" />
            <span>{commentCount}</span>
          </div>
        </div>
        <Button asChild>
          <Link href={`/blog/${blog.id}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
