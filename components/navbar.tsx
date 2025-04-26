"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getCurrentUser, logoutUser } from "@/lib/auth-utils"
import { getInitials } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, User, LogOut, Settings, PenSquare } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string; image?: string } | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [pathname])

  const handleLogout = () => {
    logoutUser()
    setUser(null)
    router.push("/")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname?.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-bold flex items-center">
  {/* Replace this with your image logo */}
  <img 
    src="/G (1).png" 
    alt="Gulshan Kumar Logo"
    className="h-12 w-12 mr-2 rounded-full" // Adjust size as needed
  />
  <p>BlogSphere</p>
  {/* Remove these text elements
  <span className="bg-primary text-primary-foreground rounded-full px-2 py-2 mr-2">GK</span>
  <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
    GulshanX.Dev
  </span>
  */}
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm transition-colors hover:text-foreground/80 ${
                isActive("/") ? "font-medium text-foreground" : "text-foreground/60"
              }`}
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className={`text-sm transition-colors hover:text-foreground/80 ${
                isActive("/blogs") ? "font-medium text-foreground" : "text-foreground/60"
              }`}
            >
              Blogs
            </Link>
            <Link
              href="/portfolio"
              className={`text-sm transition-colors hover:text-foreground/80 ${
                isActive("/portfolio") ? "font-medium text-foreground" : "text-foreground/60"
              }`}
            >
              Portfolio
            </Link>
            {user && (
              <>
                <Link
                  href="/create-blog"
                  className={`text-sm transition-colors hover:text-foreground/80 ${
                    isActive("/create-blog") ? "font-medium text-foreground" : "text-foreground/60"
                  }`}
                >
                  Create Blog
                </Link>
                <Link
                  href="/dashboard"
                  className={`text-sm transition-colors hover:text-foreground/80 ${
                    isActive("/dashboard") ? "font-medium text-foreground" : "text-foreground/60"
                  }`}
                >
                  Dashboard
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 ml-2">
                    <Avatar className="h-8 w-8">
                      {user.image ? (
                        <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                      ) : (
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      )}
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer flex w-full items-center">
                      <User className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/create-blog" className="cursor-pointer flex w-full items-center">
                      <PenSquare className="mr-2 h-4 w-4" />
                      Create Blog
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer flex w-full items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className={`block ${isActive("/") ? "font-medium" : "text-muted-foreground"}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/blogs"
              className={`block ${isActive("/blogs") ? "font-medium" : "text-muted-foreground"}`}
              onClick={closeMenu}
            >
              Blogs
            </Link>
            <Link
              href="/portfolio"
              className={`block ${isActive("/portfolio") ? "font-medium" : "text-muted-foreground"}`}
              onClick={closeMenu}
            >
              Portfolio
            </Link>

            {user ? (
              <>
                <Link
                  href="/create-blog"
                  className={`block ${isActive("/create-blog") ? "font-medium" : "text-muted-foreground"}`}
                  onClick={closeMenu}
                >
                  Create Blog
                </Link>
                <Link
                  href="/dashboard"
                  className={`block ${isActive("/dashboard") ? "font-medium" : "text-muted-foreground"}`}
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className={`block ${isActive("/profile") ? "font-medium" : "text-muted-foreground"}`}
                  onClick={closeMenu}
                >
                  Profile Settings
                </Link>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    Signed in as <span className="font-medium">{user.name}</span>
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleLogout()
                      closeMenu()
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t">
                <Button variant="outline" asChild>
                  <Link href="/login" onClick={closeMenu}>
                    Login
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/signup" onClick={closeMenu}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
