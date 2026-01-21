import React, { useState } from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { ResumeSection } from '@/types/resume';
import { PersonalDetailsEditor } from './PersonalDetailsEditor';
import { SummaryEditor } from './SummaryEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { EducationEditor } from './EducationEditor';
import { SkillsEditor } from './SkillsEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { CertificationsEditor } from './CertificationsEditor';
import { LanguagesEditor } from './LanguagesEditor';
import { PhotoUpload } from './PhotoUpload';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, GripVertical, Eye, EyeOff, Pencil, Check, X } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Input } from '@/components/ui/input';

interface SectionItemProps {
  section: ResumeSection;
  isOpen: boolean;
  onToggle: () => void;
  onToggleEnabled: () => void;
  onRename: (newTitle: string) => void;
  children: React.ReactNode;
}

const SectionItem: React.FC<SectionItemProps> = ({ section, isOpen, onToggle, onToggleEnabled, onRename, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(section.title);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
  };

  const handleSaveTitle = () => {
    if (editTitle.trim()) {
      onRename(editTitle.trim());
    } else {
      setEditTitle(section.title);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(section.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`section-card ${isDragging ? 'shadow-lg ring-2 ring-primary/20' : ''}`}
    >
      <div className="flex items-center gap-2 p-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none"
        >
          <GripVertical className="w-4 h-4" />
        </button>

        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-8 text-sm font-medium"
              autoFocus
            />
            <button
              onClick={handleSaveTitle}
              className="p-1.5 rounded-md text-primary hover:bg-primary/10"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-1.5 rounded-md text-muted-foreground hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onToggle}
            className="flex-1 flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-foreground">{section.title}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className="p-1 rounded opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                title="Rename section"
              >
                <Pencil className="w-3 h-3" />
              </button>
            </div>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        )}

        <button
          onClick={onToggleEnabled}
          className={`p-1.5 rounded-md transition-colors ${section.enabled ? 'text-primary hover:bg-primary/10' : 'text-muted-foreground hover:bg-muted'}`}
          title={section.enabled ? 'Hide section' : 'Show section'}
        >
          {section.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ContentEditor: React.FC = () => {
  const { currentResume, updateResume } = useResume();
  const [openSections, setOpenSections] = useState<string[]>(['personal']);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  if (!currentResume) return null;

  const sortedSections = [...currentResume.sections].sort((a, b) => a.order - b.order);

  const toggleSection = (id: string) => {
    setOpenSections(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const toggleSectionEnabled = (id: string) => {
    const updatedSections = currentResume.sections.map(s =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    );
    updateResume({ sections: updatedSections });
  };

  const renameSection = (id: string, newTitle: string) => {
    const updatedSections = currentResume.sections.map(s =>
      s.id === id ? { ...s, title: newTitle } : s
    );
    updateResume({ sections: updatedSections });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sortedSections.findIndex(s => s.id === active.id);
      const newIndex = sortedSections.findIndex(s => s.id === over.id);
      const newOrder = arrayMove(sortedSections, oldIndex, newIndex);
      const updatedSections = newOrder.map((s, i) => ({ ...s, order: i }));
      updateResume({ sections: updatedSections });
    }
  };

  const renderSectionEditor = (section: ResumeSection) => {
    switch (section.type) {
      case 'personal':
        return (
          <div className="space-y-6">
            <PersonalDetailsEditor
              data={currentResume.personalDetails}
              onChange={(data) => updateResume({ personalDetails: data })}
            />
            {currentResume.settings.personalDetails?.showPhoto && (
              <PhotoUpload
                photo={currentResume.personalDetails.photo}
                onChange={(photo) =>
                  updateResume({
                    personalDetails: { ...currentResume.personalDetails, photo },
                  })
                }
                shape={currentResume.settings.personalDetails.photoShape}
                size={currentResume.settings.personalDetails.photoSize}
              />
            )}
          </div>
        );
      case 'summary':
        return (
          <SummaryEditor
            data={currentResume.summary}
            onChange={(summary) => updateResume({ summary })}
          />
        );
      case 'experience':
        return (
          <ExperienceEditor
            data={currentResume.experience}
            onChange={(experience) => updateResume({ experience })}
          />
        );
      case 'education':
        return (
          <EducationEditor
            data={currentResume.education}
            onChange={(education) => updateResume({ education })}
          />
        );
      case 'skills':
        return (
          <SkillsEditor
            data={currentResume.skills}
            onChange={(skills) => updateResume({ skills })}
          />
        );
      case 'projects':
        return (
          <ProjectsEditor
            data={currentResume.projects}
            onChange={(projects) => updateResume({ projects })}
          />
        );
      case 'certifications':
        return (
          <CertificationsEditor
            data={currentResume.certifications}
            onChange={(certifications) => updateResume({ certifications })}
          />
        );
      case 'languages':
        return (
          <LanguagesEditor
            data={currentResume.languages}
            onChange={(languages) => updateResume({ languages })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sortedSections.map(s => s.id)} strategy={verticalListSortingStrategy}>
          {sortedSections.map((section) => (
            <SectionItem
              key={section.id}
              section={section}
              isOpen={openSections.includes(section.id)}
              onToggle={() => toggleSection(section.id)}
              onToggleEnabled={() => toggleSectionEnabled(section.id)}
              onRename={(newTitle) => renameSection(section.id, newTitle)}
            >
              {renderSectionEditor(section)}
            </SectionItem>
          ))}
        </SortableContext>
      </DndContext>

      {/* Feedback | Report Section */}
      <div className="section-card mb-4">
        <h3 className="font-semibold text-base sm:text-lg text-primary mb-2">Feedback | Report</h3>
        <p className="text-sm text-muted-foreground mb-4">
          I would love to have your experiences, suggestions, or bug reports.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href="mailto:rudransh9437@gmail.com"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            ✉️ Write to me
          </a>
          <span className="text-muted-foreground">|</span>
          <a
            href="https://emojicom.io/feedback#os6X8clId3g6goVp6Y6J"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
          >
            🐞 Report
          </a>
        </div>
      </div>
    </div>
  );
};
