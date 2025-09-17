import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Get user to check if they're authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get feedback analytics (basic stats)
    const { data: feedbackData, error } = await supabase.from("feedback").select(`
        overall_rating,
        quiz_rating,
        mentor_rating,
        verification_rating,
        ease_of_use,
        recommendation_likelihood,
        favorite_feature,
        created_at
      `)

    if (error) {
      throw error
    }

    // Calculate basic analytics
    const totalFeedback = feedbackData.length
    const avgOverallRating = feedbackData.reduce((sum, item) => sum + item.overall_rating, 0) / totalFeedback
    const avgEaseOfUse = feedbackData.reduce((sum, item) => sum + item.ease_of_use, 0) / totalFeedback
    const avgRecommendation =
      feedbackData.reduce((sum, item) => sum + item.recommendation_likelihood, 0) / totalFeedback

    // Feature ratings averages (excluding null values)
    const quizRatings = feedbackData.filter((item) => item.quiz_rating).map((item) => item.quiz_rating)
    const mentorRatings = feedbackData.filter((item) => item.mentor_rating).map((item) => item.mentor_rating)
    const verificationRatings = feedbackData
      .filter((item) => item.verification_rating)
      .map((item) => item.verification_rating)

    const avgQuizRating =
      quizRatings.length > 0 ? quizRatings.reduce((sum, rating) => sum + rating, 0) / quizRatings.length : 0
    const avgMentorRating =
      mentorRatings.length > 0 ? mentorRatings.reduce((sum, rating) => sum + rating, 0) / mentorRatings.length : 0
    const avgVerificationRating =
      verificationRatings.length > 0
        ? verificationRatings.reduce((sum, rating) => sum + rating, 0) / verificationRatings.length
        : 0

    // Favorite features count
    const favoriteFeatures = feedbackData.reduce(
      (acc, item) => {
        if (item.favorite_feature) {
          acc[item.favorite_feature] = (acc[item.favorite_feature] || 0) + 1
        }
        return acc
      },
      {} as Record<string, number>,
    )

    const analytics = {
      totalFeedback,
      averageRatings: {
        overall: Math.round(avgOverallRating * 10) / 10,
        easeOfUse: Math.round(avgEaseOfUse * 10) / 10,
        recommendation: Math.round(avgRecommendation * 10) / 10,
        quiz: Math.round(avgQuizRating * 10) / 10,
        mentor: Math.round(avgMentorRating * 10) / 10,
        verification: Math.round(avgVerificationRating * 10) / 10,
      },
      favoriteFeatures,
      responseCount: {
        quiz: quizRatings.length,
        mentor: mentorRatings.length,
        verification: verificationRatings.length,
      },
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Error fetching feedback analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
