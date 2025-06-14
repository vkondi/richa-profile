import { SysUserModel } from "@/types/types";

type TimeUnit = "year" | "month" | "day" | "hour" | "min" | "sec";

/**
 * Generates an expiry timestamp based on the given value and time unit.
 * @param value - Numeric value for the time unit (must be positive)
 * @param type - Time unit (year, month, day, hour, min, sec)
 * @returns Expiry timestamp in seconds since epoch
 */
export function generateExpiry(value?: number, type?: TimeUnit): number {
  // Default to 1 day if invalid input
  if (value === undefined || value <= 0 || type === undefined) {
    return Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 1 day in seconds
  }

  const now = Math.floor(Date.now() / 1000); // current time in seconds

  switch (type) {
    case "year":
      return now + value * 365 * 24 * 60 * 60; // approximate, not accounting for leap years
    case "month":
      return now + value * 30 * 24 * 60 * 60; // approximate, not accounting for different month lengths
    case "day":
      return now + value * 24 * 60 * 60;
    case "hour":
      return now + value * 60 * 60;
    case "min":
      return now + value * 60;
    case "sec":
      return now + value;
    default:
      return now + 24 * 60 * 60; // default to 1 day for any other input
  }
}

// Helper function to generate a session token
export function generateSessionToken(user: SysUserModel) {
  const exp = generateExpiry(11, "month"); // 2 months

  return {
    sessionToken: Buffer.from(
      JSON.stringify({
        id: user.id,
        email: user.email,
        exp,
      }),
    ).toString("base64"),
    exp,
  };
}

export async function verifyToken(token: string) {
  try {
    const decoded = JSON.parse(Buffer.from(token, "base64").toString());

    // Check if token is expired
    if (decoded.exp < Math.floor(Date.now() / 1000)) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("verifyToken >> Exception: ", error);
    return false;
  }
}
