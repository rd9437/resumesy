import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  Packer,
  AlignmentType,
  BorderStyle,
  TableOfContents,
  convertInchesToTwip,
} from 'docx';
import { saveAs } from 'file-saver';
import { Resume } from '@/types/resume';

export const exportToDocx = async (resume: Resume): Promise<void> => {
  const { personalDetails, summary, experience, education, skills, languages, projects, certifications } = resume;
  const accentColor = resume.settings.colors.accentColor || '#0d9488';

  const children: Paragraph[] = [];

  // Name
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: personalDetails.fullName || 'Your Name',
          bold: true,
          size: 48,
          color: accentColor.replace('#', ''),
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
    })
  );

  // Job Title
  if (personalDetails.jobTitle) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: personalDetails.jobTitle,
            size: 28,
            color: '666666',
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      })
    );
  }

  // Contact Info
  const contactParts: string[] = [];
  if (personalDetails.email) contactParts.push(personalDetails.email);
  if (personalDetails.phone) contactParts.push(personalDetails.phone);
  if (personalDetails.location) contactParts.push(personalDetails.location);
  if (personalDetails.website) contactParts.push(personalDetails.website);
  if (personalDetails.linkedin) contactParts.push(personalDetails.linkedin);

  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactParts.join(' | '),
            size: 20,
            color: '888888',
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
      })
    );
  }

  // Section Helper
  const addSection = (title: string) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: title.toUpperCase(),
            bold: true,
            size: 24,
            color: accentColor.replace('#', ''),
          }),
        ],
        spacing: { before: 400, after: 150 },
        border: {
          bottom: {
            color: accentColor.replace('#', ''),
            space: 1,
            size: 6,
            style: BorderStyle.SINGLE,
          },
        },
      })
    );
  };

  // Summary
  if (summary) {
    addSection('Professional Summary');
    children.push(
      new Paragraph({
        children: [new TextRun({ text: summary, size: 22 })],
        spacing: { after: 200 },
      })
    );
  }

  // Experience
  if (experience.length > 0) {
    addSection('Work Experience');
    experience.forEach((exp) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: exp.position, bold: true, size: 24 }),
            new TextRun({ text: ` at ${exp.company}`, size: 24 }),
          ],
          spacing: { before: 150, after: 50 },
        })
      );
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}${exp.location ? ' | ' + exp.location : ''}`,
              size: 20,
              color: '888888',
              italics: true,
            }),
          ],
          spacing: { after: 100 },
        })
      );
      if (exp.description) {
        exp.description.split('\n').forEach((line) => {
          if (line.trim()) {
            children.push(
              new Paragraph({
                children: [new TextRun({ text: line.trim(), size: 22 })],
                bullet: { level: 0 },
                spacing: { after: 50 },
              })
            );
          }
        });
      }
    });
  }

  // Education
  if (education.length > 0) {
    addSection('Education');
    education.forEach((edu) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: `${edu.degree}${edu.field ? ' in ' + edu.field : ''}`, bold: true, size: 24 }),
          ],
          spacing: { before: 150, after: 50 },
        })
      );
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: edu.institution, size: 22 }),
            new TextRun({
              text: ` | ${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}`,
              size: 20,
              color: '888888',
            }),
          ],
          spacing: { after: 100 },
        })
      );
    });
  }

  // Skills
  if (skills.length > 0) {
    addSection('Skills');
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: skills.map((s) => s.name).join(' • '),
            size: 22,
          }),
        ],
        spacing: { after: 200 },
      })
    );
  }

  // Projects
  if (projects.length > 0) {
    addSection('Projects');
    projects.forEach((proj) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: proj.name, bold: true, size: 24 }),
          ],
          spacing: { before: 150, after: 50 },
        })
      );
      if (proj.description) {
        children.push(
          new Paragraph({
            children: [new TextRun({ text: proj.description, size: 22 })],
            spacing: { after: 100 },
          })
        );
      }
    });
  }

  // Certifications
  if (certifications.length > 0) {
    addSection('Certifications');
    certifications.forEach((cert) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({ text: cert.name, bold: true, size: 22 }),
            new TextRun({ text: ` - ${cert.issuer}`, size: 22 }),
            cert.date ? new TextRun({ text: ` (${cert.date})`, size: 20, color: '888888' }) : new TextRun({ text: '' }),
          ],
          spacing: { after: 100 },
        })
      );
    });
  }

  // Languages
  if (languages.length > 0) {
    addSection('Languages');
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: languages.map((l) => `${l.name} (${l.proficiency})`).join(' • '),
            size: 22,
          }),
        ],
        spacing: { after: 200 },
      })
    );
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.75),
              right: convertInchesToTwip(0.75),
              bottom: convertInchesToTwip(0.75),
              left: convertInchesToTwip(0.75),
            },
          },
        },
        children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${resume.name || 'resume'}.docx`);
};
