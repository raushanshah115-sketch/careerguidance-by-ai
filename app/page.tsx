"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Brain, Users, Shield, Sparkles, BarChart3, MessageSquare, Map } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CareerAI</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/quiz"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Take Quiz
            </Link>
            <Link
              href="/mentor"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              AI Mentor
            </Link>
            <Link
              href="/verify"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              Verify Documents
            </Link>
            <Button>Get Started</Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          AI-Powered Career Guidance
        </Badge>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 text-balance">
          Discover Your Perfect
          <span className="text-blue-600 dark:text-blue-400"> Career Path</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto text-pretty">
          Take our comprehensive 100+ question assessment and get AI-powered insights, personalized career
          recommendations, and detailed roadmaps for your future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quiz">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Start Career Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/mentor">
            <Button size="lg" variant="outline">
              Chat with AI Mentor
            </Button>
          </Link>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Explore All Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-pretty">
            Discover your career potential with our comprehensive suite of AI-powered tools and features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Career Quiz */}
          <Link href="/quiz" className="group">
            <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-2 hover:border-blue-500">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-full w-fit">
                  <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600">Career Assessment Quiz</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4">
                  Take our comprehensive 100+ question assessment covering 8 major career fields with AI-powered
                  analysis
                </CardDescription>
                <Button className="w-full group-hover:bg-blue-600">
                  Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Dashboard */}
          <Link href="/dashboard" className="group">
            <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-2 hover:border-purple-500">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-purple-100 dark:bg-purple-900 rounded-full w-fit">
                  <BarChart3 className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-xl group-hover:text-purple-600">Personal Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4">
                  View your career progress, quiz results, recommendations, and track your professional development
                  journey
                </CardDescription>
                <Button className="w-full group-hover:bg-purple-600">
                  View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* AI Mentor */}
          <Link href="/mentor" className="group">
            <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-2 hover:border-green-500">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-green-100 dark:bg-green-900 rounded-full w-fit">
                  <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl group-hover:text-green-600">AI Career Mentor</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4">
                  Get 24/7 personalized career guidance, skill development advice, and industry insights from our AI
                  mentor
                </CardDescription>
                <Button className="w-full group-hover:bg-green-600">
                  Chat with Mentor <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Document Verification */}
          <Link href="/verify" className="group">
            <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-2 hover:border-orange-500">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-orange-100 dark:bg-orange-900 rounded-full w-fit">
                  <Shield className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-xl group-hover:text-orange-600">Document Verification</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4">
                  Secure blockchain-powered certificate verification system for authentic credential validation
                </CardDescription>
                <Button className="w-full group-hover:bg-orange-600">
                  Verify Documents <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Career Roadmap */}
          <Link href="/results" className="group">
            <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-2 hover:border-indigo-500">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full w-fit">
                  <Map className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-xl group-hover:text-indigo-600">Full Career Roadmap</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4">
                  Get detailed career paths, skill requirements, salary insights, and step-by-step progression plans
                </CardDescription>
                <Button className="w-full group-hover:bg-indigo-600">
                  View Roadmap <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Feedback System */}
          <Link href="/feedback" className="group">
            <Card className="h-full hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-2 hover:border-pink-500">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-pink-100 dark:bg-pink-900 rounded-full w-fit">
                  <MessageSquare className="h-8 w-8 text-pink-600 dark:text-pink-400" />
                </div>
                <CardTitle className="text-xl group-hover:text-pink-600">Feedback & Reviews</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base mb-4">
                  Share your experience, rate our features, and help us improve our AI-powered career guidance platform
                </CardDescription>
                <Button className="w-full group-hover:bg-pink-600">
                  Give Feedback <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* College Finder Section */}
      <section className="container mx-auto px-4 py-20 bg-gray-50 dark:bg-gray-800">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">College Finder</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-pretty">
            Discover top colleges and universities that align with your career goals and interests
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* MIT */}
          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MIT</span>
                </div>
                <div>
                  <CardTitle className="text-lg">Massachusetts Institute of Technology</CardTitle>
                  <p className="text-sm text-gray-600">Cambridge, MA</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Acceptance Rate:</span>
                  <span className="text-sm">7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Ranking:</span>
                  <span className="text-sm">#2 National Universities</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Popular Majors:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      Computer Science
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Engineering
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Mathematics
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  World-renowned for technology, engineering, and innovation. Home to cutting-edge research and
                  entrepreneurship.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stanford */}
          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-red-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">STAN</span>
                </div>
                <div>
                  <CardTitle className="text-lg">Stanford University</CardTitle>
                  <p className="text-sm text-gray-600">Stanford, CA</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Acceptance Rate:</span>
                  <span className="text-sm">4%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Ranking:</span>
                  <span className="text-sm">#3 National Universities</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Popular Majors:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      Computer Science
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Business
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Engineering
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Leading university in Silicon Valley, known for entrepreneurship, technology, and innovation.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Harvard */}
          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-red-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">HAR</span>
                </div>
                <div>
                  <CardTitle className="text-lg">Harvard University</CardTitle>
                  <p className="text-sm text-gray-600">Cambridge, MA</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Acceptance Rate:</span>
                  <span className="text-sm">5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Ranking:</span>
                  <span className="text-sm">#1 National Universities</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Popular Majors:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      Economics
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Government
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Psychology
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Prestigious Ivy League institution known for academic excellence across all disciplines.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* UC Berkeley */}
          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">UCB</span>
                </div>
                <div>
                  <CardTitle className="text-lg">UC Berkeley</CardTitle>
                  <p className="text-sm text-gray-600">Berkeley, CA</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Acceptance Rate:</span>
                  <span className="text-sm">17%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Ranking:</span>
                  <span className="text-sm">#20 National Universities</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Popular Majors:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      Engineering
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Business
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Biology
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Top public research university known for academic excellence and social activism.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Carnegie Mellon */}
          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CMU</span>
                </div>
                <div>
                  <CardTitle className="text-lg">Carnegie Mellon University</CardTitle>
                  <p className="text-sm text-gray-600">Pittsburgh, PA</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Acceptance Rate:</span>
                  <span className="text-sm">17%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Ranking:</span>
                  <span className="text-sm">#25 National Universities</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Popular Majors:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      Computer Science
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Engineering
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Business
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Leading institution in computer science, robotics, and artificial intelligence research.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* NYU */}
          <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">NYU</span>
                </div>
                <div>
                  <CardTitle className="text-lg">New York University</CardTitle>
                  <p className="text-sm text-gray-600">New York, NY</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Acceptance Rate:</span>
                  <span className="text-sm">21%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Ranking:</span>
                  <span className="text-sm">#30 National Universities</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Popular Majors:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      Business
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Liberal Arts
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Film
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Urban campus in Manhattan with strong programs in business, arts, and liberal studies.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            Explore More Colleges
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose CareerAI?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform provides everything you need to make informed career decisions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Smart Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                100+ questions covering 8 major fields with AI-powered personality analysis
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Get personalized career matches and detailed roadmaps powered by GPT-4</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>AI Mentorship</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>24/7 AI mentor chat for career guidance and skill development advice</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Document Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Blockchain-powered certificate verification for authentic credentials</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 dark:bg-blue-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have discovered their ideal career path with our AI-powered guidance
          </p>
          <Link href="/quiz">
            <Button size="lg" variant="secondary">
              Start Your Journey Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">CareerAI</span>
              </div>
              <p className="text-gray-400">AI-powered career guidance for the modern professional</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/quiz" className="hover:text-white">
                    Career Quiz
                  </Link>
                </li>
                <li>
                  <Link href="/mentor" className="hover:text-white">
                    AI Mentor
                  </Link>
                </li>
                <li>
                  <Link href="/verify" className="hover:text-white">
                    Verify Documents
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Personal Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/results" className="hover:text-white">
                    Full Career Roadmap
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="hover:text-white">
                    Feedback & Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/college-finder" className="hover:text-white">
                    College Finder
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CareerAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
