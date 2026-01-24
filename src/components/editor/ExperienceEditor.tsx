import React from 'react';
import { RichTextEditor } from './RichTextEditor';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { WorkExperience } from '@/types/resume';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';

interface ExperienceEditorProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

const SortableItem: React.FC<{ id: string; children: React.ReactNode }> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 10 : 'auto',
      }}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
};

export const ExperienceEditor: React.FC<ExperienceEditorProps> = ({ data, onChange }) => {
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: uuidv4(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...data, newExp]);
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: string | boolean) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  // DnD-kit setup
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = data.findIndex(exp => exp.id === active.id);
    const newIndex = data.findIndex(exp => exp.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      onChange(arrayMove(data, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={data.map(exp => exp.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence mode="popLayout">
            {data.map((exp, index) => (
              <SortableItem id={exp.id} key={exp.id}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GripVertical className="w-4 h-4 drag-handle" />
                      <span className="text-sm font-medium">Experience {index + 1}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeExperience(exp.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="editor-label">Position / Title</label>
                      <input
                        type="text"
                        className="editor-input"
                        placeholder="Software Engineer"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="editor-label">Company</label>
                      <input
                        type="text"
                        className="editor-input"
                        placeholder="Acme Inc."
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="editor-label">Location</label>
                      <input
                        type="text"
                        className="editor-input"
                        placeholder="San Francisco, CA"
                        value={exp.location}
                        onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="editor-label">Start Date</label>
                      <input
                        type="text"
                        className="editor-input"
                        placeholder="Jan 2020"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="editor-label">End Date</label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          className="editor-input"
                          placeholder="Dec 2023"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                          disabled={exp.current}
                        />
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            className="rounded border-input"
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          />
                          <span className="text-muted-foreground">Current position</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="editor-label">Description</label>
                    <RichTextEditor
                      value={exp.description}
                      onChange={(html) => updateExperience(exp.id, 'description', html)}
                      placeholder={"• Led development of new features..."}
                    />
                  </div>
                </motion.div>
              </SortableItem>
            ))}
          </AnimatePresence>
        </SortableContext>
      </DndContext>

      <Button
        variant="outline"
        onClick={addExperience}
        className="w-full border-dashed"
      >
        <Plus className="w-4 h-4" />
        Add Experience
      </Button>
    </div>
  );
};
