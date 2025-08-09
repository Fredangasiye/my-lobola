import type { VercelRequest, VercelResponse } from '@vercel/node';
import { calculateLobola } from '../shared/calculator';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }
  try {
    let payload: any = req.body ?? {};
    if (typeof payload === 'string') {
      try { payload = JSON.parse(payload); } catch { payload = {}; }
    }
    const input = {
      culturalGroup: payload.culturalGroup,
      education: payload.education,
      employment: payload.employment,
      familyType: payload.familyType,
      location: payload.location,
      income: payload.income,
      age: payload.age,
      socialStanding: payload.socialStanding,
      numberOfChildren: payload.numberOfChildren,
      virginityStatus: payload.virginityStatus,
    } as any;
    if (!input.culturalGroup || !input.education || !input.employment) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const result = calculateLobola(input);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err?.message ?? 'Invalid request' });
  }
}

