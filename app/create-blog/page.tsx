"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { getCurrentUser } from "@/lib/auth-utils"
import { createBlog } from "@/lib/blog-utils"
import ImageUpload from "@/components/image-upload"
import RichTextEditor from "@/components/rich-text-editor"

export default function CreateBlogPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to create a blog",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [router, toast])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const user = getCurrentUser()
      if (!user) {
        router.push("/login")
        return
      }

      if (!title.trim() || !description.trim() || !content.trim()) {
        toast({
          title: "Missing fields",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      createBlog({
        title,
        description,
        content,
        image: image || undefined,
        authorEmail: user.email,
        authorName: user.name,
        authorImage: user.image,
      })

      toast({
        title: "Blog created",
        description: "Your blog has been created successfully",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Failed to create blog",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Blog</CardTitle>
          <CardDescription>Share your thoughts with the world</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Brief description of your blog"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Blog Image</Label>
              <ImageUpload
                value={image}
                onChange={setImage}
                label="Upload blog image"
                className="h-[400px] border-dashed"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your blog content here..."
                className="min-h-[300px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Blog"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
