import { neon } from "@netlify/neon";

/**
 * Database client using Neon (Netlify's serverless Postgres)
 * Automatically uses the NETLIFY_DATABASE_URL environment variable
 */

let sql: ReturnType<typeof neon> | null = null;

// Function to initialize database connection
function initializeDb() {
  // Skip initialization in browser
  if (typeof window !== "undefined") return;

  // Get database URL from environment
  const dbUrl = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;
  
  if (!dbUrl) {
    return;
  }

  try {
    sql = neon(dbUrl);
  } catch {
    sql = null;
  }
}

// Initialize immediately
initializeDb();

export { sql };

/**
 * Type-safe query helper
 * Usage:
 * const products = await sql<Product[]>`SELECT * FROM products`;
 */

