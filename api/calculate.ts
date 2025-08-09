import type { VercelRequest, VercelResponse } from '@vercel/node';
import { calculatorFormSchema } from '../shared/schema';
import { calculateLobola } from '../shared/calculator';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  try {
    const parsed = calculatorFormSchema.parse(req.body ?? {});
    const result = calculateLobola(parsed as any);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err?.message ?? 'Invalid request' });
  }
}

