import 'dotenv/config'; // THIS IS THE FIX FOR THE BACKEND. It loads your .env file.
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import cookieParser from 'cookie-parser';
import { drizzle, type NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { users, calculatorFormSchema } from '../shared/schema';
import { eq } from 'drizzle-orm';
import { Paystack } from '@paystack/paystack-sdk';
import { registerRoutes } from './routes.js';

// Gather required env vars
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'SUPABASE_SERVICE_KEY',
  'DATABASE_URL',
  'PAYSTACK_SECRET_KEY',
];
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

// Initialize app first so we can export even if misconfigured
const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : true
        : 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Add a simple health endpoint
// Health endpoint at both "/" and "/api" (useful locally and on Vercel)
app.get('/', (_req, res) => {
  if (missingEnvVars.length > 0) {
    return res.status(500).json({
      ok: false,
      status: 'misconfigured',
      missingEnvVars,
    });
  }
  return res.json({ ok: true, status: 'running' });
});
app.get('/api', (_req, res) => {
  if (missingEnvVars.length > 0) {
    return res.status(500).json({
      ok: false,
      status: 'misconfigured',
      missingEnvVars,
    });
  }
  return res.json({ ok: true, status: 'running' });
});

let supabase: SupabaseClient | null = null;
let db: NeonHttpDatabase | null = null;
let paystack: Paystack | null = null;

if (missingEnvVars.length === 0) {
  // Initialize Supabase and other services only when correctly configured
  const supabaseUrl = process.env.VITE_SUPABASE_URL!;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
  supabase = createClient(supabaseUrl, supabaseServiceKey);

  const sql = neon(process.env.DATABASE_URL!);
  db = drizzle(sql);

  paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!);

  // Register application routes
  registerRoutes(app);
} else {
  console.error('FATAL: Missing environment variables:', missingEnvVars);
  // When misconfigured, respond 500 for API calls instead of crashing process
  app.all('/*', (_req, res) => {
    res.status(500).json({
      ok: false,
      status: 'misconfigured',
      missingEnvVars,
    });
  });
}

// Only start a local server in non-Vercel environments
if (!process.env.VERCEL) {
  const port = process.env.PORT ? Number(process.env.PORT) : 5001;
  const httpServer = createServer(app);
  httpServer.listen(port, () => {
    console.log(`✅ API server is running and listening on http://localhost:${port}`);
  });
}

// Export a Vercel-compatible handler
export default function handler(req: any, res: any) {
  return (app as any)(req, res);
}