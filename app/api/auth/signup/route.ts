import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json()

    // TODO: Implement actual Supabase authentication
    console.log("[v0] API Signup attempt:", { email, firstName, lastName })

    // Mock validation
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    // Simulate signup delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock successful signup
    const mockUser = {
      id: "123",
      email,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      created_at: new Date().toISOString(),
    }

    // In a real app, you would:
    // 1. Create user in Supabase
    // 2. Send confirmation email
    // 3. Create session/JWT token
    // 4. Set secure cookies

    return NextResponse.json({
      user: mockUser,
      session: {
        access_token: "mock_access_token",
        refresh_token: "mock_refresh_token",
        expires_at: Date.now() + 3600000, // 1 hour
      },
    })
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
