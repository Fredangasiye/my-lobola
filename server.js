import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Lobola calculation logic
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

const EDUCATION_BONUSES = {
  'high-school': 0,
  'diploma': 10000,
  'bachelor': 20000,
  'honours': 25000,
  'masters': 30000,
  'phd': 35000
};

const CAREER_BONUSES = {
  'student': 0,
  'unemployed': 0,
  'employed': 15000,
  'professional': 25000,
  'executive': 35000,
  'self-employed': 20000,
  'government': 22000
};

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

// API Routes
app.post('/api/calculate', (req, res) => {
  try {
    const { culturalGroup, education, employment, region = 'kwazulu-natal', age = 25 } = req.body;

    // Input validation
    if (!culturalGroup || !education || !employment) {
      return res.status(400).json({ error: 'Missing required fields: culturalGroup, education, employment' });
    }

    // Calculate base amount
    const baseAmount = BASE_AMOUNTS[culturalGroup] || BASE_AMOUNTS.other;
    
    // Calculate bonuses
    const educationBonus = EDUCATION_BONUSES[education] || 0;
    const careerBonus = CAREER_BONUSES[employment] || 0;
    
    // Regional adjustment
    const regionalMultiplier = REGIONAL_MULTIPLIERS[region] || 1.0;
    const regionalAdjustment = Math.round((baseAmount + educationBonus + careerBonus) * (regionalMultiplier - 1));
    
    // Cultural group bonus
    const culturalBonus = Math.round(baseAmount * 0.1);
    
    // Calculate total
    const total = baseAmount + educationBonus + careerBonus + regionalAdjustment + culturalBonus;
    
    // Format amount range
    const lowerBound = Math.round(total * 0.8);
    const upperBound = Math.round(total * 1.2);
    const amountRange = `R${lowerBound.toLocaleString()} - R${upperBound.toLocaleString()}`;

    // Get cultural insights
    const insights = CULTURAL_INSIGHTS[culturalGroup] || CULTURAL_INSIGHTS.default;

    const result = {
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

    res.json(result);
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Import and use the OpenRouter Uncle Wisdom endpoint
import uncleWisdomOpenRouter from './api/uncle-wisdom-openrouter.js';
app.post('/api/uncle-wisdom-openrouter', uncleWisdomOpenRouter);

// Serve React app for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});