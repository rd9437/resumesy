import React from 'react';
import { Education } from '@/types/resume';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';

interface EducationEditorProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationEditor: React.FC<EducationEditorProps> = ({ data, onChange }) => {
  const addEducation = () => {
    const newEdu: Education = {
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    onChange([...data, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string | boolean) => {
    onChange(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id: string) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {data.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <GripVertical className="w-4 h-4 drag-handle" />
                <span className="text-sm font-medium">Education {index + 1}</span>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => removeEducation(edu.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="editor-label">Institution</label>
                <input
                  type="text"
                  className="editor-input"
                  placeholder="Stanford University"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                />
              </div>
              <div>
                <label className="editor-label">Degree</label>
                <input
                  type="text"
                  className="editor-input"
                  placeholder="Bachelor of Science"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="editor-label">Field of Study</label>
                <input
                  type="text"
                  className="editor-input"
                  placeholder="Computer Science"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                />
              </div>
              <div>
                <label className="editor-label">Location</label>
                <input
                  type="text"
                  className="editor-input"
                  placeholder="Stanford, CA"
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="editor-label">Start Date</label>
                <input
                  type="text"
                  className="editor-input"
                  placeholder="Sep 2016"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                />
              </div>
              <div>
                <label className="editor-label">End Date</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    className="editor-input"
                    placeholder="May 2020"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    disabled={edu.current}
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="rounded border-input"
                      checked={edu.current}
                      onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                    />
                    <span className="text-muted-foreground">Currently studying</span>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="editor-label">Description (Optional)</label>
              <textarea
                className="editor-input min-h-[80px] resize-y"
                placeholder="GPA, honors, relevant coursework, achievements..."
                value={edu.description}
                onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                rows={3}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        variant="outline"
        onClick={addEducation}
        className="w-full border-dashed"
      >
        <Plus className="w-4 h-4" />
        Add Education
      </Button>
    </div>
  );
};
