import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { ClerkExpressWithAuth, ClerkExpressRequireAuth, clerkClient } from '@clerk/clerk-sdk-node';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { users, calculatorFormSchema } from '../shared/schema';
import { eq } from 'drizzle-orm';
import Paystack from '@paystack/paystack-sdk';

// Safety check for all necessary keys
if (!process.env.DATABASE_URL || !process.env.PAYSTACK_SECRET_KEY || !process.env.OPENROUTER_API_KEY || !process.env.CLERK_SECRET_KEY) {
    console.error("FATAL ERROR: Missing critical environment variables in your .env file.");
    process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

//
// --- THIS IS THE CRITICAL FIX ---
// This is Clerk's "front desk" middleware. It MUST come before your routes.
// It reads the user's security pass and makes it available to all other parts of the server.
//
app.use(ClerkExpressWithAuth());

app.use(express.json());

// --- API ENDPOINTS ---
// Now the ClerkExpressRequireAuth "security guard" will work correctly.

app.get('/api/user/status', ClerkExpressRequireAuth(), async (req, res) => { /* your existing code */ });
app.post('/api/create-checkout-url', ClerkExpressRequireAuth(), async (req, res) => { /* your existing code */ });
app.post('/api/ask-uncle', ClerkExpressRequireAuth(), async (req, res) => { /* your existing code */ });

// The calculate route does not need authentication, so it has no guard.
app.post("/api/calculate", (req, res) => { /* your existing code */ });

// --- START THE SERVER ---
const port = 5001;
const httpServer = createServer(app);
httpServer.listen(port, () => {
    console.log(`✅ API server is running and listening on http://localhost:${port}`);
});