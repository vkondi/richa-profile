import { NextResponse } from "next/server";
import { pool } from "../database";

// GET: Fetch all users
export async function GET() {
  try {
    const result = await pool.query(`SELECT email, name, id from SYS_USERS`);

    return NextResponse.json({ data: result.rows });
  } catch (err) {
    console.error("sys_users GET >> Exception: ", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST: Add a new user
export async function POST(req: Request) {
  try {
    const { email, name, password } = await req.json();

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await pool.query(
      `INSERT INTO SYS_USERS (email, name, password) VALUES ($1, $2, $3)`,
      [email, name, password]
    );

    return NextResponse.json({ message: "User added successfully" });
  } catch (err) {
    console.error("sys_users POST >> Exception: ", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a user by ID
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `DELETE FROM SYS_USERS WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("sys_users DELETE >> Exception: ", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
