"use client"

import Link from "next/link"
import { ArrowLeft, Brain } from "lucide-react"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <Brain className="h-6 w-6 mr-2" />
            <span className="font-semibold">Back to CareerAI</span>
          </Link>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
