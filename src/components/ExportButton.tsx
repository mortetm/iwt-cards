import { useState, useRef } from 'react';
import { generatePDF, downloadPDF, ExportProgress } from '../utils/pdfExport';

interface ExportButtonProps {
  printLayoutRef: React.RefObject<HTMLDivElement>;
  cardCount: number;
}

export default function ExportButton({ printLayoutRef, cardCount }: ExportButtonProps) {
  const [progress, setProgress] = useState<ExportProgress>({ status: 'idle' });
  const pdfBlobRef = useRef<Blob | null>(null);

  const handlePrepare = async () => {
    if (!printLayoutRef.current) {
      setProgress({ status: 'error', error: 'Print layout not found' });
      return;
    }

    setProgress({ status: 'preparing', currentPage: 0, totalPages: 0 });

    try {
      const blob = await generatePDF(printLayoutRef.current, setProgress);
      pdfBlobRef.current = blob;
      setProgress({ status: 'ready' });
    } catch (error) {
      setProgress({
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  const handleDownload = () => {
    if (!pdfBlobRef.current) {
      return;
    }

    setProgress({ status: 'downloading' });
    downloadPDF(pdfBlobRef.current, `cards-${Date.now()}.pdf`);
    setProgress({ status: 'idle' });
    pdfBlobRef.current = null;
  };

  const buttonStyle: React.CSSProperties = {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '200px',
  };

  const prepareButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: progress.status === 'preparing' ? '#ccc' : '#4a90d9',
    color: 'white',
  };

  const downloadButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: 'white',
  };

  const errorStyle: React.CSSProperties = {
    color: '#dc3545',
    marginTop: '10px',
    fontSize: '14px',
  };

  const progressStyle: React.CSSProperties = {
    color: '#666',
    marginTop: '10px',
    fontSize: '14px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      {progress.status === 'ready' ? (
        <button
          onClick={handleDownload}
          style={downloadButtonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
        >
          Download PDF
        </button>
      ) : (
        <button
          onClick={handlePrepare}
          disabled={progress.status === 'preparing' || cardCount === 0}
          style={prepareButtonStyle}
          onMouseOver={(e) => {
            if (progress.status !== 'preparing') {
              e.currentTarget.style.backgroundColor = '#357abd';
            }
          }}
          onMouseOut={(e) => {
            if (progress.status !== 'preparing') {
              e.currentTarget.style.backgroundColor = '#4a90d9';
            }
          }}
        >
          {progress.status === 'preparing' ? 'Preparing...' : 'Prepare for Download'}
        </button>
      )}

      {progress.status === 'preparing' && progress.currentPage !== undefined && (
        <div style={progressStyle}>
          Rendering page {progress.currentPage} of {progress.totalPages}...
        </div>
      )}

      {progress.status === 'error' && (
        <div style={errorStyle}>
          Error: {progress.error}
        </div>
      )}

      <div style={{ fontSize: '12px', color: '#888' }}>
        {cardCount} cards will be exported
      </div>
    </div>
  );
}
