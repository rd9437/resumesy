import React, { useState } from 'react';
import { Skill } from '@/types/resume';
import { Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '@/contexts/ResumeContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface SkillsEditorProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export const SkillsEditor: React.FC<SkillsEditorProps> = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState('');
  const [newGroup, setNewGroup] = useState('');
  const [showGroupInput, setShowGroupInput] = useState(false);
  const { currentResume, updateResume } = useResume();

  const enableGrouping = currentResume?.settings?.skills?.enableGrouping || false;

  const toggleGrouping = (checked: boolean) => {
    if (currentResume) {
      updateResume({
        settings: {
          ...currentResume.settings,
          skills: {
            ...currentResume.settings.skills,
            enableGrouping: checked,
          },
        },
      });
    }
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    const skill: Skill = {
      id: uuidv4(),
      name: newSkill.trim(),
      level: 'intermediate',
      group: showGroupInput && newGroup.trim() ? newGroup.trim() : undefined,
    };
    onChange([...data, skill]);
    setNewSkill('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (id: string) => {
    onChange(data.filter(skill => skill.id !== id));
  };

  // Get unique groups
  const groups = Array.from(new Set(data.filter(s => s.group).map(s => s.group)));
  const ungroupedSkills = data.filter(s => !s.group);
  const groupedSkills = groups.map(group => ({
    name: group,
    skills: data.filter(s => s.group === group),
  }));

  return (
    <div className="space-y-4">
      {/* Skill Grouping Toggle in Content Tab */}
      <div className="flex items-center justify-between py-2 px-3 bg-muted/30 rounded-lg">
        <Label htmlFor="content-skills-grouping" className="text-sm text-foreground cursor-pointer">
          Enable Skills Grouping
        </Label>
        <Switch
          id="content-skills-grouping"
          checked={enableGrouping}
          onCheckedChange={toggleGrouping}
        />
      </div>

      {/* Add skill input */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            className="editor-input flex-1"
            placeholder="Type a skill and press Enter..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={addSkill} disabled={!newSkill.trim()}>
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>

        {enableGrouping && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGroupInput(!showGroupInput)}
              className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
            >
              {showGroupInput ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {showGroupInput ? 'Hide group' : 'Add to group'}
            </button>
            {showGroupInput && (
              <input
                type="text"
                className="editor-input flex-1 text-sm"
                placeholder="Group name (e.g., Programming Languages)"
                value={newGroup}
                onChange={(e) => setNewGroup(e.target.value)}
                list="skill-groups"
              />
            )}
            <datalist id="skill-groups">
              {groups.map(g => (
                <option key={g} value={g} />
              ))}
            </datalist>
          </div>
        )}
      </div>

      {/* Skills display */}
      {enableGrouping && groupedSkills.length > 0 ? (
        <div className="space-y-4">
          {groupedSkills.map((group) => (
            <div key={group.name} className="p-3 bg-muted/30 rounded-lg">
              <h4 className="text-sm font-medium text-foreground mb-2">{group.name}</h4>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence mode="popLayout">
                  {group.skills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="group flex items-center gap-1 px-3 py-1.5 bg-accent rounded-full border border-border/50"
                    >
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="w-4 h-4 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
          
          {ungroupedSkills.length > 0 && (
            <div className="p-3 bg-muted/30 rounded-lg">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Other Skills</h4>
              <div className="flex flex-wrap gap-2">
                <AnimatePresence mode="popLayout">
                  {ungroupedSkills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      className="group flex items-center gap-1 px-3 py-1.5 bg-accent rounded-full border border-border/50"
                    >
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="w-4 h-4 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <AnimatePresence mode="popLayout">
            {data.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="group flex items-center gap-1 px-3 py-1.5 bg-accent rounded-full border border-border/50"
              >
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {data.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">
          No skills added yet. Start typing to add your skills.
        </p>
      )}

      <p className="text-xs text-muted-foreground">
        Tip: Include both technical skills (Python, React) and soft skills (Leadership, Communication).
      </p>
    </div>
  );
};
