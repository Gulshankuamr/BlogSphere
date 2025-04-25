"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  getBlogById,
  toggleLikeBlog,
  addComment,
  getComments,
  getLikeCount,
  hasUserLiked,
  deleteBlog,
} from "@/lib/blog-utils"
import { getCurrentUser } from "@/lib/auth-utils"
import { formatDate, getInitials } from "@/lib/utils"
import type { Blog, Comment } from "@/lib/types"
import { Heart, MessageSquare, Edit, Trash, ArrowLeft, Share2 } from "lucide-react"
import CommentList from "@/components/comment-list"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [likeCount, setLikeCount] = useState(0)
  const [userLiked, setUserLiked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; image?: string } | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { id } = params

  useEffect(() => {
    const user = getCurrentUser()
    setCurrentUser(user)

    const blogData = getBlogById(id)
    if (!blogData) {
      toast({
        title: "Blog not found",
        description: "The blog you're looking for doesn't exist",
        variant: "destructive",
      })
      router.push("/blogs")
      return
    }

    setBlog(blogData)
    setComments(getComments(id))
    setLikeCount(getLikeCount(id))

    if (user) {
      setUserLiked(hasUserLiked(id, user.email))
    }

    setLoading(false)
  }, [id, router, toast])

  const handleLike = () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to like this blog",
        variant: "destructive",
      })
      return
    }

    const newLikeStatus = toggleLikeBlog(id, currentUser.email)
    setUserLiked(newLikeStatus)
    setLikeCount(getLikeCount(id))

    toast({
      title: newLikeStatus ? "Blog liked" : "Blog unliked",
      description: newLikeStatus ? "You liked this blog" : "You unliked this blog",
    })
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to comment on this blog",
        variant: "destructive",
      })
      return
    }

    if (!newComment.trim()) {
      toast({
        title: "Empty comment",
        description: "Please write something before submitting",
        variant: "destructive",
      })
      return
    }

    const comment = addComment(id, newComment, currentUser.email, currentUser.name, currentUser.image)
    setComments([...comments, comment])
    setNewComment("")

    toast({
      title: "Comment added",
      description: "Your comment has been added successfully",
    })
  }

  const handleDelete = () => {
    deleteBlog(id)
    toast({
      title: "Blog deleted",
      description: "Your blog has been deleted successfully",
    })
    router.push("/dashboard")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: blog?.title,
          text: blog?.description,
          url: window.location.href,
        })
        .then(() => {
          toast({
            title: "Shared successfully",
            description: "The blog has been shared",
          })
        })
        .catch(() => {
          // Copy to clipboard as fallback
          copyToClipboard()
        })
    } else {
      // Copy to clipboard as fallback
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Blog link copied to clipboard",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[50vh]">
          <p>Loading blog...</p>
        </div>
      </div>
    )
  }

  if (!blog) return null

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-4 group" asChild>
        <Link href="/blogs">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to blogs
        </Link>
      </Button>

      <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {blog.image && (
          <div className="relative w-full h-[300px] md:h-[400px]">
            <Image
              src={blog.image || "/placeholder.svg"}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center justify-between text-muted-foreground mb-6">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  {blog.authorImage ? (
                    <AvatarImage src={blog.authorImage || "/placeholder.svg"} alt={blog.authorName} />
                  ) : (
                    <AvatarFallback>{getInitials(blog.authorName)}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{blog.authorName}</p>
                  <time dateTime={blog.createdAt} className="text-sm">
                    {formatDate(blog.createdAt)}
                  </time>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={handleShare} title="Share">
                  <Share2 className="h-4 w-4" />
                </Button>
                {currentUser && blog.authorEmail === currentUser.email && (
                  <>
                    <Button variant="outline" size="icon" asChild title="Edit">
                      <Link href={`/edit-blog/${blog.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon" title="Delete">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your blog and remove it from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </div>
            </div>
            <p className="text-xl text-muted-foreground">{blog.description}</p>
          </header>

          <div
            className="prose prose-lg max-w-none dark:prose-invert mb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="flex items-center space-x-4 mb-8 border-t border-b py-4">
            <Button
              variant={userLiked ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
              className="flex items-center gap-2 transition-all duration-300 ease-in-out"
            >
              <Heart className={`h-5 w-5 ${userLiked ? "fill-current animate-pulse" : ""}`} />
              {likeCount} {likeCount === 1 ? "Like" : "Likes"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => document.getElementById("comments-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              <MessageSquare className="h-5 w-5" />
              {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
            </Button>
          </div>

          <div id="comments-section" className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Comments</h2>

            {currentUser ? (
              <form onSubmit={handleComment} className="mb-8">
                <Textarea
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-4 min-h-[100px]"
                />
                <Button type="submit">Post Comment</Button>
              </form>
            ) : (
              <Card className="mb-8 p-4">
                <p className="text-center">
                  Please{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    login
                  </Link>{" "}
                  to comment on this blog.
                </p>
              </Card>
            )}

            <CommentList comments={comments} />
          </div>
        </div>
      </article>
    </div>
  )
}
