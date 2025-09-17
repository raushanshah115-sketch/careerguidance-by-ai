"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Download, Share2, ArrowRight, Star, TrendingUp, BookOpen, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface QuizResults {
  id?: string
  answers: Record<number, string>
  fieldScores: Record<string, number>
  timeElapsed: number
  totalQuestions: number
  topField?: string
  matchPercentage?: number
}

interface AIAnalysis {
  personalityAnalysis: {
    strengths: string[]
    workStyle: string
    motivations: string[]
    challenges: string[]
  }
  careerRecommendations: Array<{
    title: string
    field: string
    compatibility: number
    description: string
    keySkills: string[]
    educationPath: string
    salaryRange: string
    jobGrowth: string
    workEnvironment: string
  }>
  skillDevelopment: {
    immediate: string[]
    shortTerm: string[]
    longTerm: string[]
  }
  careerRoadmap: {
    phase1: { title: string; goals: string[]; actions: string[] }
    phase2: { title: string; goals: string[]; actions: string[] }
    phase3: { title: string; goals: string[]; actions: string[] }
  }
  industryInsights: {
    trends: string[]
    opportunities: string[]
    challenges: string[]
  }
}

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<QuizResults | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [analyzingWithAI, setAnalyzingWithAI] = useState(false)

  useEffect(() => {
    const savedResults = localStorage.getItem("quizResults")
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults)
      setResults(parsedResults)

      // Trigger AI analysis if we have a quiz result ID
      if (parsedResults.id) {
        generateAIAnalysis(parsedResults)
      }
    } else {
      router.push("/quiz")
    }
    setLoading(false)
  }, [router])

  const generateAIAnalysis = async (quizResults: QuizResults) => {
    if (!quizResults.id) return

    setAnalyzingWithAI(true)
    try {
      const response = await fetch("/api/ai/analyze-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizResultId: quizResults.id,
          answers: quizResults.answers,
          fieldScores: quizResults.fieldScores,
          topField: quizResults.topField,
          matchPercentage: quizResults.matchPercentage,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setAiAnalysis(data.analysis)
      } else {
        console.error("Failed to generate AI analysis")
      }
    } catch (error) {
      console.error("Error generating AI analysis:", error)
    } finally {
      setAnalyzingWithAI(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-300">Loading your results...</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return null
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">CareerAI</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Results
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Results Header */}
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Assessment Complete
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Your Career Analysis Results</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Based on your {results.totalQuestions} responses completed in {formatTime(results.timeElapsed)}, here's your
            personalized career guidance powered by AI.
          </p>
        </div>

        {/* AI Analysis Loading */}
        {analyzingWithAI && (
          <Card className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-3">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100">Generating AI Analysis...</p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Our AI is analyzing your responses to provide personalized insights
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="careers">Top Careers</TabsTrigger>
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="ai-insights" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              AI Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Field Scores */}
            <Card>
              <CardHeader>
                <CardTitle>Field Compatibility Scores</CardTitle>
                <CardDescription>Your aptitude and interest levels across different career fields</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(results.fieldScores).map(([field, score]) => (
                    <div key={field} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="capitalize font-medium">{field}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {Math.round((score / (results.totalQuestions * 5)) * 100)}%
                        </span>
                      </div>
                      <Progress value={(score / (results.totalQuestions * 5)) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <CardTitle>Top Match</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 capitalize">
                    {results.topField || "Engineering"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {results.matchPercentage || 92}% compatibility
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <CardTitle>Assessment Score</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {Math.round(
                      (Object.values(results.fieldScores).reduce((a, b) => a + b, 0) / (results.totalQuestions * 5)) *
                        100,
                    )}
                    %
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Overall compatibility</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <BookOpen className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <CardTitle>Completion Time</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {formatTime(results.timeElapsed)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Assessment duration</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="careers" className="space-y-6">
            <div className="grid gap-6">
              {aiAnalysis?.careerRecommendations
                ? aiAnalysis.careerRecommendations.map((career, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {career.title}
                              <Badge variant="outline">{career.field}</Badge>
                            </CardTitle>
                            <CardDescription className="mt-2">{career.description}</CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {career.compatibility}%
                            </div>
                            <div className="text-sm text-gray-500">Match</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Key Skills</h4>
                            <div className="flex flex-wrap gap-1">
                              {career.keySkills.map((skill, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Job Growth</h4>
                            <p className="text-green-600 dark:text-green-400 font-medium">{career.jobGrowth}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Salary Range</h4>
                            <p className="font-medium">{career.salaryRange}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                : // Sample career data when AI analysis is not available
                  [
                    {
                      title: "Software Engineer",
                      field: "Technology",
                      compatibility: 92,
                      description:
                        "Design, develop, and maintain software applications and systems using various programming languages and frameworks.",
                      keySkills: ["Python", "JavaScript", "React", "Node.js", "SQL", "Git"],
                      jobGrowth: "22% (Much faster than average)",
                      salaryRange: "$70,000 - $150,000",
                      workEnvironment: "Office or Remote",
                    },
                    {
                      title: "Data Scientist",
                      field: "Technology",
                      compatibility: 88,
                      description:
                        "Analyze complex data to help organizations make informed business decisions using statistical methods and machine learning.",
                      keySkills: ["Python", "R", "Machine Learning", "Statistics", "SQL", "Tableau"],
                      jobGrowth: "35% (Much faster than average)",
                      salaryRange: "$80,000 - $160,000",
                      workEnvironment: "Office or Remote",
                    },
                    {
                      title: "UX/UI Designer",
                      field: "Creative",
                      compatibility: 85,
                      description:
                        "Create intuitive and visually appealing user interfaces and experiences for digital products and applications.",
                      keySkills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research", "HTML/CSS"],
                      jobGrowth: "13% (Faster than average)",
                      salaryRange: "$60,000 - $120,000",
                      workEnvironment: "Office or Remote",
                    },
                    {
                      title: "Digital Marketing Manager",
                      field: "Business",
                      compatibility: 82,
                      description:
                        "Develop and execute digital marketing strategies to promote products and services across various online channels.",
                      keySkills: [
                        "SEO",
                        "Google Analytics",
                        "Social Media",
                        "Content Marketing",
                        "PPC",
                        "Email Marketing",
                      ],
                      jobGrowth: "10% (Faster than average)",
                      salaryRange: "$55,000 - $110,000",
                      workEnvironment: "Office or Remote",
                    },
                    {
                      title: "Registered Nurse",
                      field: "Healthcare",
                      compatibility: 79,
                      description:
                        "Provide patient care, administer medications, and collaborate with healthcare teams to ensure optimal patient outcomes.",
                      keySkills: [
                        "Patient Care",
                        "Medical Knowledge",
                        "Communication",
                        "Critical Thinking",
                        "EMR Systems",
                      ],
                      jobGrowth: "7% (Faster than average)",
                      salaryRange: "$60,000 - $90,000",
                      workEnvironment: "Hospital/Clinic",
                    },
                  ].map((career, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {career.title}
                              <Badge variant="outline">{career.field}</Badge>
                            </CardTitle>
                            <CardDescription className="mt-2">{career.description}</CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {career.compatibility}%
                            </div>
                            <div className="text-sm text-gray-500">Match</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Key Skills</h4>
                            <div className="flex flex-wrap gap-1">
                              {career.keySkills.map((skill, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Job Growth</h4>
                            <p className="text-green-600 dark:text-green-400 font-medium">{career.jobGrowth}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Salary Range</h4>
                            <p className="font-medium">{career.salaryRange}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
            </div>
          </TabsContent>

          <TabsContent value="personality" className="space-y-6">
            {aiAnalysis?.personalityAnalysis ? (
              <Card>
                <CardHeader>
                  <CardTitle>Personality Analysis</CardTitle>
                  <CardDescription>
                    Your personality traits and work preferences based on your quiz responses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {aiAnalysis.personalityAnalysis.strengths.map((strength, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="capitalize font-medium">{strength}</span>
                          </div>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">Strength</span>
                        </div>
                      </div>
                    ))}
                    {aiAnalysis.personalityAnalysis.workStyle && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="capitalize font-medium">Work Style</span>
                          </div>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {aiAnalysis.personalityAnalysis.workStyle}
                          </span>
                        </div>
                      </div>
                    )}
                    {aiAnalysis.personalityAnalysis.motivations.map((motivation, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="capitalize font-medium">{motivation}</span>
                          </div>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">Motivation</span>
                        </div>
                      </div>
                    ))}
                    {aiAnalysis.personalityAnalysis.challenges.map((challenge, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="capitalize font-medium">{challenge}</span>
                          </div>
                          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">Challenge</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              // Sample personality data
              <Card>
                <CardHeader>
                  <CardTitle>Personality Analysis</CardTitle>
                  <CardDescription>
                    Your personality traits and work preferences based on your quiz responses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Your Strengths</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Analytical Thinking",
                          "Problem Solving",
                          "Team Collaboration",
                          "Adaptability",
                          "Communication",
                        ].map((strength, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Work Style</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        You prefer structured environments with clear goals and deadlines. You work well both
                        independently and in collaborative team settings.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Key Motivations</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                        <li>Making a meaningful impact through your work</li>
                        <li>Continuous learning and skill development</li>
                        <li>Work-life balance and flexibility</li>
                        <li>Recognition for achievements and contributions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Areas for Growth</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                        <li>Public speaking and presentation skills</li>
                        <li>Leadership and management capabilities</li>
                        <li>Networking and relationship building</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            {aiAnalysis?.careerRoadmap ? (
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Immediate Actions (Next 3 months)</CardTitle>
                    <CardDescription>Start your career journey with these essential steps</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {aiAnalysis.careerRoadmap.phase1.actions.map((action, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{index + 1}</span>
                          </div>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Short-term Goals (3-12 months)</CardTitle>
                    <CardDescription>Build your foundation and gain experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {aiAnalysis.careerRoadmap.phase2.actions.map((action, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-green-600 dark:text-green-400">{index + 1}</span>
                          </div>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Long-term Vision (1-3 years)</CardTitle>
                    <CardDescription>Advance your career and become an expert</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {aiAnalysis.careerRoadmap.phase3.actions.map((action, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{index + 1}</span>
                          </div>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ) : (
              // Sample roadmap data
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Immediate Actions (Next 3 months)</CardTitle>
                    <CardDescription>Start your career journey with these essential steps</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Update your resume with relevant skills and experiences",
                        "Create or optimize your LinkedIn profile",
                        "Research companies in your target field",
                        "Start building a portfolio of your work",
                        "Network with professionals in your industry",
                      ].map((action, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{index + 1}</span>
                          </div>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Short-term Goals (3-12 months)</CardTitle>
                    <CardDescription>Build your foundation and gain experience</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Complete relevant online courses or certifications",
                        "Apply for entry-level positions or internships",
                        "Attend industry conferences and networking events",
                        "Develop key technical and soft skills",
                        "Seek mentorship from experienced professionals",
                      ].map((action, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-green-600 dark:text-green-400">{index + 1}</span>
                          </div>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Long-term Vision (1-3 years)</CardTitle>
                    <CardDescription>Advance your career and become an expert</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {[
                        "Gain 2-3 years of professional experience",
                        "Take on leadership roles and responsibilities",
                        "Specialize in a particular area of expertise",
                        "Consider advanced education or professional certifications",
                        "Build a strong professional network and personal brand",
                      ].map((action, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{index + 1}</span>
                          </div>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6">
            {aiAnalysis ? (
              <div className="space-y-6">
                {/* AI Career Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                      AI-Powered Career Recommendations
                    </CardTitle>
                    <CardDescription>
                      Personalized career suggestions based on advanced AI analysis of your responses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {aiAnalysis.careerRecommendations.map((career, index) => (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-lg">{career.title}</CardTitle>
                                <Badge variant="outline" className="mt-1">
                                  {career.field}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">{career.compatibility}%</div>
                                <div className="text-sm text-gray-500">Match</div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">{career.description}</p>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <h4 className="font-semibold mb-2">Key Skills</h4>
                                <div className="flex flex-wrap gap-1">
                                  {career.keySkills.map((skill, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Career Details</h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                  <strong>Salary:</strong> {career.salaryRange}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                  <strong>Growth:</strong> {career.jobGrowth}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Personality Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-600" />
                      AI Personality Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Your Strengths</h4>
                      <div className="flex flex-wrap gap-2">
                        {aiAnalysis.personalityAnalysis.strengths.map((strength, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Work Style</h4>
                      <p className="text-gray-700 dark:text-gray-300">{aiAnalysis.personalityAnalysis.workStyle}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Key Motivations</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                        {aiAnalysis.personalityAnalysis.motivations.map((motivation, index) => (
                          <li key={index}>{motivation}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Sparkles className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">AI Analysis Coming Soon</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Complete the quiz to unlock personalized AI insights about your career path.
                  </p>
                  {!analyzingWithAI && (
                    <Button onClick={() => results.id && generateAIAnalysis(results)}>Generate AI Analysis</Button>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <h3 className="text-xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get personalized guidance from our AI mentor or connect with a professional counselor
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/mentor">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Chat with AI Mentor
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline">View Dashboard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
