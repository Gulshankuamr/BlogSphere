import BlogCard from "@/components/blog-card"
import type { Blog } from "@/lib/types"

interface BlogGridProps {
  blogs: Blog[]
}

export default function BlogGrid({ blogs }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  )
}
