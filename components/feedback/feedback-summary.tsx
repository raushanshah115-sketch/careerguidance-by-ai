"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, TrendingUp, Heart } from "lucide-react"

interface FeedbackAnalytics {
  totalFeedback: number
  averageRatings: {
    overall: number
    easeOfUse: number
    recommendation: number
    quiz: number
    mentor: number
    verification: number
  }
  favoriteFeatures: Record<string, number>
  responseCount: {
    quiz: number
    mentor: number
    verification: number
  }
}

export function FeedbackSummary() {
  const [analytics, setAnalytics] = useState<FeedbackAnalytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/feedback/analytics")
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error("Error fetching analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!analytics) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">No feedback data available</p>
        </CardContent>
      </Card>
    )
  }

  const getFeatureName = (key: string) => {
    const names: Record<string, string> = {
      quiz: "Career Quiz",
      mentor: "AI Mentor",
      verification: "Document Verification",
      dashboard: "Dashboard",
      results: "Results Analysis",
      overall: "Overall Experience",
    }
    return names[key] || key
  }

  const topFeature = Object.entries(analytics.favoriteFeatures).sort(([, a], [, b]) => b - a)[0]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Feedback</p>
                <p className="text-2xl font-bold">{analytics.totalFeedback}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Rating</p>
                <div className="flex items-center space-x-1">
                  <p className="text-2xl font-bold">{analytics.averageRatings.overall}</p>
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recommendation</p>
                <p className="text-2xl font-bold">{analytics.averageRatings.recommendation}/10</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Feature</p>
                <p className="text-lg font-bold">{topFeature ? getFeatureName(topFeature[0]) : "N/A"}</p>
              </div>
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feature Ratings */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Ratings</CardTitle>
          <CardDescription>Average ratings for each feature</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                key: "quiz",
                name: "Career Assessment Quiz",
                rating: analytics.averageRatings.quiz,
                responses: analytics.responseCount.quiz,
              },
              {
                key: "mentor",
                name: "AI Mentor",
                rating: analytics.averageRatings.mentor,
                responses: analytics.responseCount.mentor,
              },
              {
                key: "verification",
                name: "Document Verification",
                rating: analytics.averageRatings.verification,
                responses: analytics.responseCount.verification,
              },
              {
                key: "ease",
                name: "Ease of Use",
                rating: analytics.averageRatings.easeOfUse,
                responses: analytics.totalFeedback,
              },
            ].map((feature) => (
              <div key={feature.key} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{feature.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">({feature.responses} responses)</span>
                      <Badge variant="secondary">{feature.rating}/5</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(feature.rating / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Favorite Features */}
      <Card>
        <CardHeader>
          <CardTitle>Favorite Features</CardTitle>
          <CardDescription>What users love most about CareerAI</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(analytics.favoriteFeatures)
              .sort(([, a], [, b]) => b - a)
              .map(([feature, count]) => (
                <Badge key={feature} variant="outline" className="text-sm">
                  {getFeatureName(feature)} ({count})
                </Badge>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
