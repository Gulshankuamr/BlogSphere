// Type definitions for the blog application

export interface Blog {
  id: string
  title: string
  description: string
  content: string
  image?: string
  authorEmail: string
  authorName: string
  authorImage?: string
  createdAt: string
  updatedAt: string
  likeCount?: number
  commentCount?: number
}

export interface Comment {
  id: string
  blogId: string
  content: string
  authorEmail: string
  authorName: string
  authorImage?: string
  createdAt: string
}
