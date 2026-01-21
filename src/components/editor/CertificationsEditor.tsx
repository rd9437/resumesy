import React from 'react';
import { Certification } from '@/types/resume';
import { Plus, Trash2, GripVertical, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';

interface CertificationsEditorProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export const CertificationsEditor: React.FC<CertificationsEditorProps> = ({ data, onChange }) => {
  const addCertification = () => {
    const newCert: Certification = {
      id: uuidv4(),
      name: '',
      issuer: '',
      date: '',
      url: '',
    };
    onChange([...data, newCert]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange(data.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    ));
  };

  const removeCertification = (id: string) => {
    onChange(data.filter(cert => cert.id !== id));
  };

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {data.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 bg-muted/30 rounded-lg border border-border/50 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <GripVertical className="w-4 h-4 drag-handle" />
                <span className="text-sm font-medium">Certification {index + 1}</span>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => removeCertification(cert.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="editor-label">Certification Name</label>
                <input
                  type="text"
                  className="editor-input"
                  placeholder="AWS Solutions Architect"
                  value={cert.name}
                  onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="editor-label">Issuing Organization</label>
                <input
                  type="text"
                  className="editor-input"
                  placeholder="Amazon Web Services"
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="editor-label">Date Obtained</label>
                <input
                  type="text"
                  className="editor-input"
                  placeholder="Mar 2023"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                />
              </div>
              <div>
                <label className="editor-label">Credential URL (Optional)</label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="url"
                    className="editor-input pl-10"
                    placeholder="https://credential.net/..."
                    value={cert.url}
                    onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        variant="outline"
        onClick={addCertification}
        className="w-full border-dashed"
      >
        <Plus className="w-4 h-4" />
        Add Certification
      </Button>
    </div>
  );
};
