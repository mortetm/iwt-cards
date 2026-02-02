import { Card as CardType } from "../types/card";
import { getCardStyle } from "../styles/cardTypes";

interface CardProps {
  card: CardType;
  showBleed?: boolean;
}

// Card dimensions in mm
const CARD_WIDTH_MM = 63;
const CARD_HEIGHT_MM = 88;
const BLEED_MM = 3;

// Convert mm to pixels (at 96 DPI for screen display)
const MM_TO_PX = 3.7795275591;

// Determine layout type based on card type
function getLayoutType(type: string): "ability" | "deck" | "class" {
  if (type.endsWith("-class")) {
    return "class";
  }
  if (type === "player-deck" || type === "wizard-deck") {
    return "deck";
  }
  return "ability";
}

// Extract only the number from cost string
function extractCostNumber(cost: string): string {
  const match = cost.match(/\d+/);
  return match ? match[0] : cost;
}

export default function Card({ card, showBleed = false }: CardProps) {
  // Pass both type and subtype - getCardStyle will use subtype if a style exists for it
  const style = getCardStyle(card.type, card.subtype);
  const layoutType = getLayoutType(card.type);

  const cardWidth = showBleed ? CARD_WIDTH_MM + BLEED_MM * 2 : CARD_WIDTH_MM;
  const cardHeight = showBleed ? CARD_HEIGHT_MM + BLEED_MM * 2 : CARD_HEIGHT_MM;

  const widthPx = cardWidth * MM_TO_PX;
  const heightPx = cardHeight * MM_TO_PX;

  return (
    <div
      className="card"
      style={{
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        position: "relative",
        overflow: "hidden",
        borderRadius: showBleed ? "0" : "8px",
        boxShadow: showBleed ? "none" : "0 4px 8px rgba(0,0,0,0.3)",
        backgroundColor: "#1a1a2e",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${card.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient overlay for text readability */}
      {/* <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '55%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
        }}
      /> */}

      {/* Layout: Class Ability Cards - Cost top, Title center, Description bottom half */}
      {layoutType === "ability" && (
        <>
          {/* Cost */}
          {card.cost && (
            <div
              style={{
                position: "absolute",
                top: style.costPosition?.top ?? "8px",
                bottom: style.costPosition?.bottom,
                left: style.costPosition?.left ?? "0",
                right: style.costPosition?.right ?? "0",
                textAlign: style.costPosition?.textAlign ?? "center",
                padding: style.costPosition?.padding,
                fontSize: style.costFontSize ?? "11px",
                fontWeight: "bold",
                color: style.costColor ?? "#000",
                textShadow: style.costTextShadow,
                fontFamily: '"MAVStudios", Arial, sans-serif',
              }}
            >
              {extractCostNumber(card.cost)}
            </div>
          )}

          {/* Title */}
          <div
            style={{
              position: "absolute",
              top: style.titlePosition.top,
              bottom: style.titlePosition.bottom,
              left: style.titlePosition.left,
              right: style.titlePosition.right,
              textAlign: style.titlePosition.textAlign,
              padding: style.titlePosition.padding,
              fontSize: style.titleFontSize,
              fontWeight: "bold",
              color: style.titleColor,
              textShadow: style.titleTextShadow,
              fontFamily: '"MAVStudios", "Times New Roman", serif',
              letterSpacing: "0.5px",
            }}
          >
            {card.title}
          </div>

          {/* Description */}
          <div
            style={{
              position: "absolute",
              top: style.descriptionPosition.top,
              bottom: style.descriptionPosition.bottom,
              left: style.descriptionPosition.left,
              right: style.descriptionPosition.right,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: style.descriptionPosition.textAlign,
              padding: style.descriptionPosition.padding,
              fontSize: style.descriptionFontSize,
              color: style.descriptionColor,
              textShadow: style.descriptionTextShadow,
              fontFamily: '"MAVStudios", Arial, sans-serif',
              lineHeight: "1.3",
              whiteSpace: "pre-line",
            }}
          >
            <span>{card.description}</span>
          </div>
        </>
      )}

      {/* Layout: Deck Cards - Title center, Description bottom half */}
      {layoutType === "deck" && (
        <>
          {/* Title */}
          <div
            style={{
              position: "absolute",
              top: style.titlePosition.top,
              bottom: style.titlePosition.bottom,
              left: style.titlePosition.left,
              right: style.titlePosition.right,
              textAlign: style.titlePosition.textAlign,
              padding: style.titlePosition.padding,
              fontSize: style.titleFontSize,
              fontWeight: "bold",
              color: style.titleColor,
              textShadow: style.titleTextShadow,
              fontFamily: '"MAVStudios", "Times New Roman", serif',
              letterSpacing: "0.5px",
            }}
          >
            {card.title}
          </div>

          {/* Description */}
          <div
            style={{
              position: "absolute",
              top: style.descriptionPosition.top,
              bottom: style.descriptionPosition.bottom,
              left: style.descriptionPosition.left,
              right: style.descriptionPosition.right,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: style.descriptionPosition.textAlign,
              padding: style.descriptionPosition.padding,
              fontSize: style.descriptionFontSize,
              color: style.descriptionColor,
              textShadow: style.descriptionTextShadow,
              fontFamily: '"MAVStudios", Arial, sans-serif',
              lineHeight: "1.3",
              whiteSpace: "pre-line",
            }}
          >
            <span>{card.description}</span>
          </div>
        </>
      )}

      {/* Layout: Class Cards - Title centered at 40%, Description at bottom */}
      {layoutType === "class" && (
        <>
          {/* Title - Center */}
          <div
            style={{
              position: "absolute",
              top: style.titlePosition.top,
              left: style.titlePosition.left,
              right: style.titlePosition.right,
              textAlign: style.titlePosition.textAlign,
              padding: style.titlePosition.padding,
              fontSize: style.titleFontSize,
              fontWeight: "bold",
              color: style.titleColor,
              textShadow: style.titleTextShadow,
              fontFamily: '"MAVStudios", "Times New Roman", serif',
              letterSpacing: "0.5px",
            }}
          >
            {card.title}
          </div>

          {/* Description - Bottom */}
          <div
            style={{
              position: "absolute",
              top: style.descriptionPosition.top,
              left: style.descriptionPosition.left,
              right: style.descriptionPosition.right,
              bottom: style.descriptionPosition.bottom,
              textAlign: style.descriptionPosition.textAlign,
              padding: style.descriptionPosition.padding,
              fontSize: style.descriptionFontSize,
              color: style.descriptionColor,
              textShadow: style.descriptionTextShadow,
              fontFamily: '"MAVStudios", Arial, sans-serif',
              lineHeight: "1.3",
              whiteSpace: "pre-line",
            }}
          >
            {card.description}
          </div>
        </>
      )}

      {/* Class indicator - only for non-class cards */}
      {layoutType !== "class" && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "4px",
            transform: "translateY(-50%) rotate(-90deg)",
            transformOrigin: "left center",
            fontSize: "7px",
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {card.class || card.type}
        </div>
      )}
    </div>
  );
}

export { CARD_WIDTH_MM, CARD_HEIGHT_MM, BLEED_MM, MM_TO_PX };
