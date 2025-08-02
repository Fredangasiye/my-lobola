import 'dotenv/config'; // THIS IS THE FIX FOR THE BACKEND. It loads your .env file.
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import cookieParser from 'cookie-parser';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { users, calculatorFormSchema } from '../shared/schema';
import { eq } from 'drizzle-orm';
import { Paystack } from '@paystack/paystack-sdk';
import { registerRoutes } from './routes';

// Safety check now works because .env is loaded first
if (!process.env.VITE_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error("FATAL ERROR: A Supabase key is missing in your .env file for the backend server.");
    console.error("Required environment variables:");
    console.error("- VITE_SUPABASE_URL");
    console.error("- SUPABASE_SERVICE_KEY");
    console.error("- DATABASE_URL");
    console.error("- PAYSTACK_SECRET_KEY");
    process.exit(1);
}

// Initialize Supabase for the backend
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);
const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!);
const app = express();

app.use(cors({ 
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : true
    : 'http://localhost:5173', 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

// The Supabase Security Guard
const requireAuth = async (req: any, res: any, next: any) => { /* ... your logic ... */ };

// --- API Endpoints ---
app.get('/api/user/status', requireAuth, async (req: any, res: any) => { /* ... your logic ... */ });
app.post('/api/create-checkout-url', requireAuth, async (req: any, res: any) => { /* ... your logic ... */ });
app.post('/api/ask-uncle', requireAuth, async (req: any, res: any) => { /* ... your logic ... */ });

// Register the main routes
registerRoutes(app);

const port = 5001;
const httpServer = createServer(app);
httpServer.listen(port, () => {
    console.log(`✅ API server is running and listening on http://localhost:${port}`);
});

export default app;