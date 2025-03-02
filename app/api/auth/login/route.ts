import { NextResponse } from "next/server";
import { db } from "../../database";
import { generateSessionToken } from "../../helper";
import { SysUserModel } from "@/types/types";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = db
      .prepare("SELECT * FROM SYS_USERS WHERE email = ? AND password = ?")
      .get(email, password);

    if (user) {
      // Create a session token (you might use JWT or another method)
      const sessionToken = generateSessionToken(user as SysUserModel);

      const response = NextResponse.json({ authenticated: true });

      // Set the cookie directly on the response
      response.cookies.set({
        name: "session",
        value: sessionToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours in seconds
        path: "/",
      });

      return response;
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
