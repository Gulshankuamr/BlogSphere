"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCurrentUser } from "@/lib/auth-utils"
import { getUserBlogs, deleteBlog } from "@/lib/blog-utils"
import type { Blog } from "@/lib/types"
import { PlusCircle, Edit, Trash, BarChart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { formatDate } from "@/lib/utils"
import Image from "next/image"
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

export default function DashboardPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("blogs")
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to access your dashboard",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    const userBlogs = getUserBlogs(user.email)
    setBlogs(userBlogs)
    setLoading(false)
  }, [router, toast])

  const handleDelete = (id: string) => {
    deleteBlog(id)
    setBlogs(blogs.filter((blog) => blog.id !== id))
    toast({
      title: "Blog deleted",
      description: "Your blog has been deleted successfully",
    })
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-muted-foreground">Manage your blogs and account</p>
        </div>
        <Button asChild>
          <Link href="/create-blog">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Blog
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="blogs" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="blogs">My Blogs</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="blogs" className="mt-6">
          {blogs.length === 0 ? (
            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <p className="mb-4">You haven&apos;t created any blogs yet.</p>
                <Button asChild>
                  <Link href="/create-blog">Create Your First Blog</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Card key={blog.id} className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
                  {blog.image && (
                    <div className="relative w-full h-48">
                      <Image
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                    <CardDescription>{formatDate(blog.createdAt)}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="line-clamp-3 text-muted-foreground">{blog.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" asChild>
                      <Link href={`/blog/${blog.id}`}>View</Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/edit-blog/${blog.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your blog and remove it from
                              our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(blog.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="stats" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="mr-2 h-5 w-5" />
                Blog Statistics
              </CardTitle>
              <CardDescription>Overview of your blog performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <h3 className="text-lg font-medium mb-1">Total Blogs</h3>
                    <p className="text-3xl font-bold">{blogs.length}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <h3 className="text-lg font-medium mb-1">Total Likes</h3>
                    <p className="text-3xl font-bold">
                      {blogs.reduce((total, blog) => total + (blog.likeCount || 0), 0)}
                    </p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <h3 className="text-lg font-medium mb-1">Total Comments</h3>
                    <p className="text-3xl font-bold">
                      {blogs.reduce((total, blog) => total + (blog.commentCount || 0), 0)}
                    </p>
                  </div>
                </div>
                {blogs.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Most Popular Blogs</h3>
                    <div className="space-y-3">
                      {[...blogs]
                        .sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0))
                        .slice(0, 3)
                        .map((blog) => (
                          <div key={blog.id} className="flex justify-between items-center p-3 bg-background rounded-lg">
                            <div className="truncate mr-4">
                              <Link href={`/blog/${blog.id}`} className="font-medium hover:underline">
                                {blog.title}
                              </Link>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{blog.likeCount || 0} likes</span>
                              <span>{blog.commentCount || 0} comments</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
