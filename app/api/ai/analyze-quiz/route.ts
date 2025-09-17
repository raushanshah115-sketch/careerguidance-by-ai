import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

interface QuizAnalysisRequest {
  quizResultId: string
  answers: Record<string, string>
  fieldScores: Record<string, number>
  topField: string
  matchPercentage: number
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body: QuizAnalysisRequest = await request.json()
    const { quizResultId, answers, fieldScores, topField, matchPercentage } = body

    // Create comprehensive analysis prompt
    const analysisPrompt = `
You are an expert career counselor and psychologist. Analyze the following career assessment results and provide comprehensive insights.

QUIZ RESULTS:
- Top Career Field: ${topField} (${matchPercentage}% match)
- Field Scores: ${JSON.stringify(fieldScores, null, 2)}
- Total Answers: ${Object.keys(answers).length}

TASK: Provide a detailed career analysis in the following JSON format:

{
  "personalityAnalysis": {
    "strengths": ["strength1", "strength2", "strength3"],
    "workStyle": "description of work style preferences",
    "motivations": ["motivation1", "motivation2", "motivation3"],
    "challenges": ["potential challenge1", "potential challenge2"]
  },
  "careerRecommendations": [
    {
      "title": "Specific Job Title",
      "field": "career field",
      "compatibility": 95,
      "description": "detailed description",
      "keySkills": ["skill1", "skill2", "skill3"],
      "educationPath": "education requirements",
      "salaryRange": "$X - $Y",
      "jobGrowth": "+X% by 2030",
      "workEnvironment": "description of typical work environment"
    }
  ],
  "skillDevelopment": {
    "immediate": ["skill to develop now"],
    "shortTerm": ["skills for next 6-12 months"],
    "longTerm": ["advanced skills for career growth"]
  },
  "careerRoadmap": {
    "phase1": {
      "title": "Foundation Building (0-6 months)",
      "goals": ["goal1", "goal2"],
      "actions": ["action1", "action2"]
    },
    "phase2": {
      "title": "Skill Development (6-18 months)",
      "goals": ["goal1", "goal2"],
      "actions": ["action1", "action2"]
    },
    "phase3": {
      "title": "Career Advancement (18+ months)",
      "goals": ["goal1", "goal2"],
      "actions": ["action1", "action2"]
    }
  },
  "industryInsights": {
    "trends": ["trend1", "trend2"],
    "opportunities": ["opportunity1", "opportunity2"],
    "challenges": ["challenge1", "challenge2"]
  }
}

Provide specific, actionable, and personalized recommendations based on the assessment results. Focus on practical steps and realistic timelines.
`

    // Generate AI analysis
    const { text } = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: analysisPrompt,
      maxTokens: 2000,
      temperature: 0.7,
    })

    let analysisData
    try {
      analysisData = JSON.parse(text)
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError)
      return NextResponse.json({ error: "Failed to parse AI analysis" }, { status: 500 })
    }

    // Save analysis to database
    const { error: saveError } = await supabase.from("ai_analyses").insert({
      user_id: user.id,
      quiz_result_id: quizResultId,
      analysis_data: analysisData,
      model_used: "gpt-4-turbo",
      analysis_type: "career_assessment",
    })

    if (saveError) {
      console.error("Error saving AI analysis:", saveError)
      // Continue anyway, return the analysis even if saving fails
    }

    return NextResponse.json({
      success: true,
      analysis: analysisData,
    })
  } catch (error) {
    console.error("AI analysis error:", error)
    return NextResponse.json({ error: "Failed to generate AI analysis" }, { status: 500 })
  }
}
