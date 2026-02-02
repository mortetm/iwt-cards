import { CardTypeStyles, CardTypeStyle } from "../types/card";

const defaultStyle: CardTypeStyle = {
  titlePosition: {
    top: "108px",
    left: "0",
    right: "0",
    textAlign: "center",
    padding: "0 8px",
  },
  titleFontSize: "14px",
  titleColor: "#000",
  descriptionPosition: {
    bottom: "8px",
    left: "0",
    right: "0",
    textAlign: "center",
    padding: "0 8px",
  },
  descriptionFontSize: "12px",
  descriptionColor: "#000",
};

// Ability card style template - title centered, description in bottom half
const abilityCardStyle: CardTypeStyle = {
  titlePosition: {
    top: "56%",
    left: "0",
    right: "0",
    textAlign: "center",
    padding: "0 10px",
  },
  titleFontSize: "14px",
  titleColor: "#000",
  descriptionPosition: {
    top: "52%",
    bottom: "6px",
    left: "0",
    right: "0",
    textAlign: "center",
    padding: "4px 26px",
  },
  descriptionFontSize: "12px",
  descriptionColor: "#000",
};

// Deck card style template - same as ability for now
const deckCardStyle: CardTypeStyle = {
  titlePosition: {
    top: "55.5%",
    left: "0",
    right: "0",
    textAlign: "center",
    padding: "0 10px",
  },
  titleFontSize: "14px",
  titleColor: "#000",
  descriptionPosition: {
    top: "55%",
    bottom: "6px",
    left: "0",
    right: "0",
    textAlign: "center",
    padding: "4px 32px",
  },
  descriptionFontSize: "12px",
  descriptionColor: "#000",
};

export const cardTypeStyles: CardTypeStyles = {
  // ============================================
  // PALADIN ABILITY CARDS
  // ============================================
  paladin: {
    costPosition: {
      top: "20px",
      left: "5px",
      right: "0",
      textAlign: "center",
    },
    costFontSize: "22px",
    costColor: "#fff",
    titlePosition: {
      top: "56%",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "0 10px",
    },
    titleFontSize: "14px",
    titleColor: "#000",
    descriptionPosition: {
      top: "52%",
      bottom: "6px",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "4px 26px",
    },
    descriptionFontSize: "12px",
    descriptionColor: "#000",
  },

  // ============================================
  // ROGUE ABILITY CARDS
  // ============================================
  rogue: {
    costPosition: {
      top: "28px",
      left: "0",
      right: "0",
      textAlign: "center",
    },
    costFontSize: "22px",
    costColor: "#000",
    titlePosition: {
      top: "51%",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "0 10px",
    },
    titleFontSize: "14px",
    titleColor: "#000",
    descriptionPosition: {
      top: "52%",
      bottom: "6px",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "4px 30px",
    },
    descriptionFontSize: "12px",
    descriptionColor: "#000",
  },

  // ============================================
  // MAGE ABILITY CARDS
  // ============================================
  mage: {
    costPosition: {
      top: "8px",
      left: "0",
      right: "0",
      textAlign: "center",
    },
    costFontSize: "22px",
    costColor: "#000",
    titlePosition: {
      top: "54%",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "0 10px",
    },
    titleFontSize: "14px",
    titleColor: "#000",
    descriptionPosition: {
      top: "53%",
      bottom: "6px",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "4px 30px",
    },
    descriptionFontSize: "12px",
    descriptionColor: "#000",
  },

  // ============================================
  // WARRIOR ABILITY CARDS
  // ============================================
  warrior: {
    costPosition: {
      top: "8px",
      left: "0",
      right: "0",
      textAlign: "center",
    },
    costFontSize: "22px",
    costColor: "#000",
    titlePosition: {
      top: "50.5%",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "0 10px",
    },
    titleFontSize: "14px",
    titleColor: "#000",
    descriptionPosition: {
      top: "50%",
      bottom: "6px",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "4px 26px",
    },
    descriptionFontSize: "12px",
    descriptionColor: "#000",
  },

  // ============================================
  // RANGER ABILITY CARDS
  // ============================================
  ranger: {
    costPosition: {
      top: "8px",
      left: "0",
      right: "0",
      textAlign: "center",
    },
    costFontSize: "22px",
    costColor: "#000",
    titlePosition: {
      top: "55%",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "0 10px",
    },
    titleFontSize: "14px",
    titleColor: "#000",
    descriptionPosition: {
      top: "53%",
      bottom: "6px",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "4px 26px",
    },
    descriptionFontSize: "12px",
    descriptionColor: "#000",
  },

  // ============================================
  // PRIEST ABILITY CARDS
  // ============================================
  priest: {
    costPosition: {
      top: "8px",
      left: "0",
      right: "0",
      textAlign: "center",
    },
    costFontSize: "22px",
    costColor: "#000",
    titlePosition: {
      top: "50.5%",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "0 10px",
    },
    titleFontSize: "14px",
    titleColor: "#000",
    descriptionPosition: {
      top: "52%",
      bottom: "6px",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "4px 26px",
    },
    descriptionFontSize: "12px",
    descriptionColor: "#000",
  },

  // ============================================
  // DRUID ABILITY CARDS
  // ============================================
  druid: {
    costPosition: {
      top: "8px",
      left: "0",
      right: "0",
      textAlign: "center",
    },
    costFontSize: "22px",
    costColor: "#000",
    titlePosition: {
      top: "58.5%",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "0 10px",
    },
    titleFontSize: "14px",
    titleColor: "#000",
    descriptionPosition: {
      top: "52%",
      bottom: "6px",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "4px 40px",
    },
    descriptionFontSize: "12px",
    descriptionColor: "#000",
  },

  // ============================================
  // WARLOCK ABILITY CARDS
  // ============================================
  warlock: {
    costPosition: {
      top: "8px",
      left: "0",
      right: "0",
      textAlign: "center",
    },
    costFontSize: "22px",
    costColor: "#000",
    titlePosition: {
      top: "53.5%",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "0 10px",
    },
    titleFontSize: "14px",
    titleColor: "#000",
    descriptionPosition: {
      top: "52%",
      bottom: "6px",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "4px 40px",
    },
    descriptionFontSize: "12px",
    descriptionColor: "#000",
  },

  // ============================================
  // BARBARIAN ABILITY CARDS
  // ============================================
  barbarian: {
    costPosition: {
      top: "8px",
      left: "0",
      right: "0",
      textAlign: "center",
    },
    costFontSize: "22px",
    costColor: "#000",
    titlePosition: {
      top: "52.5%",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "0 10px",
    },
    titleFontSize: "14px",
    titleColor: "#000",
    descriptionPosition: {
      top: "52%",
      bottom: "6px",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "4px 38px",
    },
    descriptionFontSize: "12px",
    descriptionColor: "#000",
  },

  // ============================================
  // CURSE CARDS
  // ============================================
  curse: {
    costPosition: {
      top: "8px",
      left: "0",
      right: "0",
      textAlign: "center",
    },
    costFontSize: "22px",
    costColor: "#000",
    titlePosition: {
      top: "51%",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "0 10px",
    },
    titleFontSize: "14px",
    titleColor: "#000",
    descriptionPosition: {
      top: "52%",
      bottom: "6px",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "4px 26px",
    },
    descriptionFontSize: "12px",
    descriptionColor: "#000",
  },

  // ============================================
  // WIZARD ABILITY CARDS
  // ============================================
  wizard: {
    costPosition: {
      top: "8px",
      left: "0",
      right: "0",
      textAlign: "center",
    },
    costFontSize: "22px",
    costColor: "#000",
    titlePosition: {
      top: "60%",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "0 10px",
    },
    titleFontSize: "14px",
    titleColor: "#000",
    descriptionPosition: {
      top: "52%",
      bottom: "6px",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "4px 26px",
    },
    descriptionFontSize: "12px",
    descriptionColor: "#000",
  },

  // ============================================
  // DECK CARDS
  // ============================================
  "player-deck": {
    costPosition: {
      top: "8px",
      left: "0",
      right: "0",
      textAlign: "center",
    },
    costFontSize: "22px",
    costColor: "#000",
    titlePosition: {
      top: "55.5%",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "0 10px",
    },
    titleFontSize: "14px",
    titleColor: "#000",
    descriptionPosition: {
      top: "55%",
      bottom: "6px",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "4px 32px",
    },
    descriptionFontSize: "12px",
    descriptionColor: "#000",
  },

  "wizard-deck": {
    costPosition: {
      top: "8px",
      left: "0",
      right: "0",
      textAlign: "center",
    },
    costFontSize: "22px",
    costColor: "#000",
    titlePosition: {
      top: "54.5%",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "0 10px",
    },
    titleFontSize: "14px",
    titleColor: "#000",
    descriptionPosition: {
      top: "55%",
      bottom: "6px",
      left: "0",
      right: "0",
      textAlign: "center",
      padding: "4px 32px",
    },
    descriptionFontSize: "12px",
    descriptionColor: "#000",
  },
};

export function getCardStyle(type: string, subtype?: string): CardTypeStyle {
  // Check subtype first (e.g., "curse"), then type, then default
  if (subtype && cardTypeStyles[subtype]) {
    return cardTypeStyles[subtype];
  }
  return cardTypeStyles[type] || defaultStyle;
}
