import { pool } from "./database";

async function seedUsers() {
  try {
    const { rowCount } = await pool.query("SELECT * FROM SYS_USERS");

    if (rowCount === 0) {
      const users = [
        {
          name: "Vishwajeet",
          password: "password123",
          email: "vkondi@gmail.com",
        },
        {
          name: "Richa",
          password: "password123",
          email: "richasharmak.90@gmail.com",
        },
      ];

      // Using a single INSERT query for better performance
      const values = users
        .map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`)
        .join(", ");

      const query = `
        INSERT INTO SYS_USERS (name, password, email) VALUES ${values}
      `;

      await pool.query(
        query,
        users.flatMap((user) => [user.name, user.password, user.email])
      );

      console.log("Seeded SYS_USERS table with initial users.");
    }
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

export const migrate = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS SYS_USERS (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name TEXT NOT NULL
      );
    `);
    console.log("SYS_USERS table created successfully!");

    await seedUsers();
  } catch (error) {
    console.error("Migration error:", error);
  }
};
