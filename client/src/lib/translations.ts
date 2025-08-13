export interface Translation {
  // Header
  appTitle: string;
  demoMode: string;
  
  // Language selector
  selectLanguage: string;
  
  // Form sections
  bridesCulturalHeritage: string;
  bridesFamilyLocation: string;
  bridesEducationCareer: string;
  groomsIncomeInfo: string;
  additionalBrideInfo: string;
  guidanceForNonBlackPartners: string;
  learnMore: string;
  
  // Form fields
  culturalGroup: string;
  familyType: string;
  locationType: string;
  educationLevel: string;
  employmentStatus: string;
  monthlyIncomeRange: string;
  bridesAge: string;
  familySocialStanding: string;
  numberOfChildren: string;
  virginityStatus: string;
  
  // Placeholders
  selectCulturalGroup: string;
  selectFamilyType: string;
  selectLocationType: string;
  selectEducationLevel: string;
  selectEmploymentStatus: string;
  selectIncomeRange: string;
  selectAgeRange: string;
  selectSocialStanding: string;
  selectChildrenCount: string;
  selectVirginityStatus: string;
  
  // Descriptions
  culturalGroupsDescription: string;
  incomeInfoDescription: string;
  
  // Learn more sections
  understandingLobolaTraditions: string;
  understandingLobolaTraditionsDesc: string;
  modernConsiderations: string;
  modernConsiderationsDesc: string;
  familyMediationResources: string;
  familyMediationResourcesDesc: string;
  
  // Guidance content
  guidanceIntro: string;
  guidancePoint1: string;
  guidancePoint2: string;
  guidancePoint3: string;
  guidancePoint4: string;
  guidancePoint5: string;
  guidancePoint6: string;
  guidancePoint7: string;
  guidancePoint8: string;
  
  // Button
  calculateLobolaPrice: string;
  calculating: string;
  
  // Options
  nuclear: string;
  extended: string;
  rural: string;
  township: string;
  suburb: string;
  cityCenter: string;
  noMatric: string;
  matric: string;
  diploma: string;
  degree: string;
  honours: string;
  masters: string;
  phd: string;
  preferNotSay: string;
  employed: string;
  selfEmployed: string;
  student: string;
  unemployed: string;
  retired: string;
  under5000: string;
  fiveToTenThousand: string;
  tenToTwentyThousand: string;
  twentyToThirtyFiveThousand: string;
  thirtyFiveToFiftyThousand: string;
  fiftyToSeventyFiveThousand: string;
  overSeventyFiveThousand: string;
  eighteenToTwentyFive: string;
  twentySixToThirty: string;
  thirtyOneToThirtyFive: string;
  thirtySixToForty: string;
  fortyOneToFortyFive: string;
  fortySixToFifty: string;
  overFifty: string;
  lower: string;
  middle: string;
  upperMiddle: string;
  upper: string;
  zero: string;
  one: string;
  two: string;
  three: string;
  four: string;
  fivePlus: string;
  virgin: string;
  notVirgin: string;
}

export const translations: Record<string, Translation> = {
  en: {
    // Header
    appTitle: "My Lobola",
    demoMode: "Demo Mode",
    
    // Language selector
    selectLanguage: "Select Language",
    
    // Form sections
    bridesCulturalHeritage: "Bride's Cultural Heritage",
    bridesFamilyLocation: "Bride's Family & Location",
    bridesEducationCareer: "Bride's Education & Career",
    groomsIncomeInfo: "Groom's Income Information",
    additionalBrideInfo: "Additional Bride Information",
    guidanceForNonBlackPartners: "Guidance for Non-Black Partners",
    learnMore: "Learn More",
    
    // Form fields
    culturalGroup: "Cultural Group *",
    familyType: "Family Type",
    locationType: "Location Type *",
    educationLevel: "Education Level *",
    employmentStatus: "Employment Status *",
    monthlyIncomeRange: "Monthly Income Range (Optional)",
    bridesAge: "Bride's Age *",
    familySocialStanding: "Bride's Family Social Standing *",
    numberOfChildren: "Number of Children *",
    virginityStatus: "Virginity Status (Optional)",
    
    // Placeholders
    selectCulturalGroup: "Select your cultural group",
    selectFamilyType: "Select family type",
    selectLocationType: "Select location type",
    selectEducationLevel: "Select education level",
    selectEmploymentStatus: "Select employment status",
    selectIncomeRange: "Select income range",
    selectAgeRange: "Select age range",
    selectSocialStanding: "Select social standing",
    selectChildrenCount: "Select number of children",
    selectVirginityStatus: "Select status (optional)",
    
    // Descriptions
    culturalGroupsDescription: "Different cultural groups have varying traditions and customs",
    incomeInfoDescription: "This information helps provide culturally appropriate guidance",
    
    // Learn more sections
    understandingLobolaTraditions: "Understanding Lobola Traditions",
    understandingLobolaTraditionsDesc: "Cultural significance across SA groups",
    modernConsiderations: "Modern Considerations",
    modernConsiderationsDesc: "Balancing tradition with contemporary values",
    familyMediationResources: "Family Mediation Resources",
    familyMediationResourcesDesc: "Professional guidance and support",
    
    // Guidance content
    guidanceIntro: "If you are not of African heritage and are entering a lobola negotiation, here are important considerations:",
    guidancePoint1: "• Approach with deep respect and humility for African traditions",
    guidancePoint2: "• Engage a cultural mediator or elder who can guide you through the process",
    guidancePoint3: "• Learn about the specific cultural group's traditions and customs",
    guidancePoint4: "• Understand that lobola is not a purchase but a bridge between families",
    guidancePoint5: "• Be prepared for extended family involvement in the negotiation process",
    guidancePoint6: "• Show genuine interest in learning and embracing the culture",
    guidancePoint7: "• Consider learning basic phrases in the relevant African language",
    guidancePoint8: "• Respect that some families may have higher expectations due to cultural differences",
    
    // Button
    calculateLobolaPrice: "Calculate Lobola Price",
    calculating: "Calculating...",
    
    // Options
    nuclear: "Nuclear",
    extended: "Extended",
    rural: "Rural",
    township: "Township",
    suburb: "Suburb",
    cityCenter: "City Center",
    noMatric: "No Matric",
    matric: "Matric",
    diploma: "Diploma",
    degree: "Degree",
    honours: "Honours",
    masters: "Masters",
    phd: "PhD",
    preferNotSay: "Prefer not to say",
    employed: "Employed",
    selfEmployed: "Self-employed",
    student: "Student",
    unemployed: "Unemployed",
    retired: "Retired",
    under5000: "Under R5,000",
    fiveToTenThousand: "R5,000 - R10,000",
    tenToTwentyThousand: "R10,000 - R20,000",
    twentyToThirtyFiveThousand: "R20,000 - R35,000",
    thirtyFiveToFiftyThousand: "R35,000 - R50,000",
    fiftyToSeventyFiveThousand: "R50,000 - R75,000",
    overSeventyFiveThousand: "Over R75,000",
    eighteenToTwentyFive: "18-25",
    twentySixToThirty: "26-30",
    thirtyOneToThirtyFive: "31-35",
    thirtySixToForty: "36-40",
    fortyOneToFortyFive: "41-45",
    fortySixToFifty: "46-50",
    overFifty: "Over 50",
    lower: "Lower",
    middle: "Middle",
    upperMiddle: "Upper Middle",
    upper: "Upper",
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    fivePlus: "5+",
    virgin: "Virgin",
    notVirgin: "Not Virgin",
  },
  
  zu: {
    // Header
    appTitle: "I-Lobola Yami",
    demoMode: "I-Demo Mode",
    
    // Language selector
    selectLanguage: "Khetha Ulimi",
    
    // Form sections
    bridesCulturalHeritage: "Amasiko E-Bride",
    bridesFamilyLocation: "Umndeni Ne-Indawo Ye-Bride",
    bridesEducationCareer: "Imfundo Ne-Career Ye-Bride",
    groomsIncomeInfo: "Ulwazi Lwe-Mali Ye-Groom",
    additionalBrideInfo: "Ulwazi Olwengeziwe Lwe-Bride",
    guidanceForNonBlackPartners: "Isiqondiso Kwabangewona Abamnyama",
    learnMore: "Funda Okwengeziwe",
    
    // Form fields
    culturalGroup: "Iqembu Lesiko *",
    familyType: "Uhlobo Lomndeni",
    locationType: "Uhlobo Lwendawo *",
    educationLevel: "Izinga Lemfundo *",
    employmentStatus: "Isimo Sokusebenza *",
    monthlyIncomeRange: "Ibanga Lemali Yenyanga (Kungahleliwe)",
    bridesAge: "Ubudala Be-Bride *",
    familySocialStanding: "Isimo Somndeni We-Bride *",
    numberOfChildren: "Inani Lezingane *",
    virginityStatus: "Isimo Sobuntombi (Kungahleliwe)",
    
    // Placeholders
    selectCulturalGroup: "Khetha iqembu lakho lesiko",
    selectFamilyType: "Khetha uhlobo lomndeni",
    selectLocationType: "Khetha uhlobo lwendawo",
    selectEducationLevel: "Khetha izinga lemfundo",
    selectEmploymentStatus: "Khetha isimo sokusebenza",
    selectIncomeRange: "Khetha ibanga lemali",
    selectAgeRange: "Khetha ibanga lobudala",
    selectSocialStanding: "Khetha isimo somphakathi",
    selectChildrenCount: "Khetha inani lezingane",
    selectVirginityStatus: "Khetha isimo (kungahleliwe)",
    
    // Descriptions
    culturalGroupsDescription: "Amaqembu ahlukene amasiko anamasiko namasiko ahlukene",
    incomeInfoDescription: "Lolu lwazi lusiza ukunikeza isiqondiso esifanele ngamasiko",
    
    // Learn more sections
    understandingLobolaTraditions: "Ukuqonda Amasiko E-Lobola",
    understandingLobolaTraditionsDesc: "Ukubaluleka kwamasiko kumaqembu e-SA",
    modernConsiderations: "Izinto Zamanje",
    modernConsiderationsDesc: "Ukulinganisa isiko namagugu wamanje",
    familyMediationResources: "Izinsiza Zokuxazulula Imindeni",
    familyMediationResourcesDesc: "Isiqondiso nokwesekwa kwabasebenzi",
    
    // Guidance content
    guidanceIntro: "Uma ungowomdabu ongum-Afrika futhi uya kwinqubo ye-lobola, nayi izinto ezibalulekile:",
    guidancePoint1: "Sondela ngokuhlonipha nokuthobeka okujulile ngamasiko ama-Afrika",
    guidancePoint2: "Sebenzisa umxazululi wamasiko noma umdala ongakuhola",
    guidancePoint3: "Funda ngamasiko namasiko eqembu lesiko elithile",
    guidancePoint4: "Qonda ukuthi i-lobola akuyona ukuthenga kodwa ibhuloho phakathi kwemindeni",
    guidancePoint5: "Lungiselela ukubandakanyeka komndeni omude",
    guidancePoint6: "Bonisa intshisekelo yangempela ekufundeni nasekugubhuleni isiko",
    guidancePoint7: "Cabanga ukufunda imisho eyisisekelo ngolimi lwama-Afrika olufanele",
    guidancePoint8: "Hlonipha ukuthi eminye imindeni ingaba nezithembiso eziphezulu ngenxa yokwehluka kwamasiko",
    
    // Button
    calculateLobolaPrice: "Bala Inani Le-Lobola",
    calculating: "Iyabala...",
    
    // Options
    nuclear: "Umndeni Omncane",
    extended: "Umndeni Omude",
    rural: "Ezindaweni Zasemakhaya",
    township: "I-Township",
    suburb: "I-Suburb",
    cityCenter: "Isikhungo Sedolobha",
    noMatric: "Akuna-Matric",
    matric: "I-Matric",
    diploma: "I-Diploma",
    degree: "I-Degree",
    honours: "I-Honours",
    masters: "I-Masters",
    phd: "I-PhD",
    preferNotSay: "Angithandi ukusho",
    employed: "Kusebenza",
    selfEmployed: "Kuzisebenza",
    student: "Umfundi",
    unemployed: "Akusebenzi",
    retired: "Umhlalaphansi",
    under5000: "Ngezansi kuka-R5,000",
    fiveToTenThousand: "R5,000 - R10,000",
    tenToTwentyThousand: "R10,000 - R20,000",
    twentyToThirtyFiveThousand: "R20,000 - R35,000",
    thirtyFiveToFiftyThousand: "R35,000 - R50,000",
    fiftyToSeventyFiveThousand: "R50,000 - R75,000",
    overSeventyFiveThousand: "Ngaphezu kuka-R75,000",
    eighteenToTwentyFive: "18-25",
    twentySixToThirty: "26-30",
    thirtyOneToThirtyFive: "31-35",
    thirtySixToForty: "36-40",
    fortyOneToFortyFive: "41-45",
    fortySixToFifty: "46-50",
    overFifty: "Ngaphezu kuka-50",
    lower: "Ophansi",
    middle: "Ophakathi",
    upperMiddle: "Ophakathi Phezulu",
    upper: "Ophezulu",
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    fivePlus: "5+",
    virgin: "Intombi",
    notVirgin: "Akayintombi",
  },
  
  xh: {
    // Header
    appTitle: "I-Lobola Yam",
    demoMode: "I-Demo Mode",
    
    // Language selector
    selectLanguage: "Khetha Ulwimi",
    
    // Form sections
    bridesCulturalHeritage: "Amasiko E-Bride",
    bridesFamilyLocation: "Umzi Ne-Indawo Ye-Bride",
    bridesEducationCareer: "Imfundo Ne-Career Ye-Bride",
    groomsIncomeInfo: "Ulwazi Lwemali Ye-Groom",
    additionalBrideInfo: "Ulwazi Olwongezelelweyo Lwe-Bride",
    guidanceForNonBlackPartners: "Inkqubo Kwabangewona Abamnyama",
    learnMore: "Funda Okungakumbi",
    
    // Form fields
    culturalGroup: "Iqela Lesiko *",
    familyType: "Uhlobo Lomzi",
    locationType: "Uhlobo Lwendawo *",
    educationLevel: "Izinga Lemfundo *",
    employmentStatus: "Isimo Sokusebenza *",
    monthlyIncomeRange: "Ibanga Lemali Yenyanga (Kungahleliwe)",
    bridesAge: "Ubudala Be-Bride *",
    familySocialStanding: "Isimo Somzi We-Bride *",
    numberOfChildren: "Inani Lezingane *",
    virginityStatus: "Isimo Sobuntombi (Kungahleliwe)",
    
    // Placeholders
    selectCulturalGroup: "Khetha iqela lakho lesiko",
    selectFamilyType: "Khetha uhlobo lomzi",
    selectLocationType: "Khetha uhlobo lwendawo",
    selectEducationLevel: "Khetha izinga lemfundo",
    selectEmploymentStatus: "Khetha isimo sokusebenza",
    selectIncomeRange: "Khetha ibanga lemali",
    selectAgeRange: "Khetha ibanga lobudala",
    selectSocialStanding: "Khetha isimo somphakathi",
    selectChildrenCount: "Khetha inani lezingane",
    selectVirginityStatus: "Khetha isimo (kungahleliwe)",
    
    // Descriptions
    culturalGroupsDescription: "Amaqela ahlukeneyo amasiko anamasiko namasiko ahlukeneyo",
    incomeInfoDescription: "Eli lwazi linceda ukunikeza inkqubo efanelekileyo ngamasiko",
    
    // Learn more sections
    understandingLobolaTraditions: "Ukuqonda Amasiko E-Lobola",
    understandingLobolaTraditionsDesc: "Ububaluleka bamasiko kumaqela e-SA",
    modernConsiderations: "Izinto Zanamhlanje",
    modernConsiderationsDesc: "Ukulinganisa isiko namagugu wanamhlanje",
    familyMediationResources: "Iinkqubo Zokuxazulula Imizi",
    familyMediationResourcesDesc: "Inkqubo nokuxhaswa kwabasebenzi",
    
    // Guidance content
    guidanceIntro: "Ukuba awungowomdabu ongum-Afrika kwaye uya kwinqubo ye-lobola, nayi izinto ezibalulekileyo:",
    guidancePoint1: "Sondela ngokuhlonipha nokuthobeka okujulileyo ngamasiko ama-Afrika",
    guidancePoint2: "Sebenzisa umxazululi wamasiko okanye umdala onokukukhokela",
    guidancePoint3: "Funda ngamasiko namasiko eqela lesiko elithile",
    guidancePoint4: "Qonda ukuba i-lobola ayisithengi kodwa ibhuloho phakathi kwemizi",
    guidancePoint5: "Lungiselela ukubandakanyeka komzi omude",
    guidancePoint6: "Bonisa intshiseko yangempela ekufundeni nasekugubhuleni isiko",
    guidancePoint7: "Cinga ukufunda imibandela eyisiseko ngolwimi lwama-Afrika olufanelekileyo",
    guidancePoint8: "Hlonipha ukuba eminye imizi inokuba nezithembiso eziphezulu ngenxa yokwahluka kwamasiko",
    
    // Button
    calculateLobolaPrice: "Bala Inani Le-Lobola",
    calculating: "Iyabala...",
    
    // Options
    nuclear: "Umzi Omfutshane",
    extended: "Umzi Omude",
    rural: "Ezindaweni Zasemaphandleni",
    township: "I-Township",
    suburb: "I-Suburb",
    cityCenter: "Isikhungo Sedolophu",
    noMatric: "Akuna-Matric",
    matric: "I-Matric",
    diploma: "I-Diploma",
    degree: "I-Degree",
    honours: "I-Honours",
    masters: "I-Masters",
    phd: "I-PhD",
    preferNotSay: "Andithandi ukuthetha",
    employed: "Kusebenza",
    selfEmployed: "Kuzisebenza",
    student: "Umfundi",
    unemployed: "Akusebenzi",
    retired: "Umhlalaphansi",
    under5000: "Ngezantsi kuka-R5,000",
    fiveToTenThousand: "R5,000 - R10,000",
    tenToTwentyThousand: "R10,000 - R20,000",
    twentyToThirtyFiveThousand: "R20,000 - R35,000",
    thirtyFiveToFiftyThousand: "R35,000 - R50,000",
    fiftyToSeventyFiveThousand: "R50,000 - R75,000",
    overSeventyFiveThousand: "Ngaphezu kuka-R75,000",
    eighteenToTwentyFive: "18-25",
    twentySixToThirty: "26-30",
    thirtyOneToThirtyFive: "31-35",
    thirtySixToForty: "36-40",
    fortyOneToFortyFive: "41-45",
    fortySixToFifty: "46-50",
    overFifty: "Ngaphezu kuka-50",
    lower: "Ophantsi",
    middle: "Ophakathi",
    upperMiddle: "Ophakathi Phezulu",
    upper: "Phezulu",
    zero: "0",
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    fivePlus: "5+",
    virgin: "Intombi",
    notVirgin: "Akayintombi",
  },
  
  // Add more languages as needed...
  nso: {
    // Sepedi translations (similar structure)
    appTitle: "Lobola Ya Ka",
    demoMode: "Demo Mode",
    selectLanguage: "Kgetha Polelo",
    // ... add all other translations
  },
  
  tn: {
    // Setswana translations
    appTitle: "Lobola Ya Me",
    demoMode: "Demo Mode", 
    selectLanguage: "Kgetha Puo",
    // ... add all other translations
  },
  
  st: {
    // Sesotho translations
    appTitle: "Lobola Ya Ka",
    demoMode: "Demo Mode",
    selectLanguage: "Kgetha Puo",
    // ... add all other translations
  }
};

export function useTranslation(language: string): Translation {
  return translations[language] || translations.en;
}