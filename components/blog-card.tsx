import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare } from "lucide-react"
import { formatDate, getInitials } from "@/lib/utils"
import { getLikeCount, getCommentCount } from "@/lib/blog-utils"
import type { Blog } from "@/lib/types"

interface BlogCardProps {
  blog: Blog
}

export default function BlogCard({ blog }: BlogCardProps) {
  const likeCount = getLikeCount(blog.id)
  const commentCount = getCommentCount(blog.id)

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
      {blog.image && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-6 w-6">
            {blog.authorImage ? (
              <AvatarImage src={blog.authorImage || "/placeholder.svg"} alt={blog.authorName} />
            ) : (
              <AvatarFallback>{getInitials(blog.authorName)}</AvatarFallback>
            )}
          </Avatar>
          <span className="text-sm text-muted-foreground">{blog.authorName}</span>
          <span className="text-sm text-muted-foreground">•</span>
          <time className="text-sm text-muted-foreground" dateTime={blog.createdAt}>
            {formatDate(blog.createdAt)}
          </time>
        </div>
        <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
          <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <p className="line-clamp-3 text-muted-foreground">{blog.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
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
        <Button asChild size="sm">
          <Link href={`/blog/${blog.id}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
