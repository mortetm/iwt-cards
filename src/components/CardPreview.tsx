import { useState } from 'react';
import { Card as CardType } from '../types/card';
import Card from './Card';

interface CardPreviewProps {
  cards: CardType[];
}

// Format type name for display
function formatTypeName(type: string): string {
  return type
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Group types by category
function categorizeType(type: string): string {
  if (type.endsWith('-class')) return 'Class Cards';
  if (type === 'player-deck' || type === 'wizard-deck') return 'Deck Cards';
  return 'Ability Cards';
}

export default function CardPreview({ cards }: CardPreviewProps) {
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Get unique types and sort them by category
  const uniqueTypes = [...new Set(cards.map(card => card.type))];

  // Group types by category
  const groupedTypes: Record<string, string[]> = {
    'Ability Cards': [],
    'Deck Cards': [],
    'Class Cards': [],
  };

  uniqueTypes.forEach(type => {
    const category = categorizeType(type);
    groupedTypes[category].push(type);
  });

  // Sort each category alphabetically
  Object.keys(groupedTypes).forEach(category => {
    groupedTypes[category].sort();
  });

  const filteredCards = typeFilter === 'all'
    ? cards
    : cards.filter(card => card.type === typeFilter);

  return (
    <div style={{ padding: '20px' }}>
      {/* Filter controls */}
      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <label style={{ fontWeight: 'bold' }}>
          Filter by type:
        </label>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            cursor: 'pointer',
            minWidth: '200px',
          }}
        >
          <option value="all">All Cards</option>

          {Object.entries(groupedTypes).map(([category, types]) => (
            types.length > 0 && (
              <optgroup key={category} label={category}>
                {types.map(type => (
                  <option key={type} value={type}>
                    {formatTypeName(type)}
                  </option>
                ))}
              </optgroup>
            )
          ))}
        </select>

        <span style={{ color: '#666' }}>
          Showing {filteredCards.length} of {cards.length} cards
        </span>
      </div>

      {/* Card grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'flex-start',
        }}
      >
        {filteredCards.map(card => (
          <div key={card.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Card card={card} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
              {card.id}
            </div>
          </div>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div style={{ textAlign: 'center', color: '#999', padding: '40px' }}>
          No cards match the selected filter.
        </div>
      )}
    </div>
  );
}
