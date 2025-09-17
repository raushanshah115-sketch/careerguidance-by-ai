"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain, Send, MessageCircle, User, Sparkles, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

// Mock AI responses - in real app, this would use OpenAI API
const mockAIResponses = [
  "That's a great question! Based on your career assessment results, I'd recommend focusing on building your technical skills first. What specific area interests you most?",
  "I understand your concerns about career transitions. Many successful professionals have made similar changes. Let me help you create a step-by-step plan.",
  "Your personality profile suggests you'd thrive in collaborative environments. Have you considered roles that combine your technical skills with team leadership?",
  "That's an excellent goal! To become a data scientist, you'll want to focus on statistics, programming (Python/R), and machine learning. Would you like me to create a detailed learning roadmap?",
  "Career pivots can feel overwhelming, but they're often the most rewarding decisions. Let's break down your transition into manageable steps.",
]

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI Career Mentor. I've analyzed your quiz results and I'm here to help guide your career journey. What would you like to discuss today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
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

  const quickPrompts = [
    "How do I transition to tech?",
    "What skills should I learn?",
    "Help me create a career roadmap",
    "How to improve my resume?",
    "What are the best networking strategies?",
    "How to prepare for interviews?",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Brain className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">CareerAI</span>
          </Link>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            AI Mentor Online
          </Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs defaultValue="ai-mentor" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai-mentor" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI Mentor
            </TabsTrigger>
            <TabsTrigger value="human-counselor" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Human Counselor
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-mentor" className="space-y-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Chat Interface */}
              <div className="lg:col-span-3">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader className="border-b">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder-9fnyn.png" />
                        <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                          AI
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">AI Career Mentor</CardTitle>
                        <CardDescription>Powered by advanced AI • Available 24/7</CardDescription>
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
                              <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 text-xs">
                                AI
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              message.role === "user"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
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
                            <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400 text-xs">
                              AI
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
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

                  {/* Input */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Input
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about your career..."
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

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Prompts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Questions</CardTitle>
                    <CardDescription>Click to ask common career questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {quickPrompts.map((prompt, index) => (
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

                {/* AI Capabilities */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What I Can Help With</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Career transition planning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Skill development roadmaps</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Resume and interview prep</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Industry insights and trends</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Networking strategies</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Work-life balance advice</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="human-counselor" className="space-y-6">
            <Card className="text-center py-12">
              <CardContent>
                <div className="max-w-md mx-auto">
                  <User className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    One-on-One Career Counseling
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Connect with certified career counselors for personalized guidance and in-depth career planning
                    sessions.
                  </p>
                  <Badge className="mb-6 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                    Coming Soon
                  </Badge>
                  <div className="space-y-4">
                    <div className="text-left space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">60-minute sessions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Certified career counselors</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">Personalized action plans</span>
                      </div>
                    </div>
                    <Button disabled className="w-full">
                      Book Session (Coming Soon)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
