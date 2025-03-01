import { db } from "../database";

export async function POST(req: Request) {
  try {
    const { name, password } = await req.json();

    const user = db
      .prepare("SELECT * FROM SYS_USERS WHERE name = ? AND password = ?")
      .get(name, password);

    if (user) {
      return new Response(JSON.stringify({ authenticated: true }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ authenticated: false }), {
        headers: { "Content-Type": "application/json" },
        status: 401,
      });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
