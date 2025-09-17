"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  BookOpen,
  MessageCircle,
  FileCheck,
  TrendingUp,
  Calendar,
  Award,
  Target,
  Clock,
  LogOut,
} from "lucide-react"

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  avatar?: string
  quizResults: Array<{
    id: string
    completedAt: string
    topCareer: string
    matchScore: number
  }>
  documents: Array<{
    id: string
    name: string
    type: string
    status: string
  }>
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // TODO: Replace with actual API call
        console.log("[v0] Fetching user profile")

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const mockProfile: UserProfile = {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          quizResults: [
            {
              id: "quiz_1",
              completedAt: "2024-01-15T10:30:00Z",
              topCareer: "Software Engineer",
              matchScore: 92,
            },
          ],
          documents: [
            {
              id: "doc_1",
              name: "Computer Science Degree",
              type: "degree",
              status: "verified",
            },
          ],
        }

        setProfile(mockProfile)
      } catch (error) {
        console.error("[v0] Failed to fetch profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleLogout = () => {
    // TODO: Implement actual logout
    console.log("[v0] Logout clicked")
    window.location.href = "/"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Failed to load dashboard</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                AI Career Guidance
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/profile">
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {profile.firstName}!</h1>
          <p className="text-gray-600">Continue your career journey with personalized insights and guidance.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/quiz">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Take Quiz</h3>
                <p className="text-sm text-gray-600">Discover your career path</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/mentor">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">AI Mentor</h3>
                <p className="text-sm text-gray-600">Get career advice</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/verify">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <FileCheck className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Verify Docs</h3>
                <p className="text-sm text-gray-600">Blockchain verification</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/profile">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <User className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Profile</h3>
                <p className="text-sm text-gray-600">Manage your account</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Career Progress */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Career Progress
                </CardTitle>
                <CardDescription>Your journey towards your ideal career</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.quizResults.length > 0 ? (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {profile.quizResults[0].topCareer} Match
                      </span>
                      <span className="text-sm text-gray-600">{profile.quizResults[0].matchScore}%</span>
                    </div>
                    <Progress value={profile.quizResults[0].matchScore} className="h-2" />
                    <p className="text-xs text-gray-500 mt-1">
                      Completed on {new Date(profile.quizResults[0].completedAt).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Career Assessment</h3>
                    <p className="text-gray-600 mb-4">Take our comprehensive quiz to discover your ideal career path</p>
                    <Link href="/quiz">
                      <Button>Take Quiz Now</Button>
                    </Link>
                  </div>
                )}

                {/* Recent Activity */}
                <div className="border-t pt-6">
                  <h4 className="font-medium text-gray-900 mb-4">Recent Activity</h4>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-gray-600">Completed career assessment - 5 days ago</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MessageCircle className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-gray-600">Chatted with AI mentor - 1 week ago</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FileCheck className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-gray-600">Verified degree certificate - 2 weeks ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-600" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Badge variant="secondary" className="mr-2">
                      Quiz Master
                    </Badge>
                    <span className="text-sm text-gray-600">Completed assessment</span>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="secondary" className="mr-2">
                      Verified
                    </Badge>
                    <span className="text-sm text-gray-600">Document verified</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Verified Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCheck className="w-5 h-5 mr-2 text-green-600" />
                  Verified Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                {profile.documents.length > 0 ? (
                  <div className="space-y-3">
                    {profile.documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{doc.name}</span>
                        <Badge variant={doc.status === "verified" ? "default" : "secondary"} className="text-xs">
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-600 mb-3">No documents verified yet</p>
                    <Link href="/verify">
                      <Button size="sm" variant="outline">
                        Verify Documents
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Quizzes Taken</span>
                    <span className="text-sm font-medium">{profile.quizResults.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Documents Verified</span>
                    <span className="text-sm font-medium">{profile.documents.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="text-sm font-medium">Jan 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
