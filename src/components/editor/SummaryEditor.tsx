import React from 'react';
import { RichTextEditor } from './RichTextEditor';

interface SummaryEditorProps {
  data: string;
  onChange: (data: string) => void;
}

export const SummaryEditor: React.FC<SummaryEditorProps> = ({ data, onChange }) => {
  return (
    <div>
      <label className="editor-label">Professional Summary</label>
      <RichTextEditor
        value={data}
        onChange={onChange}
        placeholder="Write a brief 2-4 sentence summary highlighting your experience, skills, and career goals..."
      />
      <p className="text-xs text-muted-foreground mt-1.5">
        Tip: Keep it concise and tailored to the job you're applying for.
      </p>
    </div>
  );
};
