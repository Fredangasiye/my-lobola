export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { culturalGroup, education, employment } = req.body;
    
    if (!culturalGroup || !education || !employment) {
      return res.status(400).json({ error: 'Missing required fields: culturalGroup, education, employment' });
    }

    // Calculate lobola using embedded logic
    const result = calculateLobola(req.body);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({ error: 'Calculation failed' });
  }
}

function calculateLobola(data) {
  let baseAmount = 30000;
  let educationBonus = 0;
  let careerBonus = 0;
  let locationFactor = 5000; // default

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

  const totalLower = Math.max(15000, baseAmount + educationBonus + careerBonus + locationFactor);
  const totalUpper = totalLower + 20000;

  const pricePerCow = 15000;
  const lowerCows = Math.round((totalLower / pricePerCow) * 10) / 10;
  const upperCows = Math.round((totalUpper / pricePerCow) * 10) / 10;

  const insights = getCulturalInsights(data.culturalGroup);

  return {
    amount: `R${totalLower.toLocaleString()} - R${totalUpper.toLocaleString()}`,
    breakdown: {
      base: baseAmount,
      education: educationBonus,
      career: careerBonus,
      location: locationFactor,
      total: { lower: totalLower, upper: totalUpper },
    },
    cowEquivalent: {
      lowerCows,
      upperCows,
      pricePerCow,
      displayText: `${lowerCows} - ${upperCows} cattle`,
    },
    insights,
  };
}

function getCulturalInsights(culturalGroup) {
  const insights = {
    zulu: {
      title: 'Zulu Traditions',
      description: "In Zulu culture, lobola represents respect and appreciation for the bride's family. The amount traditionally reflects the groom's ability to provide and his commitment to the union.",
      culturalNotes: [
        'Lobola negotiations often involve cattle, with each cow representing value and respect',
        'The process strengthens relationships between families',
        'Traditional ceremonies accompany lobola discussions',
        'Umabo ceremony follows the lobola negotiations',
      ],
      negotiationTips: [
        'Approach discussions with respect and humility',
        'Include family elders in negotiations',
        "Consider both families' circumstances",
        'Focus on building relationships, not just amounts',
      ],
    },
    xhosa: {
      title: 'Xhosa Traditions',
      description: 'Xhosa lobola practices emphasize the importance of family unity and respect. The negotiations are seen as a way to bring two families together in harmony.',
      culturalNotes: [
        'Lobola is viewed as compensation for raising the bride',
        'Traditional ceremonies mark different stages of the process',
        'Community elders play important advisory roles',
        'Ukuthwala and other customs may be involved',
      ],
      negotiationTips: [
        'Respect traditional protocols and customs',
        'Engage with community elders for guidance',
        "Consider the bride's education and accomplishments",
        'Maintain open and honest communication',
      ],
    },
  };

  return insights[culturalGroup] || {
    title: 'General South African Traditions',
    description: 'Across South African cultures, lobola serves as a bridge between families, showing respect for traditions while adapting to modern circumstances.',
    culturalNotes: [
      'Each cultural group has unique traditions and customs',
      'Modern considerations often blend with traditional values',
      'Education and career achievements are increasingly valued',
      'Community participation varies by cultural group',
    ],
    negotiationTips: [
      'Research your specific cultural traditions',
      'Consult with cultural elders and advisors',
      'Balance traditional values with modern realities',
      'Focus on mutual respect and understanding',
    ],
  };
}