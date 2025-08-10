// Simple Vercel API route
export default function handler(req, res) {
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
    const { culturalGroup, education, employment } = req.body;

    // Simple calculation logic
    const baseAmounts = {
      zulu: 50000, xhosa: 45000, sotho: 40000, tswana: 42000,
      venda: 35000, tsonga: 38000, ndebele: 40000, swazi: 48000,
      pedi: 38000, other: 40000
    };

    const educationBonuses = {
      'high-school': 0, 'diploma': 10000, 'bachelor': 20000,
      'honours': 25000, 'masters': 30000, 'phd': 35000
    };

    const careerBonuses = {
      'student': 0, 'unemployed': 0, 'employed': 15000,
      'professional': 25000, 'executive': 35000,
      'self-employed': 20000, 'government': 22000
    };

    const base = baseAmounts[culturalGroup] || baseAmounts.other;
    const eduBonus = educationBonuses[education] || 0;
    const careerBonus = careerBonuses[employment] || 0;
    const total = base + eduBonus + careerBonus;
    
    const result = {
      amount: `R${Math.round(total * 0.8).toLocaleString()} - R${Math.round(total * 1.2).toLocaleString()}`,
      breakdown: { base, education: eduBonus, career: careerBonus, cultural: 0, regional: 0 },
      insights: {
        title: `${culturalGroup.charAt(0).toUpperCase() + culturalGroup.slice(1)} Lobola Tradition`,
        description: "Traditional lobola calculation based on cultural values and modern considerations.",
        traditions: ["Represents respect for the bride's family", "Creates bonds between families"],
        modernConsiderations: ["Education and career are highly valued", "Flexible payment arrangements"]
      }
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Calculation failed' });
  }
}