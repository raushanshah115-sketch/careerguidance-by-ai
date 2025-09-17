import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

interface QuizSubmission {
  answers: Record<string, string>
  fieldScores: Record<string, number>
  timeElapsed: number
  totalQuestions: number
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

    const body: QuizSubmission = await request.json()
    const { answers, fieldScores, timeElapsed, totalQuestions } = body

    // Calculate top career field
    const topField = Object.entries(fieldScores).reduce((a, b) => (fieldScores[a[0]] > fieldScores[b[0]] ? a : b))[0]
    const topScore = fieldScores[topField]
    const matchPercentage = Math.round((topScore / (totalQuestions * 5)) * 100) // Assuming max score of 5 per question

    // Save quiz result to database
    const { data: result, error } = await supabase
      .from("quiz_results")
      .insert({
        user_id: user.id,
        answers: JSON.stringify(answers),
        field_scores: JSON.stringify(fieldScores),
        top_career_field: topField,
        match_percentage: matchPercentage,
        time_taken: timeElapsed,
        total_questions: totalQuestions,
      })
      .select()
      .single()

    if (error) {
      console.error("Error saving quiz result:", error)
      return NextResponse.json({ error: "Failed to save quiz result" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      result: {
        id: result.id,
        topField,
        matchPercentage,
        fieldScores,
        timeElapsed,
        totalQuestions,
      },
    })
  } catch (error) {
    console.error("Quiz submission API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
