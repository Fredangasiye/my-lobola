import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
// --- THIS IS A KEY FIX ---
// We import RequestWithAuth from Clerk to fix the TypeScript errors.
import { ClerkExpressWithAuth, ClerkExpressRequireAuth, clerkClient, RequestWithAuth } from '@clerk/clerk-sdk-node';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { users, calculatorFormSchema } from './shared/schema'; // Corrected path
import { eq } from 'drizzle-orm';
import { Paystack } from '@paystack/paystack-sdk';

// Safety check for keys
if (!process.env.DATABASE_URL || !process.env.PAYSTACK_SECRET_KEY || !process.env.OPENROUTER_API_KEY || !process.env.CLERK_SECRET_KEY || !process.env.CLERK_PUBLISHABLE_KEY) {
    console.error("FATAL ERROR: Missing critical environment variables.");
    process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);
const app = express();

// --- THIS IS THE CORS FIX ---
// This allows both your local server and your Vercel deployment to talk to the API.
const allowedOrigins = [
    'http://localhost:5173',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    process.env.VERCEL_BRANCH_URL ? `https://${process.env.VERCEL_BRANCH_URL}` : ''
].filter(Boolean);

app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());
app.use(ClerkExpressWithAuth()); // This middleware MUST come after CORS and body-parser

// Endpoint 2: The User Subscription Status
app.get('/api/user/status', ClerkExpressRequireAuth(), async (req: RequestWithAuth, res) => { // Fixed type
    try {
        const userId = req.auth.userId;
        // ... your user status logic
    } catch (error) { /* ... */ }
});

// Endpoint 3: The Paystack Checkout
app.post('/api/create-checkout-url', ClerkExpressRequireAuth(), async (req: RequestWithAuth, res) => { // Fixed type
    try {
        const { planCode } = req.body;
        const userId = req.auth.userId;
        // ... your checkout logic
    } catch (error) { /* ... */ }
});

// Endpoint 4: The AI Uncle
app.post('/api/ask-uncle', ClerkExpressRequireAuth(), async (req: RequestWithAuth, res) => { // Fixed type
    try {
        const userId = req.auth.userId; // You now have access to this!
        const { question } = req.body;
        // ... your AI uncle logic
    } catch (error) { /* ... */ }
});

// --- START THE SERVER (for local dev only) ---
if (process.env.NODE_ENV !== 'production') {
    const port = 5001;
    const httpServer = createServer(app);
    httpServer.listen(port, () => {
        console.log(`✅ API server is running and listening on http://localhost:${port}`);
    });
}

export default app;