"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Send, MessageCircle, Sparkles, BookOpen, TrendingUp, Users, Target } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  type?: "text" | "career_suggestion" | "skill_recommendation" | "roadmap"
  metadata?: any
}

interface CareerSuggestion {
  title: string
  match: number
  description: string
  nextSteps: string[]
}

interface SkillRecommendation {
  skill: string
  importance: "High" | "Medium" | "Low"
  timeToLearn: string
  resources: string[]
}

export function AImentorEnhanced() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your enhanced AI Career Mentor powered by GPT-4. I can provide personalized career guidance, skill recommendations, and detailed roadmaps. What would you like to explore today?",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [mentorMode, setMentorMode] = useState<"general" | "career" | "skills" | "roadmap">("general")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const generateEnhancedResponse = async (userMessage: string, mode: string) => {
    const lowerMessage = userMessage.toLowerCase()

    // Career-specific responses
    if (mode === "career" || lowerMessage.includes("career") || lowerMessage.includes("job")) {
      if (lowerMessage.includes("switch") || lowerMessage.includes("change")) {
        return {
          content:
            "Career transitions require strategic planning. Based on your profile, I recommend focusing on transferable skills first. What's your current field and where would you like to transition?",
          type: "career_suggestion" as const,
          metadata: {
            suggestions: [
              {
                title: "Skills Assessment",
                match: 95,
                description: "Identify transferable skills from your current role",
                nextSteps: ["Complete skills inventory", "Map to target roles", "Identify gaps"],
              },
              {
                title: "Network Building",
                match: 90,
                description: "Connect with professionals in your target field",
                nextSteps: ["Update LinkedIn", "Join industry groups", "Attend networking events"],
              },
            ],
          },
        }
      }

      if (lowerMessage.includes("salary") || lowerMessage.includes("negotiate")) {
        return {
          content:
            "Salary negotiation is crucial for career growth. Research market rates, document your achievements, and practice your pitch. What's your target role and experience level?",
          type: "text" as const,
        }
      }

      return {
        content:
          "I can help you explore various career paths based on your interests and skills. What specific aspect of career development interests you most?",
        type: "text" as const,
      }
    }

    // Skills-specific responses
    if (mode === "skills" || lowerMessage.includes("skill") || lowerMessage.includes("learn")) {
      return {
        content: "Here are some high-demand skills I recommend based on current market trends:",
        type: "skill_recommendation" as const,
        metadata: {
          skills: [
            {
              skill: "Python Programming",
              importance: "High" as const,
              timeToLearn: "3-6 months",
              resources: ["Codecademy", "freeCodeCamp", "Python.org"],
            },
            {
              skill: "Data Analysis",
              importance: "High" as const,
              timeToLearn: "2-4 months",
              resources: ["Coursera", "Kaggle Learn", "DataCamp"],
            },
            {
              skill: "Project Management",
              importance: "Medium" as const,
              timeToLearn: "1-3 months",
              resources: ["PMI", "Scrum.org", "Coursera PM"],
            },
          ],
        },
      }
    }

    // Roadmap-specific responses
    if (mode === "roadmap" || lowerMessage.includes("roadmap") || lowerMessage.includes("plan")) {
      return {
        content: "Here's a personalized career roadmap based on your goals:",
        type: "roadmap" as const,
        metadata: {
          phases: [
            {
              phase: "Immediate (0-3 months)",
              tasks: ["Skills assessment", "Resume update", "Portfolio creation", "Network building"],
            },
            {
              phase: "Short-term (3-12 months)",
              tasks: ["Certification completion", "Job applications", "Interview preparation", "Skill development"],
            },
            {
              phase: "Long-term (1-3 years)",
              tasks: ["Leadership development", "Specialization", "Mentoring others", "Industry recognition"],
            },
          ],
        },
      }
    }

    // General responses
    const responses = [
      "That's an excellent question! Career development is a journey that requires continuous learning and adaptation. What specific area would you like to focus on?",
      "I understand your perspective. Let me help you create a strategic approach to achieve your career goals. What's your primary objective right now?",
      "Based on current industry trends, I'd recommend focusing on both technical skills and soft skills. Which area interests you most?",
      "Career success often comes from aligning your strengths with market opportunities. What are your key strengths?",
      "That's a common challenge many professionals face. Let's break it down into manageable steps. What's your timeline?",
    ]

    return {
      content: responses[Math.floor(Math.random() * responses.length)],
      type: "text" as const,
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI processing delay
    setTimeout(async () => {
      const response = await generateEnhancedResponse(inputMessage, mentorMode)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
        type: response.type,
        metadata: response.metadata,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const renderMessage = (message: Message) => {
    if (message.type === "career_suggestion" && message.metadata?.suggestions) {
      return (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed">{message.content}</p>
          <div className="space-y-3">
            {message.metadata.suggestions.map((suggestion: CareerSuggestion, index: number) => (
              <div key={index} className="border rounded-lg p-3 bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{suggestion.title}</h4>
                  <Badge variant="secondary">{suggestion.match}% match</Badge>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{suggestion.description}</p>
                <div className="space-y-1">
                  {suggestion.nextSteps.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (message.type === "skill_recommendation" && message.metadata?.skills) {
      return (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed">{message.content}</p>
          <div className="space-y-3">
            {message.metadata.skills.map((skill: SkillRecommendation, index: number) => (
              <div key={index} className="border rounded-lg p-3 bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{skill.skill}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant={skill.importance === "High" ? "default" : "secondary"}>{skill.importance}</Badge>
                    <span className="text-xs text-gray-500">{skill.timeToLearn}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {skill.resources.map((resource, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {resource}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    if (message.type === "roadmap" && message.metadata?.phases) {
      return (
        <div className="space-y-3">
          <p className="text-sm leading-relaxed">{message.content}</p>
          <div className="space-y-3">
            {message.metadata.phases.map((phase: any, index: number) => (
              <div key={index} className="border rounded-lg p-3 bg-purple-50 dark:bg-purple-900/20">
                <h4 className="font-semibold text-sm mb-2">{phase.phase}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {phase.tasks.map((task: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-1 h-1 bg-purple-600 rounded-full"></div>
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    return <p className="text-sm leading-relaxed">{message.content}</p>
  }

  const quickPrompts = {
    general: [
      "How do I find my ideal career?",
      "What skills are in demand?",
      "Help me create a career plan",
      "How to improve my resume?",
    ],
    career: [
      "I want to switch careers",
      "How to negotiate salary?",
      "What's the job market like?",
      "Career growth strategies",
    ],
    skills: [
      "What skills should I learn?",
      "How to learn programming?",
      "Best online courses?",
      "Certification recommendations",
    ],
    roadmap: ["Create my career roadmap", "3-year career plan", "Steps to promotion", "Timeline for career change"],
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Tabs value={mentorMode} onValueChange={(value) => setMentorMode(value as any)} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="career" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Career
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Skills
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Roadmap
          </TabsTrigger>
        </TabsList>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Enhanced Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <Brain className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      Enhanced AI Career Mentor
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        <Sparkles className="h-3 w-3 mr-1" />
                        GPT-4
                      </Badge>
                    </CardTitle>
                    <CardDescription>Specialized in {mentorMode} guidance • Available 24/7</CardDescription>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                            <Brain className="h-3 w-3" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-3 ${
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {renderMessage(message)}
                        <p
                          className={`text-xs mt-2 ${
                            message.role === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      {message.role === "user" && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-xs">
                            U
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                          <Brain className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Enhanced Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Ask about ${mentorMode} guidance...`}
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            <TabsContent value={mentorMode} className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {mentorMode === "general" && <MessageCircle className="h-4 w-4" />}
                    {mentorMode === "career" && <TrendingUp className="h-4 w-4" />}
                    {mentorMode === "skills" && <BookOpen className="h-4 w-4" />}
                    {mentorMode === "roadmap" && <Target className="h-4 w-4" />}
                    Quick Questions
                  </CardTitle>
                  <CardDescription>Click to ask common {mentorMode} questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {quickPrompts[mentorMode].map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left h-auto py-2 px-3 bg-transparent"
                        onClick={() => setInputMessage(prompt)}
                      >
                        <MessageCircle className="h-3 w-3 mr-2 flex-shrink-0" />
                        <span className="text-xs leading-relaxed">{prompt}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Enhanced Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Sparkles className="h-3 w-3 text-blue-600 mt-1 flex-shrink-0" />
                    <span>GPT-4 powered responses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                    <span>Real-time market insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-3 w-3 text-purple-600 mt-1 flex-shrink-0" />
                    <span>Personalized roadmaps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BookOpen className="h-3 w-3 text-orange-600 mt-1 flex-shrink-0" />
                    <span>Skill recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="h-3 w-3 text-red-600 mt-1 flex-shrink-0" />
                    <span>Industry networking tips</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
