import { CACHE_CONTROL } from "@/utils/constants";
import { NextResponse } from "next/server";

// GET: Fetch interpretations/loshu
export async function GET() {
  const loshu_grid_interpretations = await import(
    "../../../../data/loshu_grid_interpretations.json"
  );

  try {
    const response = NextResponse.json({
      data: loshu_grid_interpretations,
    });
    response.headers.set("Cache-Control", CACHE_CONTROL);

    return response;
  } catch (err) {
    console.error("interpretations/loshu GET >> Exception: ", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
