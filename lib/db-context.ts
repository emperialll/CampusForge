import pool from "@/lib/db";

export async function getDbClientWithContext(
  userId: string,
  schoolId: string,
  role: string,
) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`SET LOCAL app.user_id = '${userId}'`);
    await client.query(`SET LOCAL app.school_id = '${schoolId}'`);
    await client.query(`SET LOCAL app.role = '${role}'`);

    return client;
  } catch (error) {
    client.release();
    throw error;
  }
}
