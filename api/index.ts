import 'dotenv/config';
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

// This interface is a helper to tell TypeScript about our user object
interface RequestWithUser extends express.Request {
  user?: any;
}

const app = express();
const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// --- The New Supabase Security Guard ---
const requireAuth = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
  const token = req.cookies['sb-access-token'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthenticated' });
  }
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  req.user = user;
  next();
};

// --- API Endpoints ---
app.post("/api/calculate", (req, res) => { /* Your calculate logic here */ });

app.get('/api/user/status', requireAuth, async (req: RequestWithUser, res) => {
  try {
    const userId = req.user.id;
    let userResult = await db.select().from(users).where(eq(users.id, userId));
    if (userResult.length === 0) {
      const newUser = await db.insert(users).values({ id: userId }).returning();
      userResult = newUser;
    }
    res.json(userResult[0]);
  } catch (error) { res.status(500).json({ error: "Could not fetch user status." }); }
});

app.post('/api/create-checkout-url', requireAuth, async (req: RequestWithUser, res) => {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;
    const { planCode } = req.body;
    const response = await paystack.transaction.initialize({ email: userEmail, amount: '0', plan: planCode, metadata: { userId } });
    res.json({ url: response.data.authorization_url });
  } catch (error) { res.status(500).json({ error: "Could not initiate payment." }); }
});

app.post('/api/ask-uncle', requireAuth, async (req: RequestWithUser, res) => {
    // ... your AI Uncle logic here ...
});

// --- START THE SERVER (for local dev only) ---
if (process.env.NODE_ENV !== 'production') {
    const port = 5001;
    createServer(app).listen(port, () => console.log(`✅ API server running on http://localhost:${port}`));
}

export default app;