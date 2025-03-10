import fs from "fs";
import path from "path";
import { INTERPRETATIONS_TABLE, SYS_USERS_TABLE } from "@/utils/constants";
import { pool } from "./database";
import { InterpretationModel } from "@/types/types";
import csvParser from "csv-parser";

const createTable = async ({
  name,
  query,
}: {
  name: string;
  query: string;
}) => {
  try {
    await pool.query(query);
    console.log(`✅ ${name} table created successfully!`);
  } catch (error) {
    console.error(`❌ Failed to create table ${name}: `, error);
  }
};

const readInterpretationsFromCSV = async (
  filePath: string
): Promise<Partial<InterpretationModel>[]> => {
  return new Promise((resolve, reject) => {
    const interpretations: Partial<InterpretationModel>[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        if (row?.type && row?.number && row?.description)
          interpretations.push(row);
      })
      .on("end", () => resolve(interpretations))
      .on("error", (error) => reject(error));
  });
};

// Seed System Users
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

      console.log(`✅ Seed data for ${SYS_USERS_TABLE} table`);
    }
  } catch (error) {
    console.error(
      `❌ Failed to seed data for ${SYS_USERS_TABLE} table:`,
      error
    );
  }
}

// Seed Interpretations
const seedInterpretations = async () => {
  try {
    const { rowCount } = await pool.query(
      `SELECT * FROM ${INTERPRETATIONS_TABLE}`
    );

    // Check if data exists in table
    if (rowCount === 0) {
      const csvPath = path.join(process.cwd(), "data/interpretations_data.csv");
      let interpretations: Partial<InterpretationModel>[] = [];

      // Check CSV exists at given path
      if (fs.existsSync(csvPath)) {
        interpretations = await readInterpretationsFromCSV(csvPath);
        console.log("interpretations count: ", interpretations.length);
      } else {
        console.error("Interpretations incorrect CSV path: ", csvPath);
        return;
      }

      // No data in CSV?
      if (interpretations.length === 0) {
        console.warn("❗No interpretations found in CSV");
        return;
      }

      // Using a single INSERT query for better performance
      const values = interpretations
        .map((_, i) => `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`)
        .join(", ");

      const query = `
          INSERT INTO ${INTERPRETATIONS_TABLE} (type, number, description) VALUES ${values}
        `;

      const valuesMap = interpretations.flatMap((interpretation) => [
        interpretation.type,
        interpretation.number,
        interpretation.description,
      ]);

      await pool.query(query, valuesMap);

      console.log(`✅ Seed data for ${INTERPRETATIONS_TABLE} table`);
    }
  } catch (error) {
    console.error(
      `❌ Failed to seed data for ${INTERPRETATIONS_TABLE} table:`,
      error
    );
  }
};

// Main migration method
export const migrate = async () => {
  try {
    const tables = [
      {
        name: SYS_USERS_TABLE,
        query: `CREATE TABLE IF NOT EXISTS ${SYS_USERS_TABLE} (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name TEXT NOT NULL
      );`,
      },
      {
        name: INTERPRETATIONS_TABLE,
        query: `CREATE TABLE  IF NOT EXISTS ${INTERPRETATIONS_TABLE} (
            id SERIAL PRIMARY KEY,
            type TEXT NOT NULL,
            number INTEGER NOT NULL,
            description TEXT NOT NULL,
            UNIQUE(type, number)
        );`,
      },
    ];

    // Create Database tables
    await Promise.all(tables.map(createTable));
    console.log("✅ Tables created successfully!");

    // Seed initial data
    await Promise.all([seedInterpretations(), seedUsers()]);
  } catch (error) {
    console.error("❌ Migration error:", error);
  }
};
