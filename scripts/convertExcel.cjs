const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const workbook = XLSX.readFile(path.join(__dirname, '../src/data/cards.xlsx'));

// Process all worksheets
console.log('Worksheets found:', workbook.SheetNames);

let allCards = [];
let cardIndex = 1;

workbook.SheetNames.forEach((sheetName) => {
  console.log(`\nProcessing sheet: "${sheetName}"`);
  const worksheet = workbook.Sheets[sheetName];
  const rawData = XLSX.utils.sheet_to_json(worksheet);

  if (rawData.length === 0) {
    console.log('  (empty sheet, skipping)');
    return;
  }

  console.log('  Columns found:', Object.keys(rawData[0] || {}));
  console.log('  Rows:', rawData.length);

  // Transform to normalized format
  let skippedRows = 0;
  rawData.forEach((row) => {
    // Skip rows without a card name
    const cardName = row['Card Name'] || row['Name'] || '';
    if (!cardName.trim()) {
      skippedRows++;
      return;
    }

    // Get amount (default to 1 if not specified)
    const amount = parseInt(row['Amount'] || row['amount'] || row['Qty'] || row['qty'] || '1', 10) || 1;

    // Determine the card type/class - use sheet name for Player/Wizard decks
    const cardType = row['Class'] || row['Type'] || sheetName.toLowerCase().replace(' ', '-');
    const cardClass = row['Class'] || row['Type'] || sheetName;

    // Generate the specified number of cards
    for (let i = 0; i < amount; i++) {
      const card = {
        id: `card-${String(cardIndex).padStart(3, '0')}`,
        title: cardName,
        title2: row['Card Name 2'] || null,
        cost: row['Cost'] || '',
        symbol: row['Symbol'] || null,
        description: row['Description'] || row['Card Description'] || '',
        type: cardType.toLowerCase().replace(' ', '-'),
        class: cardClass,
        backgroundImage: `/images/${cardType.toLowerCase().replace(' ', '-')}.svg`,
      };
      allCards.push(card);
      cardIndex++;
    }
  });
  if (skippedRows > 0) {
    console.log(`  Skipped ${skippedRows} empty rows`);
  }
});

// Collect unique classes from the cards
const uniqueClasses = [...new Set(
  allCards
    .filter(card => !['player-deck', 'wizard-deck'].includes(card.type))
    .map(card => card.class)
)];

console.log('\nGenerating class cards for:', uniqueClasses);

// Generate class cards (normal and stunned) for each class
uniqueClasses.forEach((className) => {
  const classType = className.toLowerCase();

  // Normal class card
  allCards.push({
    id: `card-${String(cardIndex).padStart(3, '0')}`,
    title: className,
    title2: null,
    cost: '',
    symbol: null,
    description: `${className} class card`,
    type: `${classType}-class`,
    class: `${className} Class`,
    backgroundImage: `/images/${classType}-class.svg`,
    isClassCard: true,
    state: 'normal',
  });
  cardIndex++;

  // Stunned class card
  allCards.push({
    id: `card-${String(cardIndex).padStart(3, '0')}`,
    title: `${className} (Stunned)`,
    title2: null,
    cost: '',
    symbol: null,
    description: `${className} class card - Stunned`,
    type: `${classType}-class`,
    class: `${className} Class`,
    backgroundImage: `/images/${classType}-class-stunned.svg`,
    isClassCard: true,
    state: 'stunned',
  });
  cardIndex++;
});

console.log(`  Added ${uniqueClasses.length * 2} class cards`);

console.log('\n--- Summary ---');
console.log('Total cards generated:', allCards.length);
if (allCards.length > 0) {
  console.log('First card sample:', JSON.stringify(allCards[0], null, 2));
}

// Write the JSON file
const outputPath = path.join(__dirname, '../src/data/cards.json');
fs.writeFileSync(outputPath, JSON.stringify(allCards, null, 2));

console.log(`\nSaved to ${outputPath}`);
