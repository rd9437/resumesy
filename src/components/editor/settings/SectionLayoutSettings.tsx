import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, User, Briefcase, GraduationCap, Wrench, FolderOpen, Award, Languages, FileText } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { ResumeSection } from '@/types/resume';

const SECTION_ICONS: Record<string, React.ReactNode> = {
  personal: <User className="w-4 h-4" />,
  summary: <FileText className="w-4 h-4" />,
  experience: <Briefcase className="w-4 h-4" />,
  education: <GraduationCap className="w-4 h-4" />,
  skills: <Wrench className="w-4 h-4" />,
  projects: <FolderOpen className="w-4 h-4" />,
  certifications: <Award className="w-4 h-4" />,
  languages: <Languages className="w-4 h-4" />,
};

interface SortableSectionItemProps {
  section: ResumeSection;
  onToggle: (id: string, enabled: boolean) => void;
}

const SortableSectionItem: React.FC<SortableSectionItemProps> = ({ section, onToggle }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center justify-between p-3 rounded-lg border-2 border-dashed transition-all
        ${isDragging ? 'border-primary bg-primary/5 shadow-lg' : 'border-border bg-background hover:border-primary/50'}
      `}
    >
      <div className="flex items-center gap-3">
        <button {...attributes} {...listeners} className="drag-handle touch-none">
          <GripVertical className="w-4 h-4" />
        </button>
        <div className="text-muted-foreground">{SECTION_ICONS[section.type] || <FileText className="w-4 h-4" />}</div>
        <span className="text-sm font-medium text-foreground">{section.title}</span>
      </div>
      <Switch
        checked={section.enabled}
        onCheckedChange={(checked) => onToggle(section.id, checked)}
        disabled={section.type === 'personal'}
      />
    </div>
  );
};

export const SectionLayoutSettings: React.FC = () => {
  const { currentResume, updateResume } = useResume();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  if (!currentResume) return null;

  const sections = currentResume.sections || [];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      const newSections = arrayMove(sections, oldIndex, newIndex).map((s, i) => ({ ...s, order: i }));
      updateResume({ sections: newSections });
    }
  };

  const handleToggle = (id: string, enabled: boolean) => {
    const newSections = sections.map((s) => (s.id === id ? { ...s, enabled } : s));
    updateResume({ sections: newSections });
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground mb-2">Drag to reorder sections. Toggle to show/hide.</p>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {sections
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <SortableSectionItem key={section.id} section={section} onToggle={handleToggle} />
              ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
