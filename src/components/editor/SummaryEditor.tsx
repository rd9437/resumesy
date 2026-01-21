import React from 'react';

interface SummaryEditorProps {
  data: string;
  onChange: (data: string) => void;
}

export const SummaryEditor: React.FC<SummaryEditorProps> = ({ data, onChange }) => {
  return (
    <div>
      <label className="editor-label">Professional Summary</label>
      <textarea
        className="editor-input min-h-[120px] resize-y"
        placeholder="Write a brief 2-4 sentence summary highlighting your experience, skills, and career goals..."
        value={data}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
      />
      <p className="text-xs text-muted-foreground mt-1.5">
        Tip: Keep it concise and tailored to the job you're applying for.
      </p>
    </div>
  );
};
