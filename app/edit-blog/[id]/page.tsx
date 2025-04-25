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
import { getBlogById, updateBlog } from "@/lib/blog-utils"
import ImageUpload from "@/components/image-upload"
import RichTextEditor from "@/components/rich-text-editor"
import type { Blog } from "@/lib/types"

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { id } = params

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to edit this blog",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    const blogData = getBlogById(id)
    if (!blogData) {
      toast({
        title: "Blog not found",
        description: "The blog you're trying to edit doesn't exist",
        variant: "destructive",
      })
      router.push("/dashboard")
      return
    }

    if (blogData.authorEmail !== user.email) {
      toast({
        title: "Unauthorized",
        description: "You don't have permission to edit this blog",
        variant: "destructive",
      })
      router.push("/dashboard")
      return
    }

    setBlog(blogData)
    setTitle(blogData.title)
    setDescription(blogData.description)
    setContent(blogData.content)
    setImage(blogData.image || null)
    setLoading(false)
  }, [id, router, toast])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (!blog) return

      if (!title.trim() || !description.trim() || !content.trim()) {
        toast({
          title: "Missing fields",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        setSaving(false)
        return
      }

      updateBlog(id, {
        ...blog,
        title,
        description,
        content,
        image: image || undefined,
        updatedAt: new Date().toISOString(),
      })

      toast({
        title: "Blog updated",
        description: "Your blog has been updated successfully",
      })

      router.push(`/blog/${id}`)
    } catch (error) {
      toast({
        title: "Failed to update blog",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Blog</CardTitle>
          <CardDescription>Update your blog post</CardDescription>
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
                className="h-[200px] border-dashed"
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
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
