import type { VercelRequest, VercelResponse } from '@vercel/node';

interface CalculationInput {
  culturalGroup: string;
  education: string;
  employment: string;
  region?: string;
  age?: number;
}

interface CalculationResult {
  amount: string;
  breakdown: {
    base: number;
    education: number;
    career: number;
    cultural: number;
    regional: number;
  };
  insights: {
    title: string;
    description: string;
    traditions: string[];
    modernConsiderations: string[];
  };
}

// Base amounts by cultural group (in Rands)
const BASE_AMOUNTS = {
  zulu: 50000,
  xhosa: 45000,
  sotho: 40000,
  tswana: 42000,
  venda: 35000,
  tsonga: 38000,
  ndebele: 40000,
  swazi: 48000,
  pedi: 38000,
  other: 40000
};

// Education multipliers
const EDUCATION_BONUSES = {
  'high-school': 0,
  'diploma': 10000,
  'bachelor': 20000,
  'honours': 25000,
  'masters': 30000,
  'phd': 35000
};

// Career bonuses
const CAREER_BONUSES = {
  'student': 0,
  'unemployed': 0,
  'employed': 15000,
  'professional': 25000,
  'executive': 35000,
  'self-employed': 20000,
  'government': 22000
};

// Regional adjustments
const REGIONAL_MULTIPLIERS = {
  'gauteng': 1.3,
  'western-cape': 1.25,
  'kwazulu-natal': 1.0,
  'eastern-cape': 0.85,
  'free-state': 0.9,
  'limpopo': 0.8,
  'mpumalanga': 0.85,
  'north-west': 0.9,
  'northern-cape': 0.8
};

// Cultural insights by group
const CULTURAL_INSIGHTS = {
  zulu: {
    title: "Ukuthwala - Zulu Lobola Tradition",
    description: "In Zulu culture, lobola represents respect and appreciation for the bride's family. It's a sacred covenant that binds two families together.",
    traditions: [
      "Cattle were traditionally the primary form of lobola payment",
      "The groom's family presents gifts to show serious intentions",
      "Negotiations involve extended family members and elders",
      "The process can take several meetings to complete"
    ],
    modernConsiderations: [
      "Cash payments are now commonly accepted alongside cattle",
      "Education and career achievements influence the amount",
      "Both families work together to find a fair arrangement",
      "The focus remains on respect and family unity"
    ]
  },
  xhosa: {
    title: "Ubuntu - Xhosa Dowry Customs",
    description: "Xhosa lobola embodies Ubuntu - the belief that we are all connected. It's about building relationships between families.",
    traditions: [
      "Negotiations begin with the 'opener of the mouth' ceremony",
      "Cattle remain an important symbol of wealth and respect",
      "The bride's family guides the negotiation process",
      "Traditional beer is shared to seal agreements"
    ],
    modernConsiderations: [
      "Modern Xhosa families adapt amounts to contemporary circumstances",
      "Professional achievements are highly valued",
      "Payment plans are often arranged for convenience",
      "Cultural ceremonies remain central to the process"
    ]
  },
  default: {
    title: "Traditional Lobola Calculation",
    description: "Lobola is a beautiful African tradition that honors both families and creates lasting bonds.",
    traditions: [
      "Represents appreciation for raising the bride",
      "Involves negotiation between families",
      "Creates formal relationship between families",
      "Includes ceremonial elements and celebrations"
    ],
    modernConsiderations: [
      "Amounts adapted to modern economic realities",
      "Education and career valued highly",
      "Flexible payment arrangements common",
      "Balance between tradition and practicality"
    ]
  }
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { culturalGroup, education, employment, region = 'kwazulu-natal', age = 25 }: CalculationInput = req.body;

    // Input validation
    if (!culturalGroup || !education || !employment) {
      res.status(400).json({ error: 'Missing required fields: culturalGroup, education, employment' });
      return;
    }

    // Calculate base amount
    const baseAmount = BASE_AMOUNTS[culturalGroup as keyof typeof BASE_AMOUNTS] || BASE_AMOUNTS.other;
    
    // Calculate bonuses
    const educationBonus = EDUCATION_BONUSES[education as keyof typeof EDUCATION_BONUSES] || 0;
    const careerBonus = CAREER_BONUSES[employment as keyof typeof CAREER_BONUSES] || 0;
    
    // Regional adjustment
    const regionalMultiplier = REGIONAL_MULTIPLIERS[region as keyof typeof REGIONAL_MULTIPLIERS] || 1.0;
    const regionalAdjustment = Math.round((baseAmount + educationBonus + careerBonus) * (regionalMultiplier - 1));
    
    // Cultural group bonus (additional respect for certain achievements)
    const culturalBonus = Math.round(baseAmount * 0.1);
    
    // Calculate total
    const total = baseAmount + educationBonus + careerBonus + regionalAdjustment + culturalBonus;
    
    // Format amount range
    const lowerBound = Math.round(total * 0.8);
    const upperBound = Math.round(total * 1.2);
    const amountRange = `R${lowerBound.toLocaleString()} - R${upperBound.toLocaleString()}`;

    // Get cultural insights
    const insights = CULTURAL_INSIGHTS[culturalGroup as keyof typeof CULTURAL_INSIGHTS] || CULTURAL_INSIGHTS.default;

    const result: CalculationResult = {
      amount: amountRange,
      breakdown: {
        base: baseAmount,
        education: educationBonus,
        career: careerBonus,
        cultural: culturalBonus,
        regional: regionalAdjustment
      },
      insights
    };

    res.status(200).json(result);
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}