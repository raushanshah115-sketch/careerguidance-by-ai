import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("[v0] Quiz questions API called")
    const supabase = await createClient()

    // Get authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    console.log("[v0] Auth check - User:", user?.id || "none", "Error:", authError?.message || "none")

    if (authError || !user) {
      console.log("[v0] Authentication failed, returning 401")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch quiz questions from database
    console.log("[v0] Fetching quiz questions from database...")
    const { data: questions, error } = await supabase
      .from("quiz_questions")
      .select("*")
      .order("field", { ascending: true })
      .order("category", { ascending: true })

    console.log("[v0] Database query result - Questions:", questions?.length || 0, "Error:", error?.message || "none")

    if (error) {
      console.error("[v0] Error fetching quiz questions:", error)
      return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
    }

    if (!questions || questions.length === 0) {
      console.log("[v0] No questions found in database")
      const fallbackQuestions = [
        {
          id: 1,
          question_text: "What type of work environment do you prefer?",
          type: "multiple_choice",
          options: [
            { text: "Office setting with team collaboration", score: 3, weightage: 1 },
            { text: "Remote work with flexible schedule", score: 2, weightage: 1 },
            { text: "Outdoor work in natural environments", score: 4, weightage: 1 },
            { text: "Laboratory or research facility", score: 5, weightage: 1 },
            { text: "Creative studio or workshop", score: 3, weightage: 1 },
          ],
          field: "general",
          category: "work_environment",
        },
        {
          id: 2,
          question_text: "How do you prefer to solve problems?",
          type: "multiple_choice",
          options: [
            { text: "Analytical approach with data and logic", score: 5, weightage: 1 },
            { text: "Creative thinking and brainstorming", score: 4, weightage: 1 },
            { text: "Team collaboration and discussion", score: 3, weightage: 1 },
            { text: "Research-based investigation", score: 5, weightage: 1 },
            { text: "Trial and error experimentation", score: 3, weightage: 1 },
          ],
          field: "engineering",
          category: "problem_solving",
        },
        {
          id: 3,
          question_text: "What motivates you most in your career?",
          type: "multiple_choice",
          options: [
            { text: "Financial success and stability", score: 4, weightage: 1 },
            { text: "Helping others and making a difference", score: 5, weightage: 1 },
            { text: "Creative expression and innovation", score: 4, weightage: 1 },
            { text: "Learning new things continuously", score: 5, weightage: 1 },
            { text: "Leadership and management opportunities", score: 3, weightage: 1 },
          ],
          field: "business",
          category: "motivation",
        },
      ]

      console.log("[v0] Returning fallback questions")
      return NextResponse.json({ questions: fallbackQuestions })
    }

    // Parse JSON options for each question
    const parsedQuestions = questions.map((question) => {
      try {
        return {
          ...question,
          options: typeof question.options === "string" ? JSON.parse(question.options) : question.options,
        }
      } catch (parseError) {
        console.error("[v0] Error parsing options for question", question.id, parseError)
        return {
          ...question,
          options: [],
        }
      }
    })

    console.log("[v0] Successfully returning", parsedQuestions.length, "parsed questions")
    return NextResponse.json({ questions: parsedQuestions })
  } catch (error) {
    console.error("[v0] Quiz questions API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
