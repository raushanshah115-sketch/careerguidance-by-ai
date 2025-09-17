"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Clock, Brain, CheckCircle } from "lucide-react"
import { quizQuestions, calculateFieldScores, QUIZ_FIELDS } from "@/lib/quiz-data"
import { useRouter } from "next/navigation"

interface QuizEngineProps {
  onComplete?: (results: any) => void
}

export function QuizEngine({ onComplete }: QuizEngineProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      handleSubmitQuiz()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true)

    try {
      const fieldScores = calculateFieldScores(answers)
      const results = {
        answers,
        fieldScores,
        timeElapsed,
        totalQuestions: quizQuestions.length,
        completedAt: new Date().toISOString(),
      }

      // Store results locally
      localStorage.setItem("quizResults", JSON.stringify(results))

      // Call onComplete if provided
      if (onComplete) {
        onComplete(results)
      } else {
        // Default behavior - redirect to results
        router.push("/results")
      }
    } catch (error) {
      console.error("Failed to submit quiz:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const question = quizQuestions[currentQuestion]
  const currentAnswer = answers[currentQuestion]
  const answeredCount = Object.keys(answers).length

  if (!question) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Loading Quiz...</h3>
          <p className="text-gray-600">Preparing your career assessment</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {formatTime(timeElapsed)}
            </Badge>
            <Badge variant="outline">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              {answeredCount} Answered
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Card */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge className="capitalize">
              {QUIZ_FIELDS[question.field as keyof typeof QUIZ_FIELDS]} • {question.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {question.type.toUpperCase()}
            </Badge>
          </div>
          <CardTitle className="text-xl text-balance leading-relaxed">{question.question_text}</CardTitle>
          <CardDescription>Select the option that best describes you or your preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={currentAnswer || ""} onValueChange={handleAnswerChange}>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => handleAnswerChange(option.text)}
                >
                  <RadioGroupItem value={option.text} id={`option-${index}`} className="mt-0.5" />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm leading-relaxed">
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2 bg-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {quizQuestions.length - currentQuestion - 1} remaining
          </p>
        </div>

        <Button
          onClick={handleNext}
          disabled={!currentAnswer || isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : currentQuestion === quizQuestions.length - 1 ? (
            <>
              Complete Quiz
              <CheckCircle className="h-4 w-4" />
            </>
          ) : (
            <>
              Next
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* Field Score Preview (optional) */}
      {answeredCount > 10 && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              Current Field Strengths
            </CardTitle>
            <CardDescription>
              Based on your answers so far (this will be more accurate as you complete more questions)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(calculateFieldScores(answers))
                .sort(([, a], [, b]) => b - a)
                .slice(0, 4)
                .map(([field, score]) => (
                  <div key={field} className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-sm font-medium capitalize mb-1">
                      {QUIZ_FIELDS[field as keyof typeof QUIZ_FIELDS]}
                    </div>
                    <div className="text-lg font-bold text-blue-600">{score}</div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
