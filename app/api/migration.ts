import { Database } from "better-sqlite3";
import { db } from "./database";

function seedUsers(db: Database) {
  const existingUsers = db.prepare("SELECT * FROM SYS_USERS").all(); // Sync query

  if (existingUsers.length === 0) {
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

    const insertUser = db.prepare(
      `INSERT INTO SYS_USERS (name, password, email) VALUES (?, ?, ?)`
    );

    const insertTransaction = db.transaction(() => {
      users.forEach((user) => {
        insertUser.run(user.name, user.password, user.email);
      });
    });

    insertTransaction(); // Run transaction to insert users
    console.log("Seeded SYS_USERS table with initial users.");
  }
}

export const migrate = () => {
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS SYS_USERS (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          name TEXT NOT NULL
      );
    `);
    console.log("SYS_USERS table created successfully!");

    seedUsers(db);
  } catch (err) {
    console.error("Migration error:", err);
  }
};
