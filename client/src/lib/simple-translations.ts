export type Language = 'en' | 'zu' | 'xh' | 'nso' | 'tn' | 'st';

export const simpleTranslations = {
  en: {
    appTitle: "My Lobola",
    appSubtitle: "Cultural guidance for respectful lobola traditions across South African communities",
    additionalBrideInfo: "Additional Bride Information",
    calculateButton: "Calculate Lobola Price",
    calculating: "Calculating...",
    culturalGuidanceResults: "Cultural Guidance Results",
    calculationBreakdown: "Calculation Breakdown:",
    baseAmount: "Base Amount:",
    nonBlackGuidanceTitle: "Guidance for Non-Black Partners",
    nonBlackGuidanceContent: "If you are not of African heritage and are entering a lobola negotiation, here are important considerations:",
    nonBlackTips: [
      "Approach with deep respect and humility for African traditions",
      "Engage a cultural mediator or elder who can guide you through the process",
      "Learn about the specific cultural group's traditions and customs",
      "Understand that lobola is not a purchase but a bridge between families",
      "Be prepared for extended family involvement in the negotiation process",
      "Show genuine interest in learning and embracing the culture",
      "Consider learning basic phrases in the relevant African language",
      "Respect that some families may have higher expectations due to cultural differences"
    ]
  },
  zu: {
    appTitle: "My Lobola",
    appSubtitle: "Ukuqondisisa ngokuhlonipha amasiko aseNingizimu Afrika",
    additionalBrideInfo: "Ulwazi olwengeziwe lomakoti",
    calculateButton: "Bala Ukuqondisisa Kwamasiko",
    calculating: "Iyabala...",
    culturalGuidanceResults: "Imiphumela Yokuqondisisa Kwamasiko",
    calculationBreakdown: "Ukuhlukaniswa Kokubala:",
    baseAmount: "Imali Eyisisekelo:",
    nonBlackGuidanceTitle: "Izeluleko Zabantu Abangeyona AmAfrika",
    nonBlackGuidanceContent: "Uma ungeyena umAfrika futhi ungenela izingxoxo ze-lobola:",
    nonBlackTips: [
      "Sondela ngokuhlonipha okukhulu namasiko ama-Afrika",
      "Sebenzisa umlamuli wamasiko noma induna",
      "Funda ngemithetho yeqembu lamasiko"
    ]
  },
  xh: {
    appTitle: "My Lobola",
    appSubtitle: "Isikhokelo ngemasiko aseNingizimu Afrika",
    additionalBrideInfo: "Ulwazi olwengeziwe lomtshato",
    calculateButton: "Bala Ukuqonda Kwamasiko",
    calculating: "Iyabala...",
    culturalGuidanceResults: "Imiphumela Yokuqonda Kwamasiko",
    calculationBreakdown: "Ukuhlukaniswa Kokubala:",
    baseAmount: "Imali Eyisisekelo:",
    nonBlackGuidanceTitle: "Izeluleko Zabantu Abangeyona AmAfrika",
    nonBlackGuidanceContent: "Uma ungeyena umAfrika futhi ungenela izingxoxo ze-lobola:",
    nonBlackTips: [
      "Sondela ngokuhlonipha namasiko ama-Afrika",
      "Sebenzisa umlamuli wamasiko",
      "Funda ngemithetho yesiko"
    ]
  },
  nso: {
    appTitle: "My Lobola",
    appSubtitle: "Tlhahlo ya setšo sa Afrika Borwa",
    additionalBrideInfo: "Tshedimošo ya tlaleletšo ya mogaditshaba",
    calculateButton: "Bala Tlhahlo ya Setšo",
    calculating: "E a bala...",
    culturalGuidanceResults: "Dipoelo tša Tlhahlo ya Setšo",
    calculationBreakdown: "Karolo ya Dipalo:",
    baseAmount: "Tšhelete ya Motheo:",
    nonBlackGuidanceTitle: "Tlhahlo ya Batho ba se ba seng ba Afrika",
    nonBlackGuidanceContent: "Ge o se wa Afrika o kena ditshekatshekong tša lobola:",
    nonBlackTips: [
      "Atamela ka tlhompho ye kgolo le ditšo tša Afrika",
      "Šomiša moetapele wa setšo",
      "Ithute ka melawana ya setšo"
    ]
  },
  tn: {
    appTitle: "My Lobola",
    appSubtitle: "Tlhahlobo ya setso sa Afrika Borwa",
    additionalBrideInfo: "Tshedimosetso e e oketsegileng ya mosadi",
    calculateButton: "Bala Tlhahlobo ya Setso",
    calculating: "E a bala...",
    culturalGuidanceResults: "Dipholo tsa Tlhahlobo ya Setso",
    calculationBreakdown: "Kgaoganyo ya Dipalo:",
    baseAmount: "Madi a Motheo:",
    nonBlackGuidanceTitle: "Tlhahlobo ya Batho ba ba seng ba Afrika",
    nonBlackGuidanceContent: "Fa o seng wa Afrika o tsena ditherisanong tsa lobola:",
    nonBlackTips: [
      "Atamela ka tlotlo e kgolo le ditso tsa Afrika",
      "Dirisa moeteledipele wa setso",
      "Ithute ka melao ya setso"
    ]
  },
  st: {
    appTitle: "My Lobola",
    appSubtitle: "Tataiso ya setso sa Afrika Borwa",
    additionalBrideInfo: "Tlhahisoleseding e eketsehileng ya moradi",
    calculateButton: "Bala Tataiso ya Setso",
    calculating: "E a bala...",
    culturalGuidanceResults: "Diphetho tsa Tataiso ya Setso",
    calculationBreakdown: "Karohanyo ya Dipalo:",
    baseAmount: "Tjhelete ya Motheo:",
    nonBlackGuidanceTitle: "Tataiso ya Batho ba sa leng ba Afrika",
    nonBlackGuidanceContent: "Haeba o sa le wa Afrika o kena dipuisanong tsa lobola:",
    nonBlackTips: [
      "Atamela ka tlhompho e kgolo le ditso tsa Afrika",
      "Sebedisa moetapele wa setso",
      "Ithute ka melao ya setso"
    ]
  }
} as const;

export function getSimpleTranslation(language: Language) {
  return simpleTranslations[language] || simpleTranslations.en;
}