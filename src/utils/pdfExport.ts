import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

// A4 dimensions in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// Scale factor for higher resolution (300 DPI)
// 300 DPI / 96 DPI (screen) ≈ 3.125
const SCALE_FACTOR = 3;

export interface ExportProgress {
  status: 'idle' | 'preparing' | 'ready' | 'downloading' | 'error';
  currentPage?: number;
  totalPages?: number;
  error?: string;
}

export async function generatePDF(
  printLayoutRef: HTMLDivElement,
  onProgress?: (progress: ExportProgress) => void
): Promise<Blob> {
  const pages = printLayoutRef.querySelectorAll('.print-page');
  const totalPages = pages.length;

  if (totalPages === 0) {
    throw new Error('No pages to export');
  }

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  for (let i = 0; i < totalPages; i++) {
    onProgress?.({
      status: 'preparing',
      currentPage: i + 1,
      totalPages,
    });

    const page = pages[i] as HTMLElement;

    // Render page to canvas with higher resolution
    const canvas = await html2canvas(page, {
      scale: SCALE_FACTOR,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
    });

    // Add new page for pages after the first
    if (i > 0) {
      pdf.addPage();
    }

    // Add image to PDF
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    pdf.addImage(imgData, 'JPEG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
  }

  onProgress?.({
    status: 'ready',
    totalPages,
  });

  return pdf.output('blob');
}

export function downloadPDF(blob: Blob, filename: string = 'cards.pdf'): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
