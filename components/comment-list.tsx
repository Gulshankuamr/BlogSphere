import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate, getInitials } from "@/lib/utils"
import type { Comment } from "@/lib/types"

interface CommentListProps {
  comments: Comment[]
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return <p className="text-center text-muted-foreground">No comments yet. Be the first to comment!</p>
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="border rounded-lg p-4 bg-muted/30 hover:bg-muted/50 transition-colors">
          <div className="flex items-center mb-2">
            <Avatar className="h-8 w-8 mr-2">
              {comment.authorImage ? (
                <AvatarImage src={comment.authorImage || "/placeholder.svg"} alt={comment.authorName} />
              ) : (
                <AvatarFallback>{getInitials(comment.authorName)}</AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="font-medium">{comment.authorName}</p>
              <p className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</p>
            </div>
          </div>
          <p className="pl-10">{comment.content}</p>
        </div>
      ))}
    </div>
  )
}
