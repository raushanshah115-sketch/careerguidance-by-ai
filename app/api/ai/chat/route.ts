import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const { messages, context } = await req.json()

    // Get user's latest quiz results for context
    const { data: latestQuiz } = await supabase
      .from("quiz_results")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    // Get user's AI analysis for additional context
    const { data: latestAnalysis } = await supabase
      .from("ai_analyses")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    // Build context-aware system prompt
    let systemPrompt = `You are an expert AI career mentor and counselor. You provide personalized, actionable career guidance based on scientific career assessment principles.

CORE PRINCIPLES:
- Be supportive, encouraging, and professional
- Provide specific, actionable advice
- Ask clarifying questions when needed
- Reference current industry trends and job market data
- Focus on practical steps and realistic timelines
- Encourage continuous learning and growth

CONVERSATION STYLE:
- Warm and approachable but professional
- Use examples and analogies to explain concepts
- Break down complex advice into manageable steps
- Acknowledge challenges while maintaining optimism`

    if (latestQuiz) {
      systemPrompt += `

USER'S CAREER ASSESSMENT RESULTS:
- Top Career Field: ${latestQuiz.top_career_field} (${latestQuiz.match_percentage}% match)
- Field Scores: ${JSON.stringify(latestQuiz.field_scores)}
- Assessment Date: ${new Date(latestQuiz.created_at).toLocaleDateString()}`
    }

    if (latestAnalysis) {
      const analysis = latestAnalysis.analysis_data
      systemPrompt += `

PREVIOUS AI ANALYSIS INSIGHTS:
- Key Strengths: ${analysis.personalityAnalysis?.strengths?.join(", ") || "Not available"}
- Work Style: ${analysis.personalityAnalysis?.workStyle || "Not available"}
- Top Career Recommendations: ${analysis.careerRecommendations?.map((c: any) => c.title).join(", ") || "Not available"}`
    }

    systemPrompt += `

Remember to reference this context when providing advice, but don't overwhelm the user with information they already know. Focus on their current questions and needs.`

    // Stream the AI response
    const result = await streamText({
      model: openai("gpt-4-turbo"),
      system: systemPrompt,
      messages,
      maxTokens: 1000,
      temperature: 0.8,
    })

    // Save chat message to database (fire and forget)
    supabase
      .from("chat_sessions")
      .insert({
        user_id: user.id,
        messages: JSON.stringify([...messages, { role: "assistant", content: "AI response" }]),
        session_type: "career_mentoring",
      })
      .then(() => {
        console.log("Chat session saved")
      })
      .catch((error) => {
        console.error("Failed to save chat session:", error)
      })

    return result.toAIStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal server error", { status: 500 })
  }
}
