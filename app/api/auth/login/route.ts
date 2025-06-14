import { NextResponse } from "next/server";
import { generateSessionToken } from "../../helper";
import { SysUserModel } from "@/types/types";
import { pool } from "../../database";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Use parameterized query to prevent SQL injection
    const query = "SELECT * FROM SYS_USERS WHERE email = $1 AND password = $2";
    const result = await pool.query(query, [email, password]);

    if (result.rows.length > 0) {
      const user = result.rows[0] as SysUserModel;

      // Create a session token
      const { sessionToken, exp } = generateSessionToken(user as SysUserModel);

      const response = NextResponse.json({ authenticated: true });

      // Set the cookie directly on the response
      response.cookies.set({
        name: "session",
        value: sessionToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: exp, // Set maxAge to match the token expiry
        path: "/",
      });

      return response;
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);

    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 },
    );
  }
}
