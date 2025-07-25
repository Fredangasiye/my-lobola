import 'dotenv/config'; // Loads .env file immediately
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { ClerkExpressWithAuth, ClerkExpressRequireAuth, clerkClient } from '@clerk/clerk-sdk-node';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { users, calculatorFormSchema } from './shared/schema';
import { eq } from 'drizzle-orm';
import { Paystack } from '@paystack/paystack-sdk';

// Safety check for all necessary keys
if (!process.env.DATABASE_URL || !process.env.PAYSTACK_SECRET_KEY || !process.env.OPENROUTER_API_KEY || !process.env.CLERK_SECRET_KEY || !process.env.CLERK_PUBLISHABLE_KEY) {
    console.error("FATAL ERROR: A key is missing in your .env file. Please check all keys.");
    process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);
const app = express();

app.use(cors({ origin: ['http://localhost:5173', 'https://your-production-app-url.vercel.app'], credentials: true })); // IMPORTANT: Add your Vercel URL here later
app.use(ClerkExpressWithAuth());
app.use(express.json());

// --- API ENDPOINTS ---

// Endpoint 1: The Lobola Calculator (Accepts POST requests)
app.post("/api/calculate", (req, res) => { /* ... your calculate logic ... */ });

// Endpoint 2: The User Subscription Status (Accepts GET requests)
app.get('/api/user/status', ClerkExpressRequireAuth(), async (req, res) => { /* ... your user status logic ... */ });

// Endpoint 3: The Paystack Checkout (Accepts POST requests)
app.post('/api/create-checkout-url', ClerkExpressRequireAuth(), async (req, res) => { /* ... your checkout logic ... */ });

// Endpoint 4: The AI Uncle (Accepts POST requests) <-- THIS IS THE FIX
app.post('/api/ask-uncle', ClerkExpressRequireAuth(), async (req, res) => {
    try {
        const { question } = req.body;
        const aiResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY!}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'mistralai/mistral-7b-instruct',
                messages: [ { role: 'system', content: `You are "Uncle Wisdom," a wise, respectful elder from South Africa providing guidance on lobola. You ONLY answer questions about lobola, family, and cultural traditions. If asked about anything else, you must politely decline.` }, { role: 'user', content: question } ]
            }),
        });
        if (!aiResponse.ok) { throw new Error("OpenRouter AI call failed"); }
        const aiData = await aiResponse.json();
        res.json({ answer: aiData.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: 'The elders are resting. Please try again.' });
    }
});

// --- START THE SERVER ---
const port = 5001;
const httpServer = createServer(app);
httpServer.listen(port, () => {
    console.log(`✅ API server is running and listening on http://localhost:${port}`);
});

export default app;