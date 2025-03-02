import { SysUserModel } from "@/types/types";

// Helper function to generate a session token
export function generateSessionToken(user: SysUserModel) {
  return Buffer.from(
    JSON.stringify({
      id: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    })
  ).toString("base64");
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
