import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { Button } from '@/components/ui/button';
import { Plus, Copy, Trash2, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface CollapsibleResumeSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const CollapsibleResumeSidebar: React.FC<CollapsibleResumeSidebarProps> = ({
  isOpen,
  onToggle,
}) => {
  const { resumes, currentResumeId, setCurrentResumeId, createResume, duplicateResume, deleteResume, renameResume } = useResume();

  const handleRename = (id: string, currentName: string) => {
    const newName = window.prompt('Enter new name:', currentName);
    if (newName && newName !== currentName) {
      renameResume(id, newName);
    }
  };

  return (
    <>
      {/* Toggle Button - Always Visible */}
      <button
        onClick={onToggle}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-sidebar border border-sidebar-border rounded-r-lg p-1.5 hover:bg-sidebar-accent transition-colors shadow-sm"
        style={{ left: isOpen ? '256px' : '0' }}
      >
        {isOpen ? (
          <ChevronLeft className="w-4 h-4 text-sidebar-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-sidebar-foreground" />
        )}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 256, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-sidebar border-r border-sidebar-border flex flex-col h-full overflow-hidden"
          >
            <div className="p-4 border-b border-sidebar-border">
              <h2 className="text-sm font-semibold text-sidebar-foreground mb-3">My Resumes</h2>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => createResume()}
              >
                <Plus className="w-4 h-4" />
                New Resume
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
              {resumes.map((resume) => (
                <motion.div
                  key={resume.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <DropdownMenu>
                    <div
                      className={`group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                        currentResumeId === resume.id
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'hover:bg-sidebar-accent/50 text-sidebar-foreground'
                      }`}
                      onClick={() => setCurrentResumeId(resume.id)}
                    >
                      <FileText className="w-4 h-4 shrink-0" />
                      <span className="flex-1 text-sm truncate">{resume.name}</span>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="opacity-0 group-hover:opacity-100 h-6 w-6"
                        >
                          <span className="text-xs">•••</span>
                        </Button>
                      </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleRename(resume.id, resume.name)}>
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => duplicateResume(resume.id)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          if (confirm('Delete this resume?')) {
                            deleteResume(resume.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              ))}

              {resumes.length === 0 && (
                <div className="text-center py-8 text-sidebar-foreground/60">
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No resumes yet</p>
                  <p className="text-xs mt-1">Create one to get started</p>
                </div>
              )}
            </div>

            {/* Privacy notice */}
            <div className="p-4 border-t border-sidebar-border">
              <div className="text-xs text-sidebar-foreground/60 text-center">
                <span className="inline-block mb-1">🔒</span>
                <p>Your data never leaves your device</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
