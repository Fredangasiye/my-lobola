import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { ClerkExpressWithAuth, ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import type { Request } from 'express'; // Import the standard Request type
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { users, calculatorFormSchema } from '../shared/schema'; // Corrected path
import { eq } from 'drizzle-orm';
import { Paystack } from '@paystack/paystack-sdk';

// Define a custom interface for Clerk's augmented request
interface RequestWithAuth extends Request {
  auth?: { userId?: string };
}

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!);
const app = express();

const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:5173';
app.use(cors({ origin: [vercelUrl, 'http://localhost:5173'], credentials: true }));
app.use(ClerkExpressWithAuth());
app.use(express.json());

// --- Use the custom interface for all secure routes ---
app.get('/api/user/status', ClerkExpressRequireAuth(), async (req: RequestWithAuth, res) => { /* ... */ });
app.post('/api/create-checkout-url', ClerkExpressRequireAuth(), async (req: RequestWithAuth, res) => { /* ... */ });
app.post('/api/ask-uncle', ClerkExpressRequireAuth(), async (req: RequestWithAuth, res) => { /* ... */ });

// --- Other routes ---
app.post("/api/calculate", (req, res) => { /* ... */ });

if (process.env.NODE_ENV !== 'production') {
  const port = 5001;
  createServer(app).listen(port, () => console.log(`API server running on http://localhost:${port}`));
}

export default app;