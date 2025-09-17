"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/components/auth/auth-provider"
import { Star, MessageSquare, ThumbsUp } from "lucide-react"
import { useRouter } from "next/navigation"

interface FeedbackData {
  overall_rating: number
  quiz_rating?: number
  mentor_rating?: number
  verification_rating?: number
  ease_of_use: number
  recommendation_likelihood: number
  favorite_feature: string
  improvement_suggestions: string
  additional_comments: string
}

export default function FeedbackPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [existingFeedback, setExistingFeedback] = useState<any>(null)
  const [formData, setFormData] = useState<FeedbackData>({
    overall_rating: 0,
    quiz_rating: 0,
    mentor_rating: 0,
    verification_rating: 0,
    ease_of_use: 0,
    recommendation_likelihood: 0,
    favorite_feature: "",
    improvement_suggestions: "",
    additional_comments: "",
  })

  useEffect(() => {
    if (!user) {
      router.push("/auth/login")
      return
    }

    // Check if user has already submitted feedback
    checkExistingFeedback()
  }, [user])

  const checkExistingFeedback = async () => {
    if (!user) return

    const supabase = createClient()
    const { data, error } = await supabase.from("feedback").select("*").eq("user_id", user.id).single()

    if (data && !error) {
      setExistingFeedback(data)
      setFormData({
        overall_rating: data.overall_rating,
        quiz_rating: data.quiz_rating || 0,
        mentor_rating: data.mentor_rating || 0,
        verification_rating: data.verification_rating || 0,
        ease_of_use: data.ease_of_use,
        recommendation_likelihood: data.recommendation_likelihood,
        favorite_feature: data.favorite_feature || "",
        improvement_suggestions: data.improvement_suggestions || "",
        additional_comments: data.additional_comments || "",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    if (formData.overall_rating === 0 || formData.ease_of_use === 0 || formData.recommendation_likelihood === 0) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required rating fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    const supabase = createClient()

    try {
      console.log("[v0] Submitting feedback for user:", user.id)

      const feedbackPayload = {
        user_id: user.id,
        overall_rating: formData.overall_rating,
        quiz_rating: formData.quiz_rating || null,
        mentor_rating: formData.mentor_rating || null,
        verification_rating: formData.verification_rating || null,
        ease_of_use: formData.ease_of_use,
        recommendation_likelihood: formData.recommendation_likelihood,
        favorite_feature: formData.favorite_feature,
        improvement_suggestions: formData.improvement_suggestions,
        additional_comments: formData.additional_comments,
      }

      console.log("[v0] Feedback payload:", feedbackPayload)

      let result
      if (existingFeedback) {
        // Update existing feedback
        console.log("[v0] Updating existing feedback with ID:", existingFeedback.id)
        result = await supabase.from("feedback").update(feedbackPayload).eq("id", existingFeedback.id)
      } else {
        // Insert new feedback
        console.log("[v0] Inserting new feedback")
        result = await supabase.from("feedback").insert([feedbackPayload])
      }

      console.log("[v0] Feedback submission result:", result)

      if (result.error) {
        console.error("[v0] Feedback submission error:", result.error)
        throw result.error
      }

      toast({
        title: "Thank You!",
        description: existingFeedback
          ? "Your feedback has been updated successfully."
          : "Your feedback has been submitted successfully.",
      })

      if (!existingFeedback) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("[v0] Error submitting feedback:", error)
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const StarRating = ({
    value,
    onChange,
    label,
  }: { value: number; onChange: (value: number) => void; label: string }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className={`p-1 rounded transition-colors ${
              star <= value ? "text-yellow-400" : "text-gray-300 hover:text-yellow-200"
            }`}
          >
            <Star className="h-6 w-6 fill-current" />
          </button>
        ))}
      </div>
    </div>
  )

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {existingFeedback ? "Update Your Feedback" : "Share Your Feedback"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Help us improve CareerAI by sharing your experience with our platform.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Overall Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ThumbsUp className="h-5 w-5 text-blue-600" />
              Overall Experience
            </CardTitle>
            <CardDescription>How would you rate your overall experience with CareerAI?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <StarRating
              value={formData.overall_rating}
              onChange={(value) => setFormData((prev) => ({ ...prev, overall_rating: value }))}
              label="Overall Rating *"
            />

            <StarRating
              value={formData.ease_of_use}
              onChange={(value) => setFormData((prev) => ({ ...prev, ease_of_use: value }))}
              label="Ease of Use *"
            />

            <div className="space-y-2">
              <Label htmlFor="recommendation">How likely are you to recommend CareerAI to others? *</Label>
              <Select
                value={formData.recommendation_likelihood.toString()}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, recommendation_likelihood: Number.parseInt(value) }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a rating (1-10)" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} - {num <= 3 ? "Not likely" : num <= 6 ? "Neutral" : num <= 8 ? "Likely" : "Very likely"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Feature-Specific Ratings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-600" />
              Feature Ratings
            </CardTitle>
            <CardDescription>Rate the specific features you've used (optional)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <StarRating
              value={formData.quiz_rating || 0}
              onChange={(value) => setFormData((prev) => ({ ...prev, quiz_rating: value }))}
              label="Career Assessment Quiz"
            />

            <StarRating
              value={formData.mentor_rating || 0}
              onChange={(value) => setFormData((prev) => ({ ...prev, mentor_rating: value }))}
              label="AI Mentor"
            />

            <StarRating
              value={formData.verification_rating || 0}
              onChange={(value) => setFormData((prev) => ({ ...prev, verification_rating: value }))}
              label="Document Verification"
            />
          </CardContent>
        </Card>

        {/* Detailed Feedback */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              Detailed Feedback
            </CardTitle>
            <CardDescription>Share your thoughts and suggestions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="favorite">What's your favorite feature?</Label>
              <Select
                value={formData.favorite_feature}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, favorite_feature: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your favorite feature" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quiz">Career Assessment Quiz</SelectItem>
                  <SelectItem value="mentor">AI Mentor</SelectItem>
                  <SelectItem value="verification">Document Verification</SelectItem>
                  <SelectItem value="dashboard">Dashboard</SelectItem>
                  <SelectItem value="results">Results Analysis</SelectItem>
                  <SelectItem value="overall">Overall Experience</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="improvements">What could we improve?</Label>
              <Textarea
                id="improvements"
                placeholder="Share your suggestions for improvements..."
                value={formData.improvement_suggestions}
                onChange={(e) => setFormData((prev) => ({ ...prev, improvement_suggestions: e.target.value }))}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Additional Comments</Label>
              <Textarea
                id="comments"
                placeholder="Any other feedback you'd like to share..."
                value={formData.additional_comments}
                onChange={(e) => setFormData((prev) => ({ ...prev, additional_comments: e.target.value }))}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
            {isSubmitting
              ? existingFeedback
                ? "Updating..."
                : "Submitting..."
              : existingFeedback
                ? "Update Feedback"
                : "Submit Feedback"}
          </Button>
        </div>
      </form>
    </div>
  )
}
