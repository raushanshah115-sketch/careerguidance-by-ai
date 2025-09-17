import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Users, Target, Award, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About AI Career Guidance</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize career guidance through AI-powered insights, helping millions discover
            their perfect career path and achieve professional fulfillment.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide personalized, AI-driven career guidance that empowers individuals to make informed decisions
                about their professional future, regardless of their background or circumstances.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8 text-center">
              <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A world where everyone has access to intelligent career guidance, enabling them to pursue fulfilling
                careers that align with their skills, interests, and values.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              Founded in 2024, AI Career Guidance emerged from a simple observation: traditional career counseling
              wasn't accessible to everyone who needed it. Many talented individuals lacked access to personalized
              career guidance, leading to unfulfilled potential and career dissatisfaction.
            </p>
            <p className="mb-6">
              Our team of career counselors, data scientists, and AI researchers came together to create a solution that
              combines the wisdom of experienced career professionals with the power of artificial intelligence. The
              result is a platform that can provide personalized career insights at scale.
            </p>
            <p>
              Today, we're proud to serve thousands of users worldwide, helping them navigate career transitions,
              discover new opportunities, and build fulfilling professional lives. Our AI-powered assessments have
              helped identify over 10,000 career matches, and our mentorship platform has facilitated countless
              meaningful conversations about professional growth.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="w-10 h-10 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                Career guidance should be available to everyone, regardless of their location, background, or financial
                situation.
              </p>
            </div>
            <div className="text-center">
              <Target className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accuracy</h3>
              <p className="text-gray-600">
                Our AI models are continuously refined to provide the most accurate and relevant career recommendations.
              </p>
            </div>
            <div className="text-center">
              <Heart className="w-10 h-10 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Empathy</h3>
              <p className="text-gray-600">
                We understand that career decisions are deeply personal and approach each user's journey with care and
                understanding.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            We're a diverse team of career counselors, AI researchers, and product experts united by our passion for
            helping people find meaningful work.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "Chief Career Officer",
                bio: "Former career counselor with 15+ years helping professionals navigate career transitions.",
              },
              {
                name: "Alex Rodriguez",
                role: "Head of AI Research",
                bio: "PhD in Machine Learning, specializing in natural language processing and personality assessment.",
              },
              {
                name: "Maya Patel",
                role: "Product Director",
                bio: "Product leader with experience building user-centric platforms at scale.",
              },
            ].map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have discovered their ideal career path with our AI-powered guidance.
          </p>
          <div className="space-x-4">
            <Link href="/auth/signup">
              <Button size="lg">Get Started Free</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
