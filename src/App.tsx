import { useState, useRef, useMemo } from 'react';
import { RawCardData, transformCards } from './types/card';
import CardPreview from './components/CardPreview';
import PrintLayout from './components/PrintLayout';
import ExportButton from './components/ExportButton';
import cardsData from './data/cards.json';

type ViewMode = 'preview' | 'print';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const printLayoutRef = useRef<HTMLDivElement>(null);

  // Transform raw card data to display format
  const cards = useMemo(() => {
    return transformCards(cardsData as RawCardData);
  }, []);

  const tabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: isActive ? 'bold' : 'normal',
    border: 'none',
    borderBottom: isActive ? '3px solid #4a90d9' : '3px solid transparent',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: isActive ? '#4a90d9' : '#666',
    transition: 'all 0.2s ease',
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: '#1a1a2e',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '24px' }}>IWT Card Generator</h1>
        <p style={{ margin: '10px 0 0', opacity: 0.7, fontSize: '14px' }}>
          Generate printable trading cards from JSON data
        </p>
      </header>

      {/* Navigation tabs */}
      <nav
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderBottom: '1px solid #ddd',
        }}
      >
        <button
          onClick={() => setViewMode('preview')}
          style={tabStyle(viewMode === 'preview')}
        >
          Card Preview
        </button>
        <button
          onClick={() => setViewMode('print')}
          style={tabStyle(viewMode === 'print')}
        >
          Print Layout
        </button>
      </nav>

      {/* Export controls (visible in print mode) */}
      {viewMode === 'print' && (
        <div
          style={{
            padding: '20px',
            backgroundColor: '#fff',
            borderBottom: '1px solid #ddd',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ExportButton
            printLayoutRef={printLayoutRef as React.RefObject<HTMLDivElement>}
            cardCount={cards.length}
          />
        </div>
      )}

      {/* Main content */}
      <main style={{ backgroundColor: '#e8e8e8', minHeight: 'calc(100vh - 200px)' }}>
        {viewMode === 'preview' ? (
          <CardPreview cards={cards} />
        ) : (
          <PrintLayout ref={printLayoutRef} cards={cards} />
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: '#1a1a2e',
          color: 'white',
          padding: '15px',
          textAlign: 'center',
          fontSize: '12px',
          opacity: 0.7,
        }}
      >
        Card size: 63x88mm | Bleed: 3mm | A4 output with cut marks
      </footer>
    </div>
  );
}

export default App;
