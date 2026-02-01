import { forwardRef } from 'react';
import { Card as CardType } from '../types/card';
import Card, { CARD_WIDTH_MM, CARD_HEIGHT_MM, BLEED_MM, MM_TO_PX } from './Card';

interface PrintLayoutProps {
  cards: CardType[];
}

// A4 dimensions in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// Card with bleed dimensions
const CARD_WITH_BLEED_WIDTH = CARD_WIDTH_MM + (BLEED_MM * 2); // 69mm
const CARD_WITH_BLEED_HEIGHT = CARD_HEIGHT_MM + (BLEED_MM * 2); // 94mm

// Grid configuration: 3x3 cards per page
const CARDS_PER_ROW = 3;
const CARDS_PER_COL = 3;
const CARDS_PER_PAGE = CARDS_PER_ROW * CARDS_PER_COL;

// Calculate margins to center the grid
const GRID_WIDTH = CARDS_PER_ROW * CARD_WITH_BLEED_WIDTH; // 207mm
const GRID_HEIGHT = CARDS_PER_COL * CARD_WITH_BLEED_HEIGHT; // 282mm
const MARGIN_LEFT = (A4_WIDTH_MM - GRID_WIDTH) / 2; // ~1.5mm
const MARGIN_TOP = (A4_HEIGHT_MM - GRID_HEIGHT) / 2; // ~7.5mm

// Cut mark length in mm
const CUT_MARK_LENGTH = 5;
const CUT_MARK_OFFSET = 2;

interface CutMarkProps {
  x: number;
  y: number;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

function CutMark({ x, y, position }: CutMarkProps) {
  const xPx = x * MM_TO_PX;
  const yPx = y * MM_TO_PX;
  const lengthPx = CUT_MARK_LENGTH * MM_TO_PX;

  let horizontalLine, verticalLine;

  switch (position) {
    case 'top-left':
      horizontalLine = { x1: xPx - lengthPx - CUT_MARK_OFFSET * MM_TO_PX, y1: yPx, x2: xPx - CUT_MARK_OFFSET * MM_TO_PX, y2: yPx };
      verticalLine = { x1: xPx, y1: yPx - lengthPx - CUT_MARK_OFFSET * MM_TO_PX, x2: xPx, y2: yPx - CUT_MARK_OFFSET * MM_TO_PX };
      break;
    case 'top-right':
      horizontalLine = { x1: xPx + CUT_MARK_OFFSET * MM_TO_PX, y1: yPx, x2: xPx + lengthPx + CUT_MARK_OFFSET * MM_TO_PX, y2: yPx };
      verticalLine = { x1: xPx, y1: yPx - lengthPx - CUT_MARK_OFFSET * MM_TO_PX, x2: xPx, y2: yPx - CUT_MARK_OFFSET * MM_TO_PX };
      break;
    case 'bottom-left':
      horizontalLine = { x1: xPx - lengthPx - CUT_MARK_OFFSET * MM_TO_PX, y1: yPx, x2: xPx - CUT_MARK_OFFSET * MM_TO_PX, y2: yPx };
      verticalLine = { x1: xPx, y1: yPx + CUT_MARK_OFFSET * MM_TO_PX, x2: xPx, y2: yPx + lengthPx + CUT_MARK_OFFSET * MM_TO_PX };
      break;
    case 'bottom-right':
      horizontalLine = { x1: xPx + CUT_MARK_OFFSET * MM_TO_PX, y1: yPx, x2: xPx + lengthPx + CUT_MARK_OFFSET * MM_TO_PX, y2: yPx };
      verticalLine = { x1: xPx, y1: yPx + CUT_MARK_OFFSET * MM_TO_PX, x2: xPx, y2: yPx + lengthPx + CUT_MARK_OFFSET * MM_TO_PX };
      break;
  }

  return (
    <g stroke="#000" strokeWidth="0.5">
      <line {...horizontalLine} />
      <line {...verticalLine} />
    </g>
  );
}

interface PageProps {
  cards: CardType[];
  pageIndex: number;
}

function Page({ cards, pageIndex }: PageProps) {
  const widthPx = A4_WIDTH_MM * MM_TO_PX;
  const heightPx = A4_HEIGHT_MM * MM_TO_PX;

  // Generate cut marks for each card position
  const cutMarks: CutMarkProps[] = [];

  cards.forEach((_, index) => {
    const col = index % CARDS_PER_ROW;
    const row = Math.floor(index / CARDS_PER_ROW);

    // Position of card with bleed
    const cardX = MARGIN_LEFT + col * CARD_WITH_BLEED_WIDTH;
    const cardY = MARGIN_TOP + row * CARD_WITH_BLEED_HEIGHT;

    // Cut line positions (inside the bleed)
    const cutLeft = cardX + BLEED_MM;
    const cutRight = cardX + CARD_WITH_BLEED_WIDTH - BLEED_MM;
    const cutTop = cardY + BLEED_MM;
    const cutBottom = cardY + CARD_WITH_BLEED_HEIGHT - BLEED_MM;

    cutMarks.push(
      { x: cutLeft, y: cutTop, position: 'top-left' },
      { x: cutRight, y: cutTop, position: 'top-right' },
      { x: cutLeft, y: cutBottom, position: 'bottom-left' },
      { x: cutRight, y: cutBottom, position: 'bottom-right' },
    );
  });

  return (
    <div
      className="print-page"
      data-page-index={pageIndex}
      style={{
        width: `${widthPx}px`,
        height: `${heightPx}px`,
        backgroundColor: 'white',
        position: 'relative',
        margin: '20px auto',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        overflow: 'hidden',
      }}
    >
      {/* Cards grid */}
      {cards.map((card, index) => {
        const col = index % CARDS_PER_ROW;
        const row = Math.floor(index / CARDS_PER_ROW);

        const xMm = MARGIN_LEFT + col * CARD_WITH_BLEED_WIDTH;
        const yMm = MARGIN_TOP + row * CARD_WITH_BLEED_HEIGHT;

        return (
          <div
            key={card.id}
            style={{
              position: 'absolute',
              left: `${xMm * MM_TO_PX}px`,
              top: `${yMm * MM_TO_PX}px`,
            }}
          >
            <Card card={card} showBleed={true} />
          </div>
        );
      })}

      {/* Cut marks overlay */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {cutMarks.map((mark, index) => (
          <CutMark key={index} {...mark} />
        ))}
      </svg>

      {/* Page number */}
      <div
        style={{
          position: 'absolute',
          bottom: '5px',
          right: '10px',
          fontSize: '10px',
          color: '#999',
        }}
      >
        Page {pageIndex + 1}
      </div>
    </div>
  );
}

const PrintLayout = forwardRef<HTMLDivElement, PrintLayoutProps>(
  function PrintLayout({ cards }, ref) {
    // Split cards into pages
    const pages: CardType[][] = [];
    for (let i = 0; i < cards.length; i += CARDS_PER_PAGE) {
      pages.push(cards.slice(i, i + CARDS_PER_PAGE));
    }

    return (
      <div ref={ref} className="print-layout">
        <div style={{ textAlign: 'center', marginBottom: '10px', color: '#666' }}>
          Print Layout Preview ({pages.length} page{pages.length !== 1 ? 's' : ''}, {cards.length} cards)
        </div>
        {pages.map((pageCards, pageIndex) => (
          <Page key={pageIndex} cards={pageCards} pageIndex={pageIndex} />
        ))}
      </div>
    );
  }
);

export default PrintLayout;
export { CARDS_PER_PAGE };
