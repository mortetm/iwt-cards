// Raw card data from JSON
export interface RawCard {
  isDeck: boolean;
  isCharacter?: boolean;
  type: string;
  subtype: string;
  title?: string;
  description?: string;
  cost?: string;
  image: string;
  symbol?: string;
  amount?: number;
}

export interface RawCardData {
  cards: RawCard[];
}

// Transformed card for display
export interface Card {
  id: string;
  title: string;
  title2?: string | null;
  cost: string;
  symbol?: string | null;
  description: string;
  type: string;
  class?: string;
  backgroundImage: string;
  isClassCard?: boolean;
  isDeck?: boolean;
  subtype?: string;
  [key: string]: unknown;
}

export interface TextPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  textAlign?: 'left' | 'center' | 'right';
  padding?: string;
}

export interface CardTypeStyle {
  costPosition?: TextPosition;
  costFontSize?: string;
  costColor?: string;
  costTextShadow?: string;
  titlePosition: TextPosition;
  titleFontSize: string;
  titleColor: string;
  titleTextShadow?: string;
  descriptionPosition: TextPosition;
  descriptionFontSize: string;
  descriptionColor: string;
  descriptionTextShadow?: string;
}

export interface CardTypeStyles {
  [type: string]: CardTypeStyle;
}

// Transform raw card data to display format
export function transformCards(rawData: RawCardData): Card[] {
  const cards: Card[] = [];
  let cardIndex = 1;

  rawData.cards.forEach((raw) => {
    const amount = raw.amount || 1;

    for (let i = 0; i < amount; i++) {
      // Determine the display type
      let displayType: string;
      let displayClass: string;
      let isClassCard = false;

      if (raw.isCharacter) {
        // Character/class cards
        displayType = `${raw.type}-class`;
        displayClass = `${capitalize(raw.type)} Class`;
        isClassCard = true;
      } else if (raw.isDeck) {
        // Deck cards (player or wizard)
        displayType = `${raw.type}-deck`;
        displayClass = `${capitalize(raw.type)} Deck`;
      } else {
        // Class ability cards
        displayType = raw.type;
        displayClass = capitalize(raw.type);
      }

      // Build background image path
      const imagePath = `/images/${raw.image}.png`;

      const card: Card = {
        id: `card-${String(cardIndex).padStart(3, '0')}`,
        title: raw.title || capitalize(raw.type),
        cost: raw.cost || '',
        symbol: raw.symbol || null,
        description: raw.description?.replace(/<br>/g, '\n') || '',
        type: displayType,
        class: displayClass,
        backgroundImage: imagePath,
        isClassCard,
        isDeck: raw.isDeck,
        subtype: raw.subtype,
      };

      cards.push(card);
      cardIndex++;
    }
  });

  return cards;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
