import type { Blog, Comment } from "./types"

// Generate a unique ID
function generateId(): string {
  return Date.now().toString()
}

// Get all blogs from localStorage
export function getAllBlogs(): Blog[] {
  if (typeof window === "undefined") return []

  const blogs = localStorage.getItem("blogs")
  const parsedBlogs = blogs ? JSON.parse(blogs) : []

  // Sort blogs by creation date (newest first)
  return parsedBlogs.sort((a: Blog, b: Blog) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

// Save blogs to localStorage
function saveBlogs(blogs: Blog[]): void {
  if (typeof window === "undefined") return

  localStorage.setItem("blogs", JSON.stringify(blogs))
}

// Get a blog by ID
export function getBlogById(id: string): Blog | null {
  const blogs = getAllBlogs()
  const blog = blogs.find((blog) => blog.id === id) || null

  if (blog) {
    // Add like and comment counts
    return {
      ...blog,
      likeCount: getLikeCount(id),
      commentCount: getCommentCount(id),
    }
  }

  return null
}

// Get blogs by author email
export function getUserBlogs(email: string): Blog[] {
  const blogs = getAllBlogs()
  const userBlogs = blogs.filter((blog) => blog.authorEmail === email)

  // Add like and comment counts
  return userBlogs.map((blog) => ({
    ...blog,
    likeCount: getLikeCount(blog.id),
    commentCount: getCommentCount(blog.id),
  }))
}

// Create a new blog
export function createBlog(blogData: {
  title: string
  description: string
  content: string
  image?: string
  authorEmail: string
  authorName: string
  authorImage?: string
}): Blog {
  const blogs = getAllBlogs()

  const newBlog: Blog = {
    id: generateId(),
    title: blogData.title,
    description: blogData.description,
    content: blogData.content,
    image: blogData.image,
    authorEmail: blogData.authorEmail,
    authorName: blogData.authorName,
    authorImage: blogData.authorImage,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  blogs.push(newBlog)
  saveBlogs(blogs)

  return newBlog
}

// Update an existing blog
export function updateBlog(id: string, updatedBlog: Blog): boolean {
  const blogs = getAllBlogs()
  const index = blogs.findIndex((blog) => blog.id === id)

  if (index === -1) return false

  blogs[index] = updatedBlog
  saveBlogs(blogs)

  return true
}

// Delete a blog
export function deleteBlog(id: string): boolean {
  const blogs = getAllBlogs()
  const filteredBlogs = blogs.filter((blog) => blog.id !== id)

  if (filteredBlogs.length === blogs.length) return false

  saveBlogs(filteredBlogs)

  // Also delete related comments and likes
  deleteCommentsByBlogId(id)
  deleteLikesByBlogId(id)

  return true
}

// COMMENTS

// Get all comments from localStorage
export function getAllComments(): Comment[] {
  if (typeof window === "undefined") return []

  const comments = localStorage.getItem("comments")
  return comments ? JSON.parse(comments) : []
}

// Save comments to localStorage
function saveComments(comments: Comment[]): void {
  if (typeof window === "undefined") return

  localStorage.setItem("comments", JSON.stringify(comments))
}

// Get comments for a specific blog
export function getComments(blogId: string): Comment[] {
  const comments = getAllComments()
  return comments
    .filter((comment) => comment.blogId === blogId)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
}

// Get comment count for a blog
export function getCommentCount(blogId: string): number {
  return getComments(blogId).length
}

// Add a comment to a blog
export function addComment(
  blogId: string,
  content: string,
  authorEmail: string,
  authorName: string,
  authorImage?: string,
): Comment {
  const comments = getAllComments()

  const newComment: Comment = {
    id: generateId(),
    blogId,
    content,
    authorEmail,
    authorName,
    authorImage,
    createdAt: new Date().toISOString(),
  }

  comments.push(newComment)
  saveComments(comments)

  return newComment
}

// Delete comments for a blog
function deleteCommentsByBlogId(blogId: string): void {
  const comments = getAllComments()
  const filteredComments = comments.filter((comment) => comment.blogId !== blogId)
  saveComments(filteredComments)
}

// LIKES

// Get all likes from localStorage
function getAllLikes(): { blogId: string; userEmail: string }[] {
  if (typeof window === "undefined") return []

  const likes = localStorage.getItem("likes")
  return likes ? JSON.parse(likes) : []
}

// Save likes to localStorage
function saveLikes(likes: { blogId: string; userEmail: string }[]): void {
  if (typeof window === "undefined") return

  localStorage.setItem("likes", JSON.stringify(likes))
}

// Get like count for a blog
export function getLikeCount(blogId: string): number {
  const likes = getAllLikes()
  return likes.filter((like) => like.blogId === blogId).length
}

// Check if a user has liked a blog
export function hasUserLiked(blogId: string, userEmail: string): boolean {
  const likes = getAllLikes()
  return likes.some((like) => like.blogId === blogId && like.userEmail === userEmail)
}

// Toggle like/unlike for a blog
export function toggleLikeBlog(blogId: string, userEmail: string): boolean {
  const likes = getAllLikes()
  const existingLike = likes.findIndex((like) => like.blogId === blogId && like.userEmail === userEmail)

  if (existingLike !== -1) {
    // Unlike
    likes.splice(existingLike, 1)
    saveLikes(likes)
    return false
  } else {
    // Like
    likes.push({ blogId, userEmail })
    saveLikes(likes)
    return true
  }
}

// Delete likes for a blog
function deleteLikesByBlogId(blogId: string): void {
  const likes = getAllLikes()
  const filteredLikes = likes.filter((like) => like.blogId !== blogId)
  saveLikes(filteredLikes)
}
