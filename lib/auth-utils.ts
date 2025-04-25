// Authentication utility functions

// Types
interface User {
  name: string
  email: string
  password: string
  image?: string
}

// Get all users from localStorage
export function getUsers(): User[] {
  if (typeof window === "undefined") return []

  const users = localStorage.getItem("users")
  return users ? JSON.parse(users) : []
}

// Save users to localStorage
function saveUsers(users: User[]): void {
  if (typeof window === "undefined") return

  localStorage.setItem("users", JSON.stringify(users))
}

// Register a new user
export function registerUser(name: string, email: string, password: string, image?: string): boolean {
  const users = getUsers()

  // Check if email already exists
  if (users.some((user) => user.email === email)) {
    return false
  }

  // Add new user
  users.push({ name, email, password, image })
  saveUsers(users)

  return true
}

// Login user
export function loginUser(email: string, password: string): boolean {
  const users = getUsers()

  // Find user with matching email and password
  const user = users.find((user) => user.email === email && user.password === password)

  if (user) {
    // Store current user in localStorage (without password)
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          name: user.name,
          email: user.email,
          image: user.image,
        }),
      )
    }
    return true
  }

  return false
}

// Get current logged in user
export function getCurrentUser(): { name: string; email: string; image?: string } | null {
  if (typeof window === "undefined") return null

  const currentUser = localStorage.getItem("currentUser")
  return currentUser ? JSON.parse(currentUser) : null
}

// Logout user
export function logoutUser(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem("currentUser")
}

// Update user
export function updateUser(name: string, email: string, password?: string, image?: string): boolean {
  const users = getUsers()
  const currentUser = getCurrentUser()

  if (!currentUser) return false

  const userIndex = users.findIndex((user) => user.email === email)
  if (userIndex === -1) return false

  // Update user data
  users[userIndex].name = name
  if (password) {
    users[userIndex].password = password
  }
  if (image !== undefined) {
    users[userIndex].image = image
  }

  saveUsers(users)

  // Update current user in localStorage
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      name,
      email,
      image: image !== undefined ? image : currentUser.image,
    }),
  )

  return true
}

// Delete user and all their blogs
export function deleteUser(): boolean {
  const currentUser = getCurrentUser()
  if (!currentUser) return false

  const users = getUsers()
  const userIndex = users.findIndex((user) => user.email === currentUser.email)
  if (userIndex === -1) return false

  // Remove user from users array
  users.splice(userIndex, 1)
  saveUsers(users)

  // Remove current user from localStorage
  localStorage.removeItem("currentUser")

  // Also delete all blogs, comments, and likes by this user
  if (typeof window !== "undefined") {
    // Delete blogs
    const blogs = JSON.parse(localStorage.getItem("blogs") || "[]")
    const updatedBlogs = blogs.filter((blog: any) => blog.authorEmail !== currentUser.email)
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs))

    // Delete comments
    const comments = JSON.parse(localStorage.getItem("comments") || "[]")
    const updatedComments = comments.filter((comment: any) => comment.authorEmail !== currentUser.email)
    localStorage.setItem("comments", JSON.stringify(updatedComments))

    // Delete likes
    const likes = JSON.parse(localStorage.getItem("likes") || "[]")
    const updatedLikes = likes.filter((like: any) => like.userEmail !== currentUser.email)
    localStorage.setItem("likes", JSON.stringify(updatedLikes))
  }

  return true
}
