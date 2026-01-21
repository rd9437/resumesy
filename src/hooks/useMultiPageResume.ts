import { useEffect, useRef, useState, useCallback } from 'react';

interface PageBreakInfo {
  pageCount: number;
  pageBreakPositions: number[];
}

interface UseMultiPageResumeOptions {
  marginTop: number; // in inches
  marginBottom: number; // in inches
  pageHeight?: number; // in inches, default 11 (letter)
}

const INCH_TO_PX = 96; // CSS standard: 96px = 1 inch

export const useMultiPageResume = (options: UseMultiPageResumeOptions) => {
  const { marginTop, marginBottom, pageHeight = 11 } = options;
  const contentRef = useRef<HTMLDivElement>(null);
  const [pageBreakInfo, setPageBreakInfo] = useState<PageBreakInfo>({
    pageCount: 1,
    pageBreakPositions: [],
  });

  const calculatePageBreaks = useCallback(() => {
    if (!contentRef.current) return;

    const contentHeight = contentRef.current.scrollHeight;
    const marginTopPx = marginTop * INCH_TO_PX;
    const marginBottomPx = marginBottom * INCH_TO_PX;
    const pageHeightPx = pageHeight * INCH_TO_PX;
    
    // Usable content height per page
    const usableHeight = pageHeightPx - marginTopPx - marginBottomPx;
    
    if (contentHeight <= usableHeight) {
      setPageBreakInfo({ pageCount: 1, pageBreakPositions: [] });
      return;
    }

    // Calculate how many pages we need
    const pageCount = Math.ceil(contentHeight / usableHeight);
    const pageBreakPositions: number[] = [];

    for (let i = 1; i < pageCount; i++) {
      pageBreakPositions.push(i * usableHeight);
    }

    setPageBreakInfo({ pageCount, pageBreakPositions });
  }, [marginTop, marginBottom, pageHeight]);

  useEffect(() => {
    calculatePageBreaks();

    // Recalculate on resize
    const resizeObserver = new ResizeObserver(() => {
      calculatePageBreaks();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [calculatePageBreaks]);

  return {
    contentRef,
    pageBreakInfo,
    recalculate: calculatePageBreaks,
  };
};