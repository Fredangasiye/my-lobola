import { calculateLobola } from '../shared/calculator.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { culturalGroup, education, employment } = req.body;
    
    if (!culturalGroup || !education || !employment) {
      return res.status(400).json({ error: 'Missing required fields: culturalGroup, education, employment' });
    }

    // Use the actual calculator logic
    const result = calculateLobola(req.body);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({ error: 'Calculation failed' });
  }
}