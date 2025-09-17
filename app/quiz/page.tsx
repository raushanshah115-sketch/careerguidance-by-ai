"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Clock, Brain, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface QuizQuestion {
  id: number
  field: string
  category: string
  question_text: string
  type: string
  options: Array<{
    text: string
    score: number
    weightage: number
  }>
}

export default function QuizPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [fieldScores, setFieldScores] = useState<Record<string, number>>({
    engineering: 0,
    medical: 0,
    business: 0,
    creative: 0,
    science: 0,
    education: 0,
    legal: 0,
    agriculture: 0,
  })

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("[v0] Fetching quiz questions...")
        const response = await fetch("/api/quiz/questions")
        console.log("[v0] Quiz API response status:", response.status)

        if (!response.ok) {
          const errorText = await response.text()
          console.log("[v0] Quiz API error response:", errorText)

          if (response.status === 401) {
            setError("Please log in to access the quiz")
            return
          }

          throw new Error(`Failed to fetch questions: ${response.status} ${errorText}`)
        }

        const data = await response.json()
        console.log("[v0] Quiz questions received:", data.questions?.length || 0, "questions")

        if (!data.questions || data.questions.length === 0) {
          throw new Error("No quiz questions available")
        }

        setQuestions(data.questions)
        setError(null)
      } catch (error) {
        console.error("[v0] Error fetching questions:", error)
        setError(error instanceof Error ? error.message : "Failed to load quiz questions")
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  // Timer effect
  useEffect(() => {
    if (!loading && questions.length > 0) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [loading, questions.length])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (value: string) => {
    const prevAnswer = answers[currentQuestion]

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }))

    // Update field scores
    const question = questions[currentQuestion]
    const selectedOption = question.options.find((opt) => opt.text === value)
    const prevOption = prevAnswer ? question.options.find((opt) => opt.text === prevAnswer) : null

    if (selectedOption) {
      setFieldScores((prev) => ({
        ...prev,
        [question.field]:
          prev[question.field] +
          selectedOption.score * selectedOption.weightage -
          (prevOption ? prevOption.score * prevOption.weightage : 0),
      }))
    }
  }

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // Quiz completed - submit to API
      setSubmitting(true)
      try {
        const response = await fetch("/api/quiz/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answers,
            fieldScores,
            timeElapsed,
            totalQuestions: questions.length,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to submit quiz")
        }

        const result = await response.json()

        // Store results for the results page
        localStorage.setItem(
          "quizResults",
          JSON.stringify({
            ...result.result,
            answers,
          }),
        )

        router.push("/results")
      } catch (error) {
        console.error("Error submitting quiz:", error)
        // Fallback to local storage
        const results = {
          answers,
          fieldScores,
          timeElapsed,
          totalQuestions: questions.length,
        }
        localStorage.setItem("quizResults", JSON.stringify(results))
        router.push("/results")
      } finally {
        setSubmitting(false)
      }
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Loading your personalized quiz...</p>
        </div>
      </div>
    )
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle>Quiz Unavailable</CardTitle>
            <CardDescription>{error || "Unable to load quiz questions. Please try again later."}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            {error?.includes("log in") ? (
              <Link href="/auth/login">
                <Button className="w-full">Login to Continue</Button>
              </Link>
            ) : (
              <Button onClick={() => window.location.reload()} className="w-full">
                Try Again
              </Button>
            )}
            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                Return Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const question = questions[currentQuestion]
  const currentAnswer = answers[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">CareerAI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
            <Badge variant="outline">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Field Scores Preview */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {Object.entries(fieldScores).map(([field, score]) => (
              <Badge key={field} variant="secondary" className="text-xs">
                {field}: {score}
              </Badge>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className="mb-2 capitalize">
                {question.field} • {question.category}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {question.type.toUpperCase()}
              </Badge>
            </div>
            <CardTitle className="text-xl text-balance">{question.question_text}</CardTitle>
            <CardDescription>Select the option that best describes you or your preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={currentAnswer || ""} onValueChange={handleAnswerChange}>
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <RadioGroupItem value={option.text} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm leading-relaxed">
                      {option.text}
                    </Label>
                    <Badge variant="outline" className="text-xs">
                      {option.score}pts
                    </Badge>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <Button
            onClick={handleNext}
            disabled={!currentAnswer || submitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : currentQuestion === questions.length - 1 ? (
              "Complete Quiz"
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
