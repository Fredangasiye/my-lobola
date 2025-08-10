import 'dotenv/config';
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
import { registerRoutes } from './routes';

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

app.get('/', (_req, res) => {
  return res.json({ ok: true, status: 'running' });
});
app.get('/api', (_req, res) => {
  return res.json({ ok: true, status: 'running' });
});

let supabase: SupabaseClient | null = null;
let db: NeonHttpDatabase | null = null;
let paystack: Paystack | null = null;

try {
  if (process.env.VITE_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
    supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  }
  if (process.env.DATABASE_URL) {
    const sql = neon(process.env.DATABASE_URL);
    db = drizzle(sql);
  }
  if (process.env.PAYSTACK_SECRET_KEY) {
    paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);
  }
} catch (e) {
  console.error('Service initialization failed:', e);
}

registerRoutes(app);

const port = process.env.PORT ? Number(process.env.PORT) : 5001;
const httpServer = createServer(app);
httpServer.listen(port, () => {
  console.log(`✅ API server is running and listening on http://localhost:${port}`);
});

