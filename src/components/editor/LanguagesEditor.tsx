import React from 'react';
import { Language } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguagesEditorProps {
  data: Language[];
  onChange: (data: Language[]) => void;
}

const proficiencyLevels: { value: Language['proficiency']; label: string }[] = [
  { value: 'basic', label: 'Basic' },
  { value: 'conversational', label: 'Conversational' },
  { value: 'proficient', label: 'Proficient' },
  { value: 'fluent', label: 'Fluent' },
  { value: 'native', label: 'Native' },
];

export const LanguagesEditor: React.FC<LanguagesEditorProps> = ({ data, onChange }) => {
  const addLanguage = () => {
    const newLang: Language = {
      id: uuidv4(),
      name: '',
      proficiency: 'proficient',
    };
    onChange([...data, newLang]);
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    onChange(data.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    ));
  };

  const removeLanguage = (id: string) => {
    onChange(data.filter(lang => lang.id !== id));
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {data.map((lang, index) => (
          <motion.div
            key={lang.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50"
          >
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="editor-label">Language</label>
                <input
                  type="text"
                  className="editor-input"
                  placeholder="Spanish"
                  value={lang.name}
                  onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="editor-label">Proficiency</label>
                <select
                  className="editor-input"
                  value={lang.proficiency}
                  onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                >
                  {proficiencyLevels.map(level => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => removeLanguage(lang.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10 mt-5"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        variant="outline"
        onClick={addLanguage}
        className="w-full border-dashed"
      >
        <Plus className="w-4 h-4" />
        Add Language
      </Button>
    </div>
  );
};
