import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import cookieParser from 'cookie-parser';

// (Your other imports like drizzle, neon, schema, paystack)
// ...

const app = express();
const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// --- The New Supabase Security Guard ---
const requireAuth = async (req, res, next) => {
  const token = req.cookies['sb-access-token']; // Default Supabase cookie name
  if (!token) {
    return res.status(401).json({ error: 'Unauthenticated' });
  }
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  req.user = user; // Attach user to the request
  next();
};

// --- API Endpoints, now protected by our new guard ---
app.get('/api/user/status', requireAuth, async (req, res) => { /* ... */ });
app.post('/api/create-checkout-url', requireAuth, async (req, res) => { /* ... */ });
app.post('/api/ask-uncle', requireAuth, async (req, res) => { /* ... */ });
app.post("/api/calculate", (req, res) => { /* ... */ });

// --- Start the Server ---
const port = 5001;
const httpServer = createServer(app);
httpServer.listen(port, () => console.log(`✅ API server running on http://localhost:${port}`));

export default app;