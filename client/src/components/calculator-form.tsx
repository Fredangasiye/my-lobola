import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { calculatorFormSchema, type CalculationResult } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Users, Home, GraduationCap, User, Info, Calculator, Globe, Loader2 } from "lucide-react";
import { useTranslationContext } from "@/lib/translation-context";

// Comprehensive form data
const languages = ["English", "isiZulu", "isiXhosa", "Sesotho", "Setswana", "Tshivenda", "Xitsonga", "isiNdebele", "siSwati"];
const culturalGroups = ["zulu", "xhosa", "pedi", "tswana", "sotho", "venda", "tsonga", "ndebele", "swazi"];
const educationLevels = ["no-matric", "matric", "diploma", "degree", "honours", "masters", "phd", "prefer-not-say"];
const employmentOptions = ["employed", "self-employed", "student", "unemployed", "retired", "prefer-not-say"];
const familyTypes = ["nuclear", "extended"];
const locationTypes = ["rural", "township", "suburb", "city-center"];
const incomeRanges = ["under-5000", "5000-10000", "10000-20000", "20000-35000", "35000-50000", "50000-75000", "over-75000", "prefer-not-say"];
const ageRanges = ["18-25", "26-30", "31-35", "36-40", "41-45", "46-50", "over-50"];
const socialStandings = ["lower", "middle", "upper-middle", "upper", "prefer-not-say"];
const childrenCounts = ["0", "1", "2", "3", "4", "5+"];
const virginityStatuses = ["virgin", "not-virgin", "prefer-not-say"];

interface CalculatorFormProps {
  onCalculationComplete: (results: CalculationResult) => void;
  onCulturalGroupChange: (group: string) => void;
}

export default function CalculatorForm({ onCalculationComplete, onCulturalGroupChange }: CalculatorFormProps) {
  const { toast } = useToast();
  const { t } = useTranslationContext();
  
  // Uncle Wisdom state
  const [uncleWisdomQuestion, setUncleWisdomQuestion] = useState("");
  const [uncleWisdomAnswer, setUncleWisdomAnswer] = useState("");
  const [uncleWisdomLoading, setUncleWisdomLoading] = useState(false);
  const [askedQuestion, setAskedQuestion] = useState("");
  const [freeAnswersUsed, setFreeAnswersUsed] = useState(0);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(calculatorFormSchema),
    defaultValues: {
      culturalGroup: "",
      education: "",
      employment: "",
      familyType: "",
      locationType: "",
      incomeRange: "",
      age: "",
      socialStanding: "",
      childrenCount: "",
      virginityStatus: "",
      language: "English",
    },
  });

  const mutation = useMutation({
    mutationFn: (formData: any) =>
      fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then((res) => {
        if (!res.ok) throw new Error("Calculation failed");
        return res.json();
      }),
    onSuccess: (data) => {
      onCalculationComplete(data);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Could not complete the calculation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  };

  // Uncle Wisdom API call
  const askUncleWisdom = async () => {
    if (!uncleWisdomQuestion.trim()) return;
    
    // Check free answer limit
    if (freeAnswersUsed >= 1) {
      setShowUpgradePrompt(true);
      return;
    }
    
    setUncleWisdomLoading(true);
    setAskedQuestion(uncleWisdomQuestion);
    
    try {
      const response = await fetch('/api/uncle-wisdom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: uncleWisdomQuestion,
          culturalGroup: form.getValues('culturalGroup')
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get wisdom');
      }

      const data = await response.json();
      setUncleWisdomAnswer(data.answer);
      setUncleWisdomQuestion("");
      setFreeAnswersUsed(prev => prev + 1);
    } catch (error) {
      console.error('Uncle Wisdom Error:', error);
      setUncleWisdomAnswer("Thank you for your question! As Uncle Wisdom, I remind you that lobola traditions are deeply personal and should be discussed with family elders and cultural advisors. This tool is meant to start conversations, not replace them.");
    } finally {
      setUncleWisdomLoading(false);
    }
  };

  // Helper function to get translated option text
  const getOptionText = (key: string, value: string) => {
    const optionMap: Record<string, Record<string, string>> = {
      familyType: {
        nuclear: t.nuclear,
        extended: t.extended,
      },
      locationType: {
        rural: t.rural,
        township: t.township,
        suburb: t.suburb,
        "city-center": t.cityCenter,
      },
      education: {
        "no-matric": t.noMatric,
        matric: t.matric,
        diploma: t.diploma,
        degree: t.degree,
        honours: t.honours,
        masters: t.masters,
        phd: t.phd,
        "prefer-not-say": t.preferNotSay,
      },
      employment: {
        employed: t.employed,
        "self-employed": t.selfEmployed,
        student: t.student,
        unemployed: t.unemployed,
        retired: t.retired,
        "prefer-not-say": t.preferNotSay,
      },
      incomeRange: {
        "under-5000": t.under5000,
        "5000-10000": t.fiveToTenThousand,
        "10000-20000": t.tenToTwentyThousand,
        "20000-35000": t.twentyToThirtyFiveThousand,
        "35000-50000": t.thirtyFiveToFiftyThousand,
        "50000-75000": t.fiftyToSeventyFiveThousand,
        "over-75000": t.overSeventyFiveThousand,
        "prefer-not-say": t.preferNotSay,
      },
      age: {
        "18-25": t.eighteenToTwentyFive,
        "26-30": t.twentySixToThirty,
        "31-35": t.thirtyOneToThirtyFive,
        "36-40": t.thirtySixToForty,
        "41-45": t.fortyOneToFortyFive,
        "46-50": t.fortySixToFifty,
        "over-50": t.overFifty,
      },
      socialStanding: {
        lower: t.lower,
        middle: t.middle,
        "upper-middle": t.upperMiddle,
        upper: t.upper,
        "prefer-not-say": t.preferNotSay,
      },
      childrenCount: {
        "0": t.zero,
        "1": t.one,
        "2": t.two,
        "3": t.three,
        "4": t.four,
        "5+": t.fivePlus,
      },
      virginityStatus: {
        virgin: t.virgin,
        "not-virgin": t.notVirgin,
        "prefer-not-say": t.preferNotSay,
      },
    };
    
    return optionMap[key]?.[value] || value;
  };

  return (
    <div className="space-y-6">
      {/* Main Form Grid - 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1: Main Form Inputs */}
        <div className="space-y-6">
          {/* Cultural Heritage Card */}
          <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{t.bridesCulturalHeritage}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.culturalGroup}</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...form.register("culturalGroup")}
                  onChange={(e) => {
                    form.setValue("culturalGroup", e.target.value);
                    onCulturalGroupChange(e.target.value);
                  }}
                >
                  <option value="">{t.selectCulturalGroup}</option>
                  {culturalGroups.map(group => (
                    <option key={group} value={group}>
                      {group.charAt(0).toUpperCase() + group.slice(1)}
                    </option>
                  ))}
                </select>
                {form.formState.errors.culturalGroup && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.culturalGroup.message}</p>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {t.culturalGroupsDescription}
              </p>
            </div>
          </div>

          {/* Education & Career Card */}
          <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{t.bridesEducationCareer}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.educationLevel}</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...form.register("education")}
                >
                  <option value="">{t.selectEducationLevel}</option>
                  {educationLevels.map(level => (
                    <option key={level} value={level}>
                      {getOptionText('education', level)}
                    </option>
                  ))}
                </select>
                {form.formState.errors.education && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.education.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.employmentStatus}</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...form.register("employment")}
                >
                  <option value="">{t.selectEmploymentStatus}</option>
                  {employmentOptions.map(status => (
                    <option key={status} value={status}>
                      {getOptionText('employment', status)}
                    </option>
                  ))}
                </select>
                {form.formState.errors.employment && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.employment.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Bride Info Card */}
          <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{t.additionalBrideInfo}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.bridesAge}</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...form.register("age")}
                >
                  <option value="">{t.selectAgeRange}</option>
                  {ageRanges.map(age => (
                    <option key={age} value={age}>
                      {getOptionText('age', age)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.familySocialStanding}</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...form.register("socialStanding")}
                >
                  <option value="">{t.selectSocialStanding}</option>
                  {socialStandings.map(standing => (
                    <option key={standing} value={standing}>
                      {getOptionText('socialStanding', standing)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.numberOfChildren}</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...form.register("childrenCount")}
                >
                  <option value="">{t.selectChildrenCount}</option>
                  {childrenCounts.map(count => (
                    <option key={count} value={count}>
                      {getOptionText('childrenCount', count)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.virginityStatus}</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...form.register("virginityStatus")}
                >
                  <option value="">{t.selectVirginityStatus}</option>
                  {virginityStatuses.map(status => (
                    <option key={status} value={status}>
                      {getOptionText('virginityStatus', status)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Family & Location Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Home className="w-5 h-5" />
              <h3 className="text-lg font-semibold">{t.bridesFamilyLocation}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.familyType}</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...form.register("familyType")}
                >
                  <option value="">{t.selectFamilyType}</option>
                  {familyTypes.map(type => (
                    <option key={type} value={type}>
                      {getOptionText('familyType', type)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t.locationType}</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...form.register("locationType")}
                >
                  <option value="">{t.selectLocationType}</option>
                  {locationTypes.map(type => (
                    <option key={type} value={type}>
                      {getOptionText('locationType', type)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Income Information Card */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="w-5 h-5" />
              <h3 className="text-lg font-semibold">{t.groomsIncomeInfo}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t.monthlyIncomeRange}</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...form.register("incomeRange")}
                >
                  <option value="">{t.selectIncomeRange}</option>
                  {incomeRanges.map(range => (
                    <option key={range} value={range}>
                      {getOptionText('incomeRange', range)}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-600">
                {t.incomeInfoDescription}
              </p>

              <form onSubmit={form.handleSubmit(onSubmit)}>
                <button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="w-full text-lg py-6 bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:via-green-800 hover:to-green-900 text-white rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
                >
                  <Calculator className="w-6 h-6" />
                  {mutation.isPending ? t.calculating : t.calculateLobolaPrice}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Column 2: AI Chat Interface and Guidance */}
        <div className="space-y-6">
          {/* Uncle Wisdom Chat Interface */}
          <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
                <span role="img" aria-label="wise elder" className="text-2xl">👴🏿</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Ask Uncle Wisdom</h3>
            </div>
            <div className="space-y-4">
              <div className="text-center p-4 border rounded-lg bg-secondary">
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Ask a question about lobola traditions</strong>
                </p>
                <div className="mt-1">
                  <span className="inline-block px-2 py-1 text-xs font-bold text-white bg-gradient-to-r from-green-500 to-orange-500 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200">
                    AI-Powered
                  </span>
                </div>
                <p className="text-xs text-orange-600 mt-1">
                  {freeAnswersUsed === 0 ? "1 free answer remaining" : "Free answers used up"}
                </p>
                {freeAnswersUsed > 0 && (
                  <a 
                    href="https://buy.stripe.com/test_28o5kQ2Xq8Yq8wM5kk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block text-xs text-green-600 mt-1 font-medium hover:text-green-700 underline transition-colors"
                  >
                    Get more questions
                  </a>
                )}
              </div>
              <textarea 
                placeholder="Ask Uncle Wisdom anything about lobola traditions..."
                value={uncleWisdomQuestion}
                onChange={(e) => setUncleWisdomQuestion(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none"
                disabled={uncleWisdomLoading}
              />
              <button 
                onClick={askUncleWisdom}
                disabled={uncleWisdomLoading || !uncleWisdomQuestion.trim()}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uncleWisdomLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  'Ask Uncle Wisdom'
                )}
              </button>
              
              {(askedQuestion || uncleWisdomAnswer) && (
                <div className="mt-4 p-4 border rounded-lg space-y-4">
                  {askedQuestion && (
                    <div>
                      <p className="font-semibold text-sm text-gray-600">Your Question:</p>
                      <p className="text-gray-800">{askedQuestion}</p>
                    </div>
                  )}
                  {uncleWisdomAnswer && (
                    <div>
                      <p className="font-semibold text-sm text-gray-600 flex items-center gap-2">
                        <span role="img" aria-label="wise elder">👴🏿</span> Uncle Wisdom's Answer:
                      </p>
                      <p className="text-gray-800">{uncleWisdomAnswer}</p>
                    </div>
                  )}
                </div>
              )}
              
              {showUpgradePrompt && (
                <div className="mt-4 p-4 border rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                  <div className="text-center">
                    <h4 className="font-semibold text-orange-800 mb-2">✨ Upgrade to Premium</h4>
                    <p className="text-sm text-orange-700 mb-3">
                      You've used your free answer. Upgrade to get unlimited AI wisdom from Uncle Wisdom for just R19.99/month!
                    </p>
                    <div className="space-y-2">
                      <a 
                        href="https://buy.stripe.com/test_28o5kQ2Xq8Yq8wM5kk" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-center"
                      >
                        Upgrade Now - R19.99/month
                      </a>
                      <button 
                        onClick={() => {
                          setShowUpgradePrompt(false);
                          setUncleWisdomQuestion("");
                          setUncleWisdomAnswer("");
                          setAskedQuestion("");
                        }}
                        className="w-full text-orange-600 hover:text-orange-700 text-sm underline"
                      >
                        Maybe Later
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>



          {/* Guidance for Non-Black Partners */}
          <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                <Info className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{t.guidanceForNonBlackPartners}</h3>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                {t.guidanceIntro}
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Approach with deep respect and humility for African traditions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Engage a cultural mediator or elder who can guide you through the process</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Learn about the specific cultural group's traditions and customs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Understand that lobola is not a purchase but a bridge between families</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Be prepared for extended family involvement in the negotiation process</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Show genuine interest in learning and embracing the culture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Consider learning basic phrases in the relevant African language</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Respect that some families may have higher expectations due to cultural differences</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Learn More Section */}
          <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                <span className="text-white font-bold">📚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">{t.learnMore}</h3>
            </div>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium">{t.understandingLobolaTraditions}</h4>
                <p className="text-sm text-gray-600">{t.understandingLobolaTraditionsDesc}</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium">{t.modernConsiderations}</h4>
                <p className="text-sm text-gray-600">{t.modernConsiderationsDesc}</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium">{t.familyMediationResources}</h4>
                <p className="text-sm text-gray-600">{t.familyMediationResourcesDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}