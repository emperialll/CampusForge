import jwt from "jsonwebtoken";

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, "your-secret");
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
