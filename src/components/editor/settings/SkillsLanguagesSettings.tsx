import React from 'react';
import { useResume } from '@/contexts/ResumeContext';
import { 
  SkillsSettings,
  LanguagesSettings,
  CertificatesSettings,
  SkillDisplayStyle,
  LanguageDisplayStyle,
  LevelIndicatorStyle,
  CompactSeparatorStyle,
  SubinfoStyle,
} from '@/types/resume';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const SkillsLanguagesSettings: React.FC = () => {
  const { currentResume, updateResume } = useResume();

  if (!currentResume) return null;

  const settings = currentResume.settings;
  const skills = settings.skills;
  const languages = settings.languages;
  const certificates = settings.certificates;

  const updateSkills = (updates: Partial<SkillsSettings>) => {
    updateResume({
      settings: { ...settings, skills: { ...skills, ...updates } }
    });
  };

  const updateLanguages = (updates: Partial<LanguagesSettings>) => {
    updateResume({
      settings: { ...settings, languages: { ...languages, ...updates } }
    });
  };

  const updateCertificates = (updates: Partial<CertificatesSettings>) => {
    updateResume({
      settings: { ...settings, certificates: { ...certificates, ...updates } }
    });
  };

  // Shared button style classes
  const getButtonClasses = (isSelected: boolean) => 
    `py-2.5 px-2 rounded-xl border-2 text-xs font-medium transition-all capitalize
    ${isSelected 
      ? 'border-primary bg-primary/10 text-primary' 
      : 'border-border hover:border-primary/50 text-muted-foreground'}`;

  // Shared column selector component
  const ColumnSelector = ({ value, onChange }: { value?: number | string; onChange: (cols: number) => void }) => (
    <div className="grid grid-cols-4 gap-2 mb-3">
      {[1, 2, 3, 4].map((cols) => {
        const isSelected = Number(value) === cols;
        return (
          <button
            key={cols}
            type="button"
            onClick={() => onChange(cols)}
            className={`py-2.5 rounded-xl border-2 flex justify-center gap-0.5 transition-all
              ${isSelected ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
          >
            {Array(cols).fill(0).map((_, i) => (
              <div key={i} className={`w-2 h-4 rounded-sm ${isSelected ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
            ))}
          </button>
        );
      })}
    </div>
  );

  // Shared Level Style Options component
  const LevelStyleOptions = ({ 
    value, 
    onChange 
  }: { 
    value: LevelIndicatorStyle | undefined; 
    onChange: (style: LevelIndicatorStyle) => void 
  }) => (
    <div className="grid grid-cols-3 gap-2 mb-3">
      {(['text', 'dots', 'bar'] as LevelIndicatorStyle[]).map((style) => (
        <button
          key={style}
          type="button"
          onClick={() => onChange(style)}
          className={getButtonClasses(value === style)}
        >
          {style.charAt(0).toUpperCase() + style.slice(1)}
        </button>
      ))}
    </div>
  );

  // Shared Compact Separator Options component
  const CompactSeparatorOptions = ({ 
    value, 
    onChange 
  }: { 
    value: CompactSeparatorStyle | undefined; 
    onChange: (style: CompactSeparatorStyle) => void 
  }) => (
    <div className="grid grid-cols-4 gap-2 mb-3">
      {(['bullet', 'pipe', 'newline', 'comma'] as CompactSeparatorStyle[]).map((style) => (
        <button
          key={style}
          type="button"
          onClick={() => onChange(style)}
          className={getButtonClasses(value === style)}
        >
          {style === 'bullet' ? 'Bullet' : style === 'pipe' ? 'Pipe' : style === 'newline' ? 'New Line' : 'Comma'}
        </button>
      ))}
    </div>
  );

  // Shared Subinfo Style Options component
  const SubinfoStyleOptions = ({ 
    value, 
    onChange 
  }: { 
    value: SubinfoStyle | undefined; 
    onChange: (style: SubinfoStyle) => void 
  }) => (
    <>
      <label className="text-xs font-medium text-muted-foreground mb-2 block">Subinfo Style</label>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {(['dash', 'colon', 'bracket'] as SubinfoStyle[]).map((style) => (
          <button
            key={style}
            type="button"
            onClick={() => onChange(style)}
            className={getButtonClasses(value === style)}
          >
            {style === 'dash' ? '– Dash' : style === 'colon' ? ': Colon' : '() Bracket'}
          </button>
        ))}
      </div>
    </>
  );

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <div>
        <h4 className="text-sm font-semibold text-primary mb-3">Skills</h4>
        
        {/* Display Style Row */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {(['grid', 'level', 'compact', 'bubble'] as SkillDisplayStyle[]).map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => updateSkills({ displayStyle: style })}
              className={getButtonClasses(skills.displayStyle === style)}
            >
              {style === 'bubble' ? 'Bubble' : style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>

        {/* Level Style Options (shown when Level is selected) */}
        {skills.displayStyle === 'level' && (
          <LevelStyleOptions 
            value={skills.levelStyle} 
            onChange={(style) => updateSkills({ levelStyle: style })} 
          />
        )}

        {/* Compact Separator Options (shown when Compact is selected) */}
        {skills.displayStyle === 'compact' && (
          <>
            <CompactSeparatorOptions 
              value={skills.compactSeparator} 
              onChange={(style) => updateSkills({ compactSeparator: style })} 
            />
            <SubinfoStyleOptions 
              value={skills.subinfoStyle} 
              onChange={(style) => updateSkills({ subinfoStyle: style })} 
            />
          </>
        )}

        {/* Subinfo Style for Bubble */}
        {skills.displayStyle === 'bubble' && (
          <SubinfoStyleOptions 
            value={skills.subinfoStyle} 
            onChange={(style) => updateSkills({ subinfoStyle: style })} 
          />
        )}

        {/* Column selector for Grid */}
        {skills.displayStyle === 'grid' && (
          <ColumnSelector value={skills.columns} onChange={(cols) => updateSkills({ columns: cols })} />
        )}

        {/* Enable Grouping */}
        <div className="flex items-center justify-between py-2">
          <Label htmlFor="skills-grouping" className="text-sm text-muted-foreground cursor-pointer">
            Enable Skills Grouping
          </Label>
          <Switch
            id="skills-grouping"
            checked={skills.enableGrouping || false}
            onCheckedChange={(checked) => updateSkills({ enableGrouping: checked })}
          />
        </div>

        {/* Show Group Names when grouping enabled */}
        {skills.enableGrouping && (
          <div className="flex items-center justify-between py-2">
            <Label htmlFor="skills-show-group-names" className="text-sm text-muted-foreground cursor-pointer">
              Show Skill Group Names
            </Label>
            <Switch
              id="skills-show-group-names"
              checked={skills.showGroupNames ?? true}
              onCheckedChange={(checked) => updateSkills({ showGroupNames: checked })}
            />
          </div>
        )}
      </div>

      <div className="border-t border-border" />

      {/* Languages Section */}
      <div>
        <h4 className="text-sm font-semibold text-primary mb-3">Languages</h4>
        
        {/* Display Style Row */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {(['grid', 'level', 'compact', 'bubble'] as LanguageDisplayStyle[]).map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => updateLanguages({ displayStyle: style })}
              className={getButtonClasses(languages.displayStyle === style)}
            >
              {style === 'bubble' ? 'Bubble' : style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>

        {/* Level Style Options (shown when Level is selected) */}
        {languages.displayStyle === 'level' && (
          <LevelStyleOptions 
            value={languages.levelStyle} 
            onChange={(style) => updateLanguages({ levelStyle: style })} 
          />
        )}

        {/* Compact Separator Options (shown when Compact is selected) */}
        {languages.displayStyle === 'compact' && (
          <>
            <CompactSeparatorOptions 
              value={languages.compactSeparator} 
              onChange={(style) => updateLanguages({ compactSeparator: style })} 
            />
            <SubinfoStyleOptions 
              value={languages.subinfoStyle} 
              onChange={(style) => updateLanguages({ subinfoStyle: style })} 
            />
          </>
        )}

        {/* Subinfo Style for Bubble */}
        {languages.displayStyle === 'bubble' && (
          <SubinfoStyleOptions 
            value={languages.subinfoStyle} 
            onChange={(style) => updateLanguages({ subinfoStyle: style })} 
          />
        )}

        {/* Column selector for Grid */}
        {languages.displayStyle === 'grid' && (
          <ColumnSelector value={languages.columns} onChange={(cols) => updateLanguages({ columns: cols })} />
        )}

        {/* Show Proficiency Level */}
        <div className="flex items-center justify-between py-2">
          <Label htmlFor="lang-level" className="text-sm text-muted-foreground cursor-pointer">
            Show Proficiency Level
          </Label>
          <Switch
            id="lang-level"
            checked={languages.showLevel}
            onCheckedChange={(checked) => updateLanguages({ showLevel: checked })}
          />
        </div>
      </div>

      <div className="border-t border-border" />

      {/* Certifications Section */}
      <div>
        <h4 className="text-sm font-semibold text-primary mb-3">Certifications</h4>
        
        {/* Display Style Row */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {(['grid', 'level', 'compact', 'bubble'] as ('grid' | 'level' | 'compact' | 'bubble')[]).map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => updateCertificates({ displayStyle: style as CertificatesSettings['displayStyle'] })}
              className={getButtonClasses(certificates?.displayStyle === style)}
            >
              {style === 'bubble' ? 'Bubble' : style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>

        {/* Compact Separator Options (shown when Compact is selected) */}
        {certificates?.displayStyle === 'compact' && (
          <>
            <CompactSeparatorOptions 
              value={certificates?.compactSeparator} 
              onChange={(style) => updateCertificates({ compactSeparator: style })} 
            />
            <SubinfoStyleOptions 
              value={certificates?.subinfoStyle} 
              onChange={(style) => updateCertificates({ subinfoStyle: style })} 
            />
          </>
        )}

        {/* Subinfo Style for Bubble */}
        {certificates?.displayStyle === 'bubble' && (
          <SubinfoStyleOptions 
            value={certificates?.subinfoStyle} 
            onChange={(style) => updateCertificates({ subinfoStyle: style })} 
          />
        )}

        {/* Column selector for Grid */}
        {certificates?.displayStyle === 'grid' && (
          <ColumnSelector value={certificates?.columns || 2} onChange={(cols) => updateCertificates({ columns: cols })} />
        )}
      </div>
    </div>
  );
};