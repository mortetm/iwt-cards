import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import fonts
import mavStudiosRegular from './fonts/MAVStudios-Regular.otf';
import mavStudiosBold from './fonts/MAVStudios-Bold.otf';

// Global styles
const globalStyles = document.createElement('style');
globalStyles.textContent = `
  @font-face {
    font-family: 'MAVStudios';
    src: url('${mavStudiosRegular}') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'MAVStudios';
    src: url('${mavStudiosBold}') format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Print styles */
  @media print {
    body {
      margin: 0;
      padding: 0;
    }

    .print-page {
      page-break-after: always;
      margin: 0 !important;
      box-shadow: none !important;
    }

    header, nav, footer, button {
      display: none !important;
    }
  }
`;
document.head.appendChild(globalStyles);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
