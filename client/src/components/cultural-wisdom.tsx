import { useState } from "react";
import { MessageCircle, Heart, Lightbulb, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- YOUR ORIGINAL, DETAILED WISDOM DATA ---
const wisdomMessages = {
  zulu: [
    { id: "zulu-1", category: "tradition", title: "Ubuntu Philosophy", message: "Remember, umuntu ngumuntu ngabantu - a person is a person through other people. Lobola is not a transaction, but a joining of families.", icon: Users },
    { id: "zulu-2", category: "respect", title: "Respect for Elders", message: "Always approach the bride's father and uncles with respect. Say 'Sawubona baba' and listen more than you speak.", icon: Heart },
    { id: "zulu-3", category: "negotiation", title: "Patience in Negotiations", message: "Do not rush the process. Good things take time, like brewing traditional beer. Let discussions flow naturally.", icon: Lightbulb },
    { id: "zulu-4", category: "culture", title: "Zulu Cattle Tradition", message: "In Zulu culture, cattle represent wealth and respect. The number of cattle reflects the value placed on the bride's family and her upbringing.", icon: Users },
    { id: "zulu-5", category: "family", title: "Inkosi Yomndeni", message: "The head of the family (inkosi yomndeni) must be present during negotiations. This shows respect for the family hierarchy and traditions.", icon: Heart },
    { id: "zulu-6", category: "modern", title: "Modern Zulu Lobola", message: "While we honor tradition, modern Zulu families often accept a combination of cattle and money. The spirit of the tradition matters more than the form.", icon: Lightbulb }
  ],
  xhosa: [
    { id: "xhosa-1", category: "tradition", title: "Ukuthwala Tradition", message: "Lobola shows that you value the bride and her family. It's about showing serious intentions, not buying a person.", icon: Heart },
    { id: "xhosa-2", category: "relationships", title: "Family Unity", message: "Remember, you're not just marrying her - you're joining her family. Build relationships with her siblings and cousins too.", icon: Users },
    { id: "xhosa-3", category: "negotiation", title: "Respectful Communication", message: "Speak with humility. Say 'Ndicela ukuthetha nawe tata' (May I speak with you, father) before beginning discussions.", icon: MessageCircle },
    { id: "xhosa-4", category: "culture", title: "Xhosa Initiation", message: "In Xhosa culture, both the groom and bride should have completed their initiation rites (ulwaluko for men, intonjane for women) before lobola discussions.", icon: Users },
    { id: "xhosa-5", category: "family", title: "Amakhaya Tradition", message: "The amakhaya (home people) must be consulted. This includes extended family members who have a say in family matters.", icon: Heart },
    { id: "xhosa-6", category: "modern", title: "Contemporary Xhosa Values", message: "Modern Xhosa families value education and career achievements. These are considered alongside traditional cattle payments.", icon: Lightbulb }
  ],
  sotho: [
    { id: "sotho-1", category: "tradition", title: "Sesotho Respect", message: "In Sesotho culture, respect (tlotlo) is fundamental. Show respect through your words, actions, and the gifts you bring.", icon: Heart },
    { id: "sotho-2", category: "family", title: "Family Consultation", message: "The entire family must be consulted, not just the immediate family. This includes grandparents, aunts, and uncles.", icon: Users },
    { id: "sotho-3", category: "negotiation", title: "Patient Discussion", message: "Sesotho negotiations are unhurried. Take time to build relationships and show genuine interest in the family.", icon: MessageCircle },
    { id: "sotho-4", category: "culture", title: "Cattle and Money", message: "Traditional Sesotho lobola includes both cattle and money (madi). The combination shows respect for both tradition and modern needs.", icon: Users },
    { id: "sotho-5", category: "values", title: "Community Values", message: "Sesotho culture emphasizes community. Your marriage affects not just two families, but the entire community.", icon: Heart },
    { id: "sotho-6", category: "modern", title: "Modern Sesotho Approach", message: "Contemporary Sesotho families appreciate when grooms show understanding of both traditional and modern values.", icon: Lightbulb }
  ],
  tswana: [
    { id: "tswana-1", category: "tradition", title: "Setswana Hospitality", message: "Setswana culture values hospitality (botho). Show respect by accepting food and drink offered during negotiations.", icon: Heart },
    { id: "tswana-2", category: "family", title: "Extended Family", message: "In Setswana culture, the extended family plays a crucial role. Include grandparents and family elders in discussions.", icon: Users },
    { id: "tswana-3", category: "negotiation", title: "Respectful Approach", message: "Approach with humility and patience. Setswana negotiations are about building lasting relationships.", icon: MessageCircle },
    { id: "tswana-4", category: "culture", title: "Traditional Gifts", message: "Traditional Setswana lobola includes cattle, blankets, and other gifts. Each item has cultural significance.", icon: Users },
    { id: "tswana-5", category: "values", title: "Community Harmony", message: "Setswana culture emphasizes harmony (kagisano). Your marriage should bring peace and unity to both families.", icon: Heart },
    { id: "tswana-6", category: "modern", title: "Contemporary Setswana", message: "Modern Setswana families value education and career success. Show how you can provide for the family.", icon: Lightbulb }
  ],
  venda: [
    { id: "venda-1", category: "tradition", title: "Venda Customs", message: "Venda culture has unique customs. Learn about them from the bride's family and show respect for their traditions.", icon: Heart },
    { id: "venda-2", category: "family", title: "Family Structure", message: "Venda families have specific roles for different family members. Understand who should be approached first.", icon: Users },
    { id: "venda-3", category: "negotiation", title: "Cultural Sensitivity", message: "Be sensitive to Venda cultural practices. Ask questions respectfully and show willingness to learn.", icon: MessageCircle },
    { id: "venda-4", category: "culture", title: "Traditional Practices", message: "Venda lobola traditions may include specific rituals and ceremonies. Be prepared to participate respectfully.", icon: Users },
    { id: "venda-5", category: "values", title: "Respect for Elders", message: "Venda culture deeply respects elders. Always show deference to older family members.", icon: Heart },
    { id: "venda-6", category: "modern", title: "Modern Venda", message: "Contemporary Venda families balance tradition with modern life. Show appreciation for both aspects.", icon: Lightbulb }
  ],
  tsonga: [
    { id: "tsonga-1", category: "tradition", title: "Tsonga Heritage", message: "Tsonga culture has rich traditions. Show respect by learning about their customs and history.", icon: Heart },
    { id: "tsonga-2", category: "family", title: "Family Dynamics", message: "Tsonga families have specific ways of making decisions. Understand the family structure before approaching.", icon: Users },
    { id: "tsonga-3", category: "negotiation", title: "Cultural Approach", message: "Approach Tsonga families with cultural awareness. Show that you've taken time to understand their traditions.", icon: MessageCircle },
    { id: "tsonga-4", category: "culture", title: "Traditional Values", message: "Tsonga lobola traditions reflect their cultural values. Each aspect has meaning and significance.", icon: Users },
    { id: "tsonga-5", category: "values", title: "Community Respect", message: "Tsonga culture values community. Your marriage will be part of the larger community fabric.", icon: Heart },
    { id: "tsonga-6", category: "modern", title: "Contemporary Tsonga", message: "Modern Tsonga families appreciate when grooms show understanding of both tradition and progress.", icon: Lightbulb }
  ],
  ndebele: [
    { id: "ndebele-1", category: "tradition", title: "Ndebele Culture", message: "Ndebele culture has distinctive traditions. Show respect by learning about their unique customs and practices.", icon: Heart },
    { id: "ndebele-2", category: "family", title: "Family Traditions", message: "Ndebele families have specific ways of handling marriage negotiations. Learn about their family structure.", icon: Users },
    { id: "ndebele-3", category: "negotiation", title: "Cultural Sensitivity", message: "Be culturally sensitive when approaching Ndebele families. Show respect for their traditions.", icon: MessageCircle },
    { id: "ndebele-4", category: "culture", title: "Traditional Practices", message: "Ndebele lobola traditions may include specific ceremonies. Be prepared to participate with respect.", icon: Users },
    { id: "ndebele-5", category: "values", title: "Cultural Pride", message: "Ndebele people take pride in their culture. Show appreciation for their heritage and traditions.", icon: Heart },
    { id: "ndebele-6", category: "modern", title: "Modern Ndebele", message: "Contemporary Ndebele families value both tradition and modern achievements.", icon: Lightbulb }
  ],
  default: [
    { id: "general-1", category: "respect", title: "Listen to Your Elders", message: "Your parents and uncles have wisdom from experience. Their guidance comes from love and knowledge of traditions.", icon: Users },
    { id: "general-2", category: "relationships", title: "Communication is Key", message: "Keep talking with your partner throughout this process. Make sure you're both comfortable with the arrangements.", icon: MessageCircle },
    { id: "general-3", category: "tradition", title: "Honor Both Families", message: "Remember that this process should bring families together, not drive them apart. Seek understanding and compromise.", icon: Heart },
    { id: "general-4", category: "culture", title: "Learn the Culture", message: "Take time to learn about your partner's cultural background. Understanding traditions shows respect and commitment.", icon: Users },
    { id: "general-5", category: "family", title: "Family Involvement", message: "Include both families in the process. This creates unity and shows respect for everyone involved.", icon: Heart },
    { id: "general-6", category: "modern", title: "Modern Traditions", message: "Many families blend traditional and modern approaches. Be open to different ways of honoring traditions.", icon: Lightbulb }
  ]
};
// --- END OF YOUR DATA ---

export default function CulturalWisdom({ culturalGroup }) {
  // Safely get the selected cultural group, defaulting if necessary
  const group = culturalGroup ? culturalGroup.toLowerCase() : 'default';
  const wisdomList = wisdomMessages[group] || wisdomMessages.default;

  // Use state to show one piece of wisdom at a time
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextWisdom = () => {
    // Cycle through the wisdom messages for the selected group
    setCurrentIndex((prevIndex) => (prevIndex + 1) % wisdomList.length);
  };

  const currentWisdom = wisdomList[currentIndex];
  const IconComponent = currentWisdom.icon;

  return (
    <Card className="mt-8 bg-secondary border-secondary-foreground/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-primary" />
          Words of Wisdom
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4 p-4 rounded-lg bg-background min-h-[120px]">
          <IconComponent className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-lg">{currentWisdom.title}</p>
            <p className="text-muted-foreground italic">"{currentWisdom.message}"</p>
            <Badge variant="outline" className="mt-2">{currentWisdom.category}</Badge>
          </div>
        </div>
        {wisdomList.length > 1 && (
          <button onClick={showNextWisdom} className="mt-4 w-full text-sm text-primary hover:underline">
            Show More Wisdom
          </button>
        )}
      </CardContent>
    </Card>
  );
}