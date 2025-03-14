import { NextResponse } from "next/server";
import { pool } from "../database";

// GET: Fetch interpretations
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const number = searchParams.get("number");

  try {
    let query = "SELECT * FROM INTERPRETATIONS";
    const params = [];

    // Fetch based on type and number
    if (type && number) {
      query += ` WHERE type=$1 AND number=$2`;
      params.push(type, parseInt(number));
    } else if (type) {
      query += ` WHERE type=$1`;
      params.push(type);
    }

    const result = await pool.query(query, params);
    const response = NextResponse.json({
      count: result.rows.length,
      data: result.rows,
    });
    response.headers.set(
      "Cache-Control",
      "public, max-age=3600, s-maxage=3600, stale-while-revalidate=59"
    );

    return response;
    // return NextResponse.json({ data: result.rows, count: result.rows.length });
  } catch (err) {
    console.error("interpretations GET >> Exception: ", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST: Add new interpretations
export async function POST(req: Request) {
  try {
    const records = await req.json();

    // Check for valid data
    if (!Array.isArray(records) || records?.length < 1) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Check for missing fields
    const { missingFields, queryPool } = records.reduce(
      (prev, curr) => {
        if (curr?.type && curr?.number && curr?.description) {
          return {
            ...prev,
            queryPool: [
              ...prev.queryPool,
              pool.query(
                `INSERT INTO INTERPRETATIONS (type, number, description)
                 VALUES ($1, $2, $3) ON CONFLICT (type, number) DO NOTHING RETURNING *`,
                [curr.type, curr.number, curr.description]
              ),
            ],
          };
        } else {
          return {
            ...prev,
            missingFields: [...prev.missingFields, curr],
          };
        }
      },
      { missingFields: [], queryPool: [] }
    );

    // Check for missing fields data
    if (missingFields.length) {
      return NextResponse.json(
        { error: "Missing request data", data: missingFields },
        { status: 400 }
      );
    }

    const results = await Promise.all(queryPool);
    const insertedData = results.map((result) => result.rows[0]);

    return NextResponse.json({ data: insertedData }, { status: 201 });
  } catch (err) {
    console.error("interpretations POST >> Exception: ", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE: Remove one or more interpretations
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "Invalid IDs" }, { status: 400 });
    }

    const query = `DELETE FROM INTERPRETATIONS WHERE id = ANY($1) RETURNING *`;
    const result = await pool.query(query, [ids]);

    return NextResponse.json({ data: result.rows });
  } catch (err) {
    console.error("interpretations DELETE >> Exception: ", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT: Update interpretation based on "id"
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const id = data.id;

    if (!id) {
      return NextResponse.json(
        { error: "Missing id for update" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `UPDATE INTERPRETATIONS
       SET type = COALESCE($1, type),
           number = COALESCE($2, number),
           description = COALESCE($3, description)
       WHERE id = $4
       RETURNING *`,
      [data.type, data.number, data.description, id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "No interpretation found with the given id" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: result.rows[0] }, { status: 200 });
  } catch (err) {
    console.error("interpretations PUT >> Exception: ", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
