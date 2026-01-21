import React, { useRef } from 'react';
import { FileText, Download, Undo2, Redo2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useResume } from '@/contexts/ResumeContext';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeaderProps {
  onExportPdf: () => void;
  onResetZoom?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onExportPdf, onResetZoom }) => {
  const { currentResume, undo, redo, canUndo, canRedo } = useResume();
  const location = useLocation();
  const isBuilder = location.pathname.startsWith('/builder');

  const handleExportPdf = () => {
    if (onResetZoom) {
      onResetZoom();
    }
    setTimeout(() => {
      onExportPdf();
    }, 100);
  };

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="h-full px-4 flex items-center justify-between max-w-[1920px] mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" aria-label="Go to home">
          <img src="/logo.png" alt="Resumesy logo" className="w-9 h-9 rounded-lg object-cover" />
          <span className={`text-xl font-bold text-foreground ${isBuilder ? 'uppercase' : ''}`}>RESUMESY</span>
        </Link>

        {/* Center - Resume name */}
        {currentResume && (
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Editing:</span>
            <span className="text-sm font-medium text-foreground">{currentResume.name}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Undo/Redo */}
          <div className="flex items-center gap-0.5 sm:gap-1 mr-1 sm:mr-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={undo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
              className="w-8 h-8 sm:w-9 sm:h-9"
            >
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={redo}
              disabled={!canRedo}
              title="Redo (Ctrl+Y)"
              className="w-8 h-8 sm:w-9 sm:h-9"
            >
              <Redo2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Direct Download button*/}
          <div className="hidden lg:block">
            <Button variant="default" size="sm" className="px-3" onClick={handleExportPdf}>
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
