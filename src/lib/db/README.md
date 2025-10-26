# Database Setup Guide (Netlify + Neon)

This project uses **Netlify's Neon integration** for serverless Postgres database.

## 🚀 Quick Start

### 1. Database Connection (Already Done on Netlify)

The `NETLIFY_DATABASE_URL` environment variable is automatically set by Netlify when you enable the Neon extension.

### 2. Create Database Tables

Run the SQL commands from `src/lib/db/schema.sql` in your Neon database console:

1. Go to your Netlify project dashboard
2. Navigate to **Integrations** → **Neon**
3. Click **View Database** to open Neon console
4. Copy and paste the SQL from `src/lib/db/schema.sql`
5. Run the queries to create all tables

### 3. Insert Sample Data (Optional)

To populate the database with initial products:

```bash
# Run the sample data SQL in your Neon console
# Copy contents from src/lib/db/sample-data.sql
```

### 4. Local Development

For local development, create a `.env.local` file:

```env
NETLIFY_DATABASE_URL=your_neon_database_url
```

You can get your database URL from:
- Netlify Dashboard → Integrations → Neon → Database Settings
- Or from the Neon console directly

## 📁 File Structure

```
src/lib/db/
├── index.ts          # Database client initialization
├── queries.ts        # Reusable database queries
├── schema.sql        # Database schema definitions
├── sample-data.sql   # Initial data to populate tables
└── README.md         # This file

types/
└── product.ts        # TypeScript types for products
```

## 💻 Usage Examples

### Basic Query

```typescript
import { sql } from "@/lib/db";

// Simple query
const products = await sql`SELECT * FROM products WHERE stock > 0`;
```

### Using Pre-built Queries

```typescript
import { getAllProducts, getProductById, searchProducts } from "@/lib/db/queries";

// Fetch all products
const products = await getAllProducts();

// Get specific product
const product = await getProductById(1);

// Search products
const results = await searchProducts("bodysuit");
```

### In API Routes

```typescript
// app/api/products/route.ts
import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/db/queries";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ data: products });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
```

## 🔒 Security Best Practices

1. **Never expose database credentials** - They're automatically managed by Netlify
2. **Always validate input** - Use validation before inserting data
3. **Use parameterized queries** - The `sql` template literal automatically escapes parameters
4. **Rate limiting** - Consider adding rate limiting to API routes
5. **Authentication** - Add authentication for sensitive operations

## 📊 Available Tables

- **users** - User accounts and authentication
- **products** - Product catalog
- **offers** - Promotional offers and discounts
- **categories** - Product categories (hierarchical)
- **orders** - Customer orders
- **order_items** - Items in orders
- **reviews** - Product reviews and ratings
- **menu_groups** - Navigation menu groups
- **menu_sections** - Sections within menu groups
- **menu_categories** - Categories within menu sections

See `src/lib/db/schema.sql` for complete table definitions.

## 🔧 Database Connection

The project uses **database-only data fetching**:

- All product data is fetched from the Neon database
- Database connection is required - no static data fallback
- Ensure `NETLIFY_DATABASE_URL` is properly configured
- Add products via database SQL queries or admin interface

## 🐛 Troubleshooting

### Error: "Cannot find module '@netlify/neon'"

Run: `npm install @netlify/neon`

### Error: "NETLIFY_DATABASE_URL is not defined"

- For production: Ensure Neon extension is enabled in Netlify
- For local dev: Add the URL to `.env.local`

### Error: "relation does not exist"

Run the schema SQL commands from `src/lib/db/schema.sql` in your Neon console

### Connection Errors

- Verify the database URL is correct
- Check if your Netlify site is properly connected to Neon
- Ensure you're on a Netlify plan that supports Neon integration

### No Data Showing

- Check if database is connected: `isDbAvailable()` function
- Verify tables are created in Neon console
- Run sample data SQL to populate initial data
- Check browser console for any errors

## 📚 Resources

- [Netlify DB Documentation](https://docs.netlify.com/integrations/databases/)
- [Neon Documentation](https://neon.tech/docs)
- [@netlify/neon NPM Package](https://www.npmjs.com/package/@netlify/neon)

## 🔄 Migration from Static Data

The project is designed to work with the database only:

1. **Database Required**: All product data comes from Neon database
2. **Environment Setup**: Requires `NETLIFY_DATABASE_URL` to be set
3. **Data Management**: Add/edit products via database directly

To manage products:
1. Access Neon console via Netlify Dashboard
2. Run SQL queries to insert/update products
3. Use the sample data SQL as reference

