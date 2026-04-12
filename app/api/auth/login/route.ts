import jwt from "jsonwebtoken";
import pool from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const user = result.rows[0];

    const token = jwt.sign(
      { user_id: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      },
    );

    return Response.json({ token });
  } catch (error) {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
