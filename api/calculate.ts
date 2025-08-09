import type { VercelRequest, VercelResponse } from '@vercel/node';

// Inline calculator to avoid build/import issues in serverless
function calculateLobola(data: any) {
  let baseAmount = 30000;
  let educationBonus = 0;
  let careerBonus = 0;
  let locationFactor = 0;

  switch (data.education) {
    case 'no-matric': educationBonus = 0; break;
    case 'matric': educationBonus = 5000; break;
    case 'diploma': educationBonus = 10000; break;
    case 'degree': educationBonus = 15000; break;
    case 'honours': educationBonus = 20000; break;
    case 'masters': educationBonus = 25000; break;
    case 'phd': educationBonus = 30000; break;
    case 'prefer-not-say': educationBonus = 10000; break;
  }

  switch (data.employment) {
    case 'employed': careerBonus = 10000; break;
    case 'self-employed': careerBonus = 15000; break;
    case 'student': careerBonus = 0; break;
    case 'unemployed': careerBonus = 0; break;
    case 'retired': careerBonus = 5000; break;
    case 'prefer-not-say': careerBonus = 5000; break;
  }

  switch (data.location) {
    case 'rural': locationFactor = 0; break;
    case 'township': locationFactor = 5000; break;
    case 'suburb': locationFactor = 10000; break;
    case 'city': locationFactor = 15000; break;
    default: locationFactor = 5000;
  }

  let incomeAdjustment = 0;
  if (data.income) {
    switch (data.income) {
      case 'under-5000': incomeAdjustment = -5000; break;
      case '5000-10000': incomeAdjustment = 0; break;
      case '10000-20000': incomeAdjustment = 5000; break;
      case '20000-35000': incomeAdjustment = 10000; break;
      case '35000-50000': incomeAdjustment = 15000; break;
      case '50000-plus': incomeAdjustment = 20000; break;
    }
  }

  let ageAdjustment = 0;
  if (data.age) {
    switch (data.age) {
      case '18-22': ageAdjustment = 5000; break;
      case '23-27': ageAdjustment = 3000; break;
      case '28-32': ageAdjustment = 0; break;
      case '33-37': ageAdjustment = -3000; break;
      case '38-plus': ageAdjustment = -5000; break;
    }
  }

  let socialStandingAdjustment = 0;
  if (data.socialStanding) {
    switch (data.socialStanding) {
      case 'working-class': socialStandingAdjustment = 0; break;
      case 'middle-class': socialStandingAdjustment = 8000; break;
      case 'upper-middle-class': socialStandingAdjustment = 15000; break;
      case 'prominent-family': socialStandingAdjustment = 25000; break;
      case 'traditional-leaders': socialStandingAdjustment = 35000; break;
    }
  }

  let childrenAdjustment = 0;
  if (data.numberOfChildren) {
    switch (data.numberOfChildren) {
      case 'none': childrenAdjustment = 5000; break;
      case 'one': childrenAdjustment = -2000; break;
      case 'two': childrenAdjustment = -5000; break;
      case 'three': childrenAdjustment = -8000; break;
      case 'four-plus': childrenAdjustment = -12000; break;
    }
  }

  let virginityAdjustment = 0;
  if (data.virginityStatus) {
    switch (data.virginityStatus) {
      case 'yes': virginityAdjustment = 8000; break;
      case 'no': virginityAdjustment = 0; break;
    }
  }

  const totalLower = Math.max(
    15000,
    baseAmount + educationBonus + careerBonus + locationFactor + incomeAdjustment + ageAdjustment + socialStandingAdjustment + childrenAdjustment + virginityAdjustment
  );
  const totalUpper = totalLower + 20000;

  const pricePerCow = 15000;
  const lowerCows = Math.round((totalLower / pricePerCow) * 10) / 10;
  const upperCows = Math.round((totalUpper / pricePerCow) * 10) / 10;

  return {
    amount: `R${totalLower.toLocaleString()} - R${totalUpper.toLocaleString()}`,
    breakdown: { base: baseAmount, education: educationBonus, career: careerBonus, location: locationFactor, total: { lower: totalLower, upper: totalUpper } },
    cowEquivalent: { lowerCows, upperCows, pricePerCow, displayText: `${lowerCows} - ${upperCows} cattle` },
    insights: { title: 'General', description: '', culturalNotes: [], negotiationTips: [] },
  };
}

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

