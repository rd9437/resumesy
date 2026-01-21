import React, { forwardRef } from 'react';
import { Resume } from '@/types/resume';
import { ProfessionalTemplate } from './ProfessionalTemplate';
import { MultiPageResumePreview } from './MultiPageResumePreview';

interface ResumePreviewProps {
  resume: Resume;
  scale?: number;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resume, scale = 1 }, ref) => {
    // Always use multipage preview for all templates
    return <MultiPageResumePreview resume={resume} scale={scale} ref={ref} />;
  }
);

ResumePreview.displayName = 'ResumePreview';
