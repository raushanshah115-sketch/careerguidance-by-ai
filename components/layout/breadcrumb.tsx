"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"

const routeNames: Record<string, string> = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/profile": "Profile",
  "/quiz": "Career Quiz",
  "/results": "Results",
  "/mentor": "AI Mentor",
  "/verify": "Document Verification",
  "/settings": "Settings",
  "/help": "Help Center",
  "/about": "About Us",
  "/contact": "Contact",
  "/privacy": "Privacy Policy",
  "/auth/login": "Login",
  "/auth/signup": "Sign Up",
  "/auth/forgot-password": "Forgot Password",
}

export function Breadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  if (pathname === "/") return null

  const breadcrumbs = [{ name: "Home", href: "/", icon: Home }]

  let currentPath = ""
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`
    const name = routeNames[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1)
    breadcrumbs.push({ name, href: currentPath })
  })

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-gray-900 font-medium flex items-center gap-1">
              {index === 0 && crumb.icon && <crumb.icon className="h-4 w-4" />}
              {crumb.name}
            </span>
          ) : (
            <Link href={crumb.href} className="hover:text-blue-600 transition-colors flex items-center gap-1">
              {index === 0 && crumb.icon && <crumb.icon className="h-4 w-4" />}
              {crumb.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
