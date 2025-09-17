import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Target, Brain, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function QuizIntro() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Career Assessment Quiz</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover your ideal career path with our comprehensive AI-powered assessment covering 8 major career fields.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                What You'll Discover
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Your top 3 career matches</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Personality analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Personalized career roadmap</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Skills development plan</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Assessment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Questions:</span>
                <span className="text-sm font-medium">100+ comprehensive</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Time:</span>
                <span className="text-sm font-medium">15-20 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Fields Covered:</span>
                <span className="text-sm font-medium">8 major careers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Analysis:</span>
                <span className="text-sm font-medium">AI-powered insights</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Career Fields Assessed
            </CardTitle>
            <CardDescription>
              Our comprehensive assessment evaluates your compatibility across these major career areas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Engineering", color: "bg-blue-100 text-blue-800" },
                { name: "Medical", color: "bg-red-100 text-red-800" },
                { name: "Business", color: "bg-green-100 text-green-800" },
                { name: "Creative", color: "bg-purple-100 text-purple-800" },
                { name: "Science", color: "bg-cyan-100 text-cyan-800" },
                { name: "Education", color: "bg-orange-100 text-orange-800" },
                { name: "Legal", color: "bg-gray-100 text-gray-800" },
                { name: "Agriculture", color: "bg-emerald-100 text-emerald-800" },
              ].map((field) => (
                <Badge key={field.name} className={`${field.color} justify-center py-2`}>
                  {field.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/quiz">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg">
              Start Assessment
              <Brain className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Your responses are private and secure. Results are saved to your account.
          </p>
        </div>
      </div>
    </div>
  )
}
