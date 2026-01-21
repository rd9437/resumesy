import React, { useState } from 'react';
import { ResumeSection } from '@/types/resume';
import { useResume } from '@/contexts/ResumeContext';
import { PersonalDetailsEditor } from './PersonalDetailsEditor';
import { SummaryEditor } from './SummaryEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { EducationEditor } from './EducationEditor';
import { SkillsEditor } from './SkillsEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { CertificationsEditor } from './CertificationsEditor';
import { LanguagesEditor } from './LanguagesEditor';
import { ChevronDown, ChevronRight, GripVertical, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SectionItemProps {
  section: ResumeSection;
  isOpen: boolean;
  onToggle: () => void;
  onToggleEnabled: () => void;
  children: React.ReactNode;
}

const SectionItem: React.FC<SectionItemProps> = ({
  section,
  isOpen,
  onToggle,
  onToggleEnabled,
  children,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`section-card ${isDragging ? 'opacity-50' : ''} ${!section.enabled ? 'opacity-60' : ''}`}
    >
      <div className="flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          className="drag-handle p-1 -ml-1"
        >
          <GripVertical className="w-4 h-4" />
        </button>
        
        <button
          onClick={onToggle}
          className="flex-1 flex items-center gap-2 text-left"
        >
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
          <h3 className="font-medium text-foreground">{section.title}</h3>
        </button>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onToggleEnabled}
          title={section.enabled ? 'Hide section' : 'Show section'}
        >
          {section.enabled ? (
            <Eye className="w-4 h-4 text-primary" />
          ) : (
            <EyeOff className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && section.enabled && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-border/50 mt-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ResumeEditor: React.FC = () => {
  const { currentResume, updateResume, updateSections } = useResume();
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['personal', 'summary']));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!currentResume) return null;

  const sortedSections = [...currentResume.sections].sort((a, b) => a.order - b.order);

  const toggleSection = (id: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSectionEnabled = (id: string) => {
    const updated = currentResume.sections.map(s =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    );
    updateSections(updated);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sortedSections.findIndex(s => s.id === active.id);
    const newIndex = sortedSections.findIndex(s => s.id === over.id);
    
    const reordered = arrayMove(sortedSections, oldIndex, newIndex).map((s, i) => ({
      ...s,
      order: i,
    }));
    
    updateSections(reordered);
  };

  const renderSectionEditor = (section: ResumeSection) => {
    switch (section.type) {
      case 'personal':
        return (
          <PersonalDetailsEditor
            data={currentResume.personalDetails}
            onChange={(personalDetails) => updateResume({ personalDetails })}
          />
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortedSections.map(s => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {sortedSections.map((section) => (
            <SectionItem
              key={section.id}
              section={section}
              isOpen={openSections.has(section.id)}
              onToggle={() => toggleSection(section.id)}
              onToggleEnabled={() => toggleSectionEnabled(section.id)}
            >
              {renderSectionEditor(section)}
            </SectionItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
