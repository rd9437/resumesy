import React from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Project } from '@/types/resume';
import { Plus, Trash2, GripVertical, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectsEditorProps {
  data: Project[];
  onChange: (data: Project[]) => void;
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

export const ProjectsEditor: React.FC<ProjectsEditorProps> = ({ data, onChange }) => {
  const addProject = () => {
    const newProject: Project = {
      id: uuidv4(),
      name: '',
      description: '',
      url: '',
      startDate: '',
      endDate: '',
    };
    onChange([...data, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange(data.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  const removeProject = (id: string) => {
    onChange(data.filter(proj => proj.id !== id));
  };

  // DnD-kit setup
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = data.findIndex(proj => proj.id === active.id);
    const newIndex = data.findIndex(proj => proj.id === over.id);
    if (oldIndex !== -1 && newIndex !== -1) {
      onChange(arrayMove(data, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={data.map(proj => proj.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence mode="popLayout">
            {data.map((proj, index) => (
              <SortableItem id={proj.id} key={proj.id}>
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
                      <span className="text-sm font-medium">Project {index + 1}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeProject(proj.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="editor-label">Project Name</label>
                      <input
                        type="text"
                        className="editor-input"
                        placeholder="E-commerce Platform"
                        value={proj.name}
                        onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="editor-label">URL (Optional)</label>
                      <div className="relative">
                        <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="url"
                          className="editor-input pl-10"
                          placeholder="https://project.com"
                          value={proj.url}
                          onChange={(e) => updateProject(proj.id, 'url', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="editor-label">Start Date</label>
                      <input
                        type="text"
                        className="editor-input"
                        placeholder="Jan 2023"
                        value={proj.startDate}
                        onChange={(e) => updateProject(proj.id, 'startDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="editor-label">End Date</label>
                      <input
                        type="text"
                        className="editor-input"
                        placeholder="Present"
                        value={proj.endDate}
                        onChange={(e) => updateProject(proj.id, 'endDate', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="editor-label">Description</label>
                    <textarea
                      className="editor-input min-h-[80px] resize-y"
                      placeholder="Describe the project, technologies used, and your role..."
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      rows={3}
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
        onClick={addProject}
        className="w-full border-dashed"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </Button>
    </div>
  );
};
