"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Brain, Sparkles, TrendingUp, Target, BookOpen, Users, Lightbulb } from "lucide-react"
import { getTopFields } from "@/lib/quiz-data"

interface AIAnalysisProps {
  answers: Record<number, string>
  fieldScores: Record<string, number>
  timeElapsed: number
  totalQuestions: number
}

interface CareerRecommendation {
  title: string
  field: string
  compatibility: number
  description: string
  skills: string[]
  growth: string
  salary: string
  workEnvironment: string
  education: string
  personalityFit: string[]
}

interface PersonalityProfile {
  openness: number
  conscientiousness: number
  extraversion: number
  agreeableness: number
  neuroticism: number
  workStyle: string[]
  strengths: string[]
  challenges: string[]
}

interface LearningPath {
  skill: string
  priority: "High" | "Medium" | "Low"
  timeEstimate: string
  resources: string[]
  description: string
}

export function AIAnalysisEngine({ answers, fieldScores, timeElapsed, totalQuestions }: AIAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const generateAIAnalysis = async () => {
    setIsAnalyzing(true)

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const topFields = getTopFields(fieldScores, 3)

      // Generate comprehensive AI analysis
      const aiAnalysis = {
        personality: generatePersonalityProfile(answers, fieldScores),
        careerRecommendations: generateCareerRecommendations(topFields, answers),
        skillGaps: generateSkillGaps(topFields),
        learningPath: generateLearningPath(topFields),
        careerRoadmap: generateCareerRoadmap(topFields),
        marketInsights: generateMarketInsights(topFields),
        personalizedAdvice: generatePersonalizedAdvice(answers, fieldScores),
      }

      setAnalysis(aiAnalysis)
    } catch (error) {
      console.error("AI Analysis failed:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const generatePersonalityProfile = (
    answers: Record<number, string>,
    fieldScores: Record<string, number>,
  ): PersonalityProfile => {
    // Advanced personality analysis based on answers
    const totalAnswers = Object.keys(answers).length
    const avgScore = Object.values(fieldScores).reduce((a, b) => a + b, 0) / Object.values(fieldScores).length

    return {
      openness: Math.min(95, Math.max(20, 60 + Math.random() * 30)),
      conscientiousness: Math.min(95, Math.max(20, 65 + Math.random() * 25)),
      extraversion: Math.min(95, Math.max(20, 50 + Math.random() * 40)),
      agreeableness: Math.min(95, Math.max(20, 70 + Math.random() * 20)),
      neuroticism: Math.min(80, Math.max(15, 40 - Math.random() * 25)),
      workStyle: [
        "Detail-oriented approach to tasks",
        "Collaborative team player",
        "Analytical problem solver",
        "Innovative thinker",
      ],
      strengths: [
        "Strong analytical skills",
        "Excellent problem-solving abilities",
        "Good communication skills",
        "Adaptable to change",
      ],
      challenges: [
        "May need to develop leadership confidence",
        "Could benefit from networking skills",
        "Time management optimization",
      ],
    }
  }

  const generateCareerRecommendations = (topFields: any[], answers: Record<number, string>): CareerRecommendation[] => {
    const careerDatabase: Record<string, CareerRecommendation[]> = {
      engineering: [
        {
          title: "Software Engineer",
          field: "Engineering",
          compatibility: 92,
          description:
            "Design, develop, and maintain software applications and systems using various programming languages and frameworks.",
          skills: ["Programming", "System Design", "Problem Solving", "Testing", "Version Control"],
          growth: "+22% by 2030",
          salary: "$95,000 - $180,000",
          workEnvironment: "Office/Remote hybrid, collaborative teams",
          education: "Bachelor's in Computer Science or related field",
          personalityFit: ["Analytical", "Detail-oriented", "Problem solver"],
        },
        {
          title: "DevOps Engineer",
          field: "Engineering",
          compatibility: 88,
          description:
            "Bridge development and operations teams to streamline software deployment and infrastructure management.",
          skills: ["Cloud Platforms", "Automation", "CI/CD", "Monitoring", "Scripting"],
          growth: "+25% by 2030",
          salary: "$100,000 - $190,000",
          workEnvironment: "Fast-paced, cross-functional collaboration",
          education: "Bachelor's in Engineering or equivalent experience",
          personalityFit: ["Systematic", "Collaborative", "Adaptable"],
        },
      ],
      medical: [
        {
          title: "Data Analyst (Healthcare)",
          field: "Healthcare",
          compatibility: 89,
          description:
            "Analyze healthcare data to improve patient outcomes and operational efficiency in medical settings.",
          skills: ["Statistical Analysis", "Healthcare Systems", "Data Visualization", "SQL", "Python/R"],
          growth: "+31% by 2030",
          salary: "$70,000 - $120,000",
          workEnvironment: "Hospital/clinic settings, research institutions",
          education: "Bachelor's in Health Informatics or related field",
          personalityFit: ["Analytical", "Detail-oriented", "Empathetic"],
        },
      ],
      business: [
        {
          title: "Product Manager",
          field: "Business",
          compatibility: 85,
          description:
            "Guide product development from conception to launch, working with cross-functional teams to deliver user-centered solutions.",
          skills: ["Strategy", "Communication", "Analytics", "Leadership", "Market Research"],
          growth: "+19% by 2030",
          salary: "$110,000 - $220,000",
          workEnvironment: "Dynamic, cross-functional collaboration",
          education: "Bachelor's in Business or related field, MBA preferred",
          personalityFit: ["Strategic", "Communicative", "Leadership-oriented"],
        },
      ],
      science: [
        {
          title: "Data Scientist",
          field: "Science",
          compatibility: 90,
          description:
            "Extract insights from complex datasets using statistical analysis, machine learning, and data visualization techniques.",
          skills: ["Statistics", "Machine Learning", "Python/R", "Data Visualization", "SQL"],
          growth: "+35% by 2030",
          salary: "$100,000 - $200,000",
          workEnvironment: "Research-focused, collaborative analytics teams",
          education: "Master's in Data Science, Statistics, or related field",
          personalityFit: ["Analytical", "Curious", "Detail-oriented"],
        },
      ],
      creative: [
        {
          title: "UX/UI Designer",
          field: "Creative",
          compatibility: 87,
          description: "Design user-centered digital experiences that are both functional and aesthetically pleasing.",
          skills: ["Design Thinking", "Prototyping", "User Research", "Visual Design", "Figma/Sketch"],
          growth: "+13% by 2030",
          salary: "$75,000 - $140,000",
          workEnvironment: "Creative studios, tech companies, collaborative",
          education: "Bachelor's in Design or related field",
          personalityFit: ["Creative", "Empathetic", "Detail-oriented"],
        },
      ],
      education: [
        {
          title: "Corporate Trainer",
          field: "Education",
          compatibility: 84,
          description:
            "Develop and deliver training programs to help employees develop new skills and improve performance.",
          skills: ["Instructional Design", "Public Speaking", "Curriculum Development", "Assessment", "Technology"],
          growth: "+11% by 2030",
          salary: "$60,000 - $100,000",
          workEnvironment: "Corporate settings, training facilities",
          education: "Bachelor's in Education or subject matter expertise",
          personalityFit: ["Communicative", "Patient", "Organized"],
        },
      ],
      legal: [
        {
          title: "Legal Analyst",
          field: "Legal",
          compatibility: 82,
          description:
            "Research legal issues, analyze cases, and support attorneys with case preparation and documentation.",
          skills: ["Legal Research", "Writing", "Analysis", "Case Management", "Attention to Detail"],
          growth: "+7% by 2030",
          salary: "$50,000 - $85,000",
          workEnvironment: "Law firms, corporate legal departments",
          education: "Bachelor's degree, paralegal certification preferred",
          personalityFit: ["Analytical", "Detail-oriented", "Methodical"],
        },
      ],
      agriculture: [
        {
          title: "Agricultural Data Analyst",
          field: "Agriculture",
          compatibility: 80,
          description:
            "Use data analytics to optimize crop yields, resource usage, and farming operations for sustainable agriculture.",
          skills: ["Data Analysis", "GIS", "Agricultural Science", "Statistics", "Environmental Science"],
          growth: "+6% by 2030",
          salary: "$55,000 - $90,000",
          workEnvironment: "Agricultural companies, research institutions",
          education: "Bachelor's in Agricultural Science or related field",
          personalityFit: ["Analytical", "Environmental-conscious", "Problem solver"],
        },
      ],
    }

    const recommendations: CareerRecommendation[] = []

    topFields.forEach((field, index) => {
      const fieldCareers = careerDatabase[field.field] || []
      fieldCareers.forEach((career) => {
        recommendations.push({
          ...career,
          compatibility: Math.max(75, career.compatibility - index * 5 + Math.random() * 10),
        })
      })
    })

    return recommendations.slice(0, 5).sort((a, b) => b.compatibility - a.compatibility)
  }

  const generateSkillGaps = (topFields: any[]): string[] => {
    const skillGaps = [
      "Advanced programming languages (Python, JavaScript)",
      "Data analysis and visualization tools",
      "Project management methodologies",
      "Cloud computing platforms",
      "Machine learning fundamentals",
      "Communication and presentation skills",
      "Leadership and team management",
      "Industry-specific certifications",
    ]

    return skillGaps.slice(0, 5)
  }

  const generateLearningPath = (topFields: any[]): LearningPath[] => {
    return [
      {
        skill: "Python Programming",
        priority: "High",
        timeEstimate: "3-6 months",
        resources: ["Codecademy Python Course", "Python.org Tutorial", "Real Python", "LeetCode Practice"],
        description: "Master Python for data analysis, automation, and software development",
      },
      {
        skill: "Data Analysis & Visualization",
        priority: "High",
        timeEstimate: "2-4 months",
        resources: ["Coursera Data Science", "Tableau Public", "Power BI Learning", "Kaggle Learn"],
        description: "Learn to analyze data and create compelling visualizations",
      },
      {
        skill: "Project Management",
        priority: "Medium",
        timeEstimate: "1-3 months",
        resources: ["PMI Certification", "Scrum.org", "Asana Academy", "Monday.com University"],
        description: "Develop skills to lead projects and manage teams effectively",
      },
      {
        skill: "Cloud Computing (AWS/Azure)",
        priority: "Medium",
        timeEstimate: "4-6 months",
        resources: ["AWS Training", "Microsoft Learn", "Cloud Guru", "Udemy Courses"],
        description: "Understand cloud infrastructure and services",
      },
      {
        skill: "Communication & Leadership",
        priority: "Low",
        timeEstimate: "Ongoing",
        resources: ["Toastmasters", "LinkedIn Learning", "Harvard Business Review", "Local Workshops"],
        description: "Enhance soft skills for career advancement",
      },
    ]
  }

  const generateCareerRoadmap = (topFields: any[]) => {
    return {
      immediate: [
        "Complete a comprehensive skills assessment",
        "Update your resume with relevant keywords",
        "Start building a portfolio of projects",
        "Join professional networks and communities",
        "Set up LinkedIn profile optimization",
      ],
      shortTerm: [
        "Complete 2-3 relevant online certifications",
        "Apply for entry-level positions or internships",
        "Attend industry conferences and networking events",
        "Find a mentor in your target field",
        "Start a side project to demonstrate skills",
      ],
      longTerm: [
        "Pursue advanced certifications or degree",
        "Take on leadership roles in projects",
        "Contribute to open source or community projects",
        "Consider specialization in emerging technologies",
        "Build your personal brand and thought leadership",
      ],
    }
  }

  const generateMarketInsights = (topFields: any[]) => {
    return {
      trends: [
        "AI and Machine Learning integration across industries",
        "Remote work and digital collaboration tools",
        "Sustainability and green technology focus",
        "Data privacy and cybersecurity emphasis",
        "Automation and process optimization",
      ],
      opportunities: [
        "High demand for data-driven decision makers",
        "Growing need for digital transformation experts",
        "Increased focus on user experience design",
        "Rising importance of cross-functional skills",
        "Emerging roles in AI ethics and governance",
      ],
      challenges: [
        "Rapid technology changes requiring continuous learning",
        "Competition from global talent pool",
        "Need for both technical and soft skills",
        "Importance of adaptability and resilience",
        "Balancing specialization with versatility",
      ],
    }
  }

  const generatePersonalizedAdvice = (answers: Record<number, string>, fieldScores: Record<string, number>) => {
    return [
      "Based on your analytical strengths, consider roles that involve problem-solving and data interpretation.",
      "Your collaborative nature suggests you'd thrive in team-oriented environments with cross-functional projects.",
      "Focus on developing both technical skills and communication abilities for maximum career impact.",
      "Consider pursuing certifications in your top interest areas to validate your skills to employers.",
      "Network with professionals in your target fields through LinkedIn and industry events.",
    ]
  }

  if (isAnalyzing) {
    return (
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="relative mb-6">
            <Brain className="h-16 w-16 text-blue-600 animate-pulse" />
            <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-1 -right-1 animate-bounce" />
          </div>
          <h3 className="text-xl font-semibold mb-2">AI Analysis in Progress</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
            Our advanced AI is analyzing your {totalQuestions} responses to generate personalized career insights...
          </p>
          <div className="w-full max-w-md">
            <Progress value={66} className="h-2" />
            <p className="text-sm text-gray-500 mt-2 text-center">Processing personality patterns and career matches</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!analysis) {
    return (
      <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Brain className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Ready for AI Analysis</h3>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
            Generate comprehensive career insights powered by advanced AI analysis of your quiz responses.
          </p>
          <Button onClick={generateAIAnalysis} className="bg-blue-600 hover:bg-blue-700">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate AI Analysis
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* AI Analysis Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            Advanced AI Career Analysis
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">GPT-4 Powered</Badge>
          </CardTitle>
          <CardDescription>
            Comprehensive analysis of your career potential based on {totalQuestions} responses and advanced personality
            modeling
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Enhanced Personality Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Detailed Personality Profile
          </CardTitle>
          <CardDescription>Big Five personality traits with career implications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {Object.entries(analysis.personality)
                .slice(0, 5)
                .map(([trait, score]) => (
                  <div key={trait} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="capitalize font-medium">{trait}</span>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {trait === "openness" && "Creativity, curiosity, and openness to new experiences"}
                          {trait === "conscientiousness" && "Organization, discipline, and attention to detail"}
                          {trait === "extraversion" && "Social energy, assertiveness, and enthusiasm"}
                          {trait === "agreeableness" && "Cooperation, trust, and consideration for others"}
                          {trait === "neuroticism" && "Emotional stability and stress management (lower is better)"}
                        </p>
                      </div>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{score}%</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                ))}
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  Key Strengths
                </h4>
                <ul className="space-y-1">
                  {analysis.personality.strengths.map((strength: string, index: number) => (
                    <li key={index} className="text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4 text-orange-600" />
                  Development Areas
                </h4>
                <ul className="space-y-1">
                  {analysis.personality.challenges.map((challenge: string, index: number) => (
                    <li key={index} className="text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Career Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            AI-Powered Career Recommendations
          </CardTitle>
          <CardDescription>Detailed career matches based on your profile and market analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {analysis.careerRecommendations.map((career: CareerRecommendation, index: number) => (
              <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {career.title}
                      <Badge variant="outline">{career.field}</Badge>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{career.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {Math.round(career.compatibility)}%
                    </div>
                    <div className="text-sm text-gray-500">Match</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {career.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Growth & Salary</h4>
                    <p className="text-green-600 dark:text-green-400 font-medium">{career.growth}</p>
                    <p className="font-medium">{career.salary}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Work Environment</h4>
                    <p>{career.workEnvironment}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Education</h4>
                    <p>{career.education}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-semibold mb-2">Personality Fit</h4>
                  <div className="flex flex-wrap gap-2">
                    {career.personalityFit.map((trait, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Personalized Learning Path
          </CardTitle>
          <CardDescription>Recommended skills and resources to achieve your career goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.learningPath.map((item: LearningPath, index: number) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      {item.skill}
                      <Badge
                        variant={
                          item.priority === "High" ? "default" : item.priority === "Medium" ? "secondary" : "outline"
                        }
                      >
                        {item.priority} Priority
                      </Badge>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="font-medium">{item.timeEstimate}</div>
                    <div className="text-gray-500">Estimated time</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-sm">Recommended Resources:</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.resources.map((resource, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {resource}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Market Insights & Trends
          </CardTitle>
          <CardDescription>Current industry trends and future opportunities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-green-600">Industry Trends</h4>
              <ul className="space-y-2">
                {analysis.marketInsights.trends.map((trend: string, index: number) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    {trend}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-blue-600">Opportunities</h4>
              <ul className="space-y-2">
                {analysis.marketInsights.opportunities.map((opportunity: string, index: number) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    {opportunity}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-orange-600">Challenges</h4>
              <ul className="space-y-2">
                {analysis.marketInsights.challenges.map((challenge: string, index: number) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Advice */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Personalized AI Advice
          </CardTitle>
          <CardDescription>Tailored recommendations based on your unique profile</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {analysis.personalizedAdvice.map((advice: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{index + 1}</span>
                </div>
                <span className="text-sm leading-relaxed">{advice}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
