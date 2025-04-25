import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background/50 py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and description */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold flex items-center">
              <span className="bg-primary text-primary-foreground rounded-md px-2 py-1 mr-2">GK</span>
              BlogSpace
            </Link>
            <p className="text-sm text-muted-foreground">
              A platform for sharing knowledge, ideas, and stories. Join our community of writers and readers.
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} GulshanX.Dev. All rights reserved.
            </p>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold mb-3">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link href="/create-blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Create Blog
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Account</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact for Freelance Development</h3>
            <p className="text-sm text-muted-foreground">
              Available for freelance web development projects. Let's build something amazing together!
            </p>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="text-muted-foreground"
              >
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58zM1.884.511a1.75 1.75 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
              </svg>
              <span className="text-sm text-muted-foreground">+91 739393XXXX</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="text-muted-foreground"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
              </svg>
              <span className="text-sm text-muted-foreground">gulshan73939314@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-12 pt-6 border-t border-muted flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href="https://linkedin.com/in/gulshan-kumar-61b446253"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6S0 4.88 0 3.5 1.12 1 2.49 1 4.98 2.12 4.98 3.5zM.01 24H5V7H.01v17zM7.5 7h4.7v2.5h.07C13.19 7.67 14.8 6 17.21 6 22.21 6 23.13 9.3 23.13 13.6V24H18V17.3c0-1.6-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.5V24H7.5V7z" />
              </svg>
            </a>

            <a
              href="https://github.com/Gulshankuamr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>

            <a
              href="mailto:gulshan73939314@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path d="M12 13.065L0 6V4l12 7.065L24 4v2l-12 7.065zM0 8v12h24V8l-12 7.065L0 8z" />
              </svg>
            </a>
          </div>

          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>Built with Next.js and Tailwind CSS</p>
            <p className="mt-1">Designed with by Gulshan Kumar</p>
          </div>
        </div>
      </div>
    </footer>
  )
}