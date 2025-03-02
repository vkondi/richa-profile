import { NextResponse } from "next/server";

export async function POST() {
  // Create a response
  const response = NextResponse.json({ success: true });

  // Clear the session cookie directly on the response
  response.cookies.set({
    name: "session",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
  });

  return response;
}
