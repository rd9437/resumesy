import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Resume, createEmptyResume, ResumeSection, ResumeSettings, migrateResumeSettings } from '@/types/resume';
import { v4 as uuidv4 } from 'uuid';
import { ResumeTemplate, applyTemplateSettings, getTemplateById } from '@/types/templates';

interface ResumeContextType {
  resumes: Resume[];
  currentResume: Resume | null;
  currentResumeId: string | null;
  setCurrentResumeId: (id: string | null) => void;
  createResume: (name?: string) => Resume;
  updateResume: (updates: Partial<Resume>) => void;
  deleteResume: (id: string) => void;
  duplicateResume: (id: string) => Resume;
  renameResume: (id: string, name: string) => void;
  updateSections: (sections: ResumeSection[]) => void;
  applyTemplate: (template: ResumeTemplate, targetResumeId?: string) => void;
  exportToJson: () => string;
  importFromJson: (json: string) => boolean;
  undoStack: Resume[];
  redoStack: Resume[];
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}


const ResumeContext = createContext<ResumeContextType | null>(null);

const STORAGE_KEY = 'resumesy_resumes';
const CURRENT_RESUME_KEY = 'resumesy_current_resume';
const MAX_UNDO_STACK = 50;

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [currentResumeId, setCurrentResumeId] = useState<string | null>(null);
  const [undoStack, setUndoStack] = useState<Resume[]>([]);
  const [redoStack, setRedoStack] = useState<Resume[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const currentId = localStorage.getItem(CURRENT_RESUME_KEY);
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setResumes(parsed);
        if (currentId && parsed.find((r: Resume) => r.id === currentId)) {
          setCurrentResumeId(currentId);
        } else if (parsed.length > 0) {
          setCurrentResumeId(parsed[0].id);
        }
      } catch (e) {
        console.error('Failed to parse stored resumes:', e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever resumes change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
    }
  }, [resumes, isInitialized]);

  // Save current resume ID
  useEffect(() => {
    if (isInitialized && currentResumeId) {
      localStorage.setItem(CURRENT_RESUME_KEY, currentResumeId);
    }
  }, [currentResumeId, isInitialized]);

  const currentResume = resumes.find(r => r.id === currentResumeId) || null;

  const pushToUndoStack = useCallback((resume: Resume) => {
    setUndoStack(prev => [...prev.slice(-MAX_UNDO_STACK + 1), resume]);
    setRedoStack([]);
  }, []);

  const createResume = useCallback((name?: string): Resume => {
    const newResume = createEmptyResume();
    if (name) newResume.name = name;
    newResume.id = uuidv4();
    // Apply default 'professional' template when creating a resume without a prior selection
    try {
      const defaultTemplate = getTemplateById('professional');
      if (defaultTemplate) {
        newResume.settings = migrateResumeSettings(
          applyTemplateSettings(newResume.settings, defaultTemplate)
        );
      }
    } catch (e) {
      console.error('Failed to apply default template:', e);
    }
    setResumes(prev => [...prev, newResume]);
    setCurrentResumeId(newResume.id);
    return newResume;
  }, []);

  // Ensure there is always at least one resume after initialization
  useEffect(() => {
    if (isInitialized && resumes.length === 0) {
      createResume('My First Resume');
    }
  }, [isInitialized, resumes.length, createResume]);

  const updateResume = useCallback((updates: Partial<Resume>) => {
    if (!currentResumeId) return;
    
    setResumes(prev => {
      const index = prev.findIndex(r => r.id === currentResumeId);
      if (index === -1) return prev;
      
      const currentResume = prev[index];
      pushToUndoStack(currentResume);
      
      const updated = {
        ...currentResume,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      const newResumes = [...prev];
      newResumes[index] = updated;
      return newResumes;
    });
  }, [currentResumeId, pushToUndoStack]);

  const deleteResume = useCallback((id: string) => {
    setResumes(prev => {
      const filtered = prev.filter(r => r.id !== id);
      if (currentResumeId === id) {
        setCurrentResumeId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  }, [currentResumeId]);

  const duplicateResume = useCallback((id: string): Resume => {
    const original = resumes.find(r => r.id === id);
    if (!original) throw new Error('Resume not found');
    
    const duplicate: Resume = {
      ...JSON.parse(JSON.stringify(original)),
      id: uuidv4(),
      name: `${original.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setResumes(prev => [...prev, duplicate]);
    setCurrentResumeId(duplicate.id);
    return duplicate;
  }, [resumes]);

  const renameResume = useCallback((id: string, name: string) => {
    setResumes(prev => prev.map(r => 
      r.id === id ? { ...r, name, updatedAt: new Date().toISOString() } : r
    ));
  }, []);

  const updateSections = useCallback((sections: ResumeSection[]) => {
    updateResume({ sections });
  }, [updateResume]);

  const applyTemplate = useCallback((template: ResumeTemplate, targetResumeId?: string) => {
    const resumeId = targetResumeId ?? currentResumeId;
    if (!resumeId) return;

    setResumes(prev => {
      const index = prev.findIndex(r => r.id === resumeId);
      if (index === -1) return prev;

      const targetResume = prev[index];
      if (!targetResume) return prev;

      if (resumeId === currentResumeId) {
        pushToUndoStack(targetResume);
      }

      const mergedSettings = migrateResumeSettings(
        applyTemplateSettings(targetResume.settings, template)
      );

      const updatedResume: Resume = {
        ...targetResume,
        settings: mergedSettings,
        updatedAt: new Date().toISOString(),
      };

      const nextResumes = [...prev];
      nextResumes[index] = updatedResume;
      return nextResumes;
    });
  }, [currentResumeId, pushToUndoStack]);

  const exportToJson = useCallback((): string => {
    if (!currentResume) return '';
    return JSON.stringify(currentResume, null, 2);
  }, [currentResume]);

  const importFromJson = useCallback((json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      if (!parsed.id || !parsed.name) {
        throw new Error('Invalid resume format');
      }
      parsed.id = uuidv4();
      parsed.name = `${parsed.name} (Imported)`;
      parsed.createdAt = new Date().toISOString();
      parsed.updatedAt = new Date().toISOString();
      setResumes(prev => [...prev, parsed]);
      setCurrentResumeId(parsed.id);
      return true;
    } catch (e) {
      console.error('Failed to import resume:', e);
      return false;
    }
  }, []);

  const undo = useCallback(() => {
    if (undoStack.length === 0 || !currentResumeId) return;
    
    const previousState = undoStack[undoStack.length - 1];
    setUndoStack(prev => prev.slice(0, -1));
    
    setResumes(prev => {
      const currentResume = prev.find(r => r.id === currentResumeId);
      if (currentResume) {
        setRedoStack(redoPrev => [...redoPrev, currentResume]);
      }
      return prev.map(r => r.id === currentResumeId ? previousState : r);
    });
  }, [undoStack, currentResumeId]);

  const redo = useCallback(() => {
    if (redoStack.length === 0 || !currentResumeId) return;
    
    const nextState = redoStack[redoStack.length - 1];
    setRedoStack(prev => prev.slice(0, -1));
    
    setResumes(prev => {
      const currentResume = prev.find(r => r.id === currentResumeId);
      if (currentResume) {
        setUndoStack(undoPrev => [...undoPrev, currentResume]);
      }
      return prev.map(r => r.id === currentResumeId ? nextState : r);
    });
  }, [redoStack, currentResumeId]);

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        currentResume,
        currentResumeId,
        setCurrentResumeId,
        createResume,
        updateResume,
        deleteResume,
        duplicateResume,
        renameResume,
        updateSections,
        applyTemplate,
        exportToJson,
        importFromJson,
        undoStack,
        redoStack,
        undo,
        redo,
        canUndo: undoStack.length > 0,
        canRedo: redoStack.length > 0,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
