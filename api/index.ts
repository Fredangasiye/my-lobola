import 'dotenv/config'; // Loads .env file immediately
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { ClerkExpressWithAuth, ClerkExpressRequireAuth, clerkClient } from '@clerk/clerk-sdk-node';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { users, calculatorFormSchema } from '../shared/schema';
import { eq } from 'drizzle-orm';
import { Paystack } from '@paystack/paystack-sdk';

const app = express();
const port = 5001;

// --- Main Startup Function ---
async function startServer() {
  try {
    console.log("🚀 Starting server... Checking keys...");

    // 1. Safety check for all necessary keys
    const requiredKeys = ['DATABASE_URL', 'PAYSTACK_SECRET_KEY', 'OPENROUTER_API_KEY', 'CLERK_SECRET_KEY', 'CLERK_PUBLISHABLE_KEY'];
    for (const key of requiredKeys) {
      if (!process.env[key]) {
        throw new Error(`FATAL ERROR: Missing critical environment variable: ${key}`);
      }
    }
    console.log("✅ All API keys are present in .env file.");

    // 2. Initialize all services
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);
    const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!);
    console.log("✅ Database and Paystack services initialized.");

    // 3. Setup Middleware
    app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
    app.use(ClerkExpressWithAuth());
    app.use(express.json());
    console.log("✅ Middleware configured.");

    // 4. Define API Endpoints
    // (Your existing, correct endpoints go here)
    app.post("/api/calculate", (req, res) => { /* ... */ });
    app.get('/api/user/status', ClerkExpressRequireAuth(), async (req, res) => { /* ... */ });
    app.post('/api/create-checkout-url', ClerkExpressRequireAuth(), async (req, res) => { /* ... */ });
    app.post('/api/ask-uncle', ClerkExpressRequireAuth(), async (req, res) => { /* ... */ });
    console.log("✅ API endpoints defined.");

    // 5. Start Listening
    const httpServer = createServer(app);
    httpServer.listen(port, () => {
        console.log(`✅✅✅ API server is running and listening on http://localhost:${port}`);
    });

  } catch (error) {
    console.error("\n💥💥💥 SERVER STARTUP FAILED 💥💥💥");
    console.error(error.message);
    process.exit(1); // Exit with an error code
  }
}

startServer(); // Run the startup function

export default app;