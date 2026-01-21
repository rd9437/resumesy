import React, { useRef } from 'react';
import { Camera, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PhotoUploadProps {
  photo?: string;
  onChange: (photo: string | undefined) => void;
  shape?: 'circle' | 'rounded' | 'square';
  size?: number;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
  photo,
  onChange,
  shape = 'circle',
  size = 100,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const borderRadius = shape === 'circle' ? '50%' : shape === 'rounded' ? '12px' : '4px';

  return (
    <div className="flex flex-col items-start gap-3">
      <label className="editor-label">Profile Photo</label>
      
      <div className="flex items-center gap-4">
        <div
          onClick={() => inputRef.current?.click()}
          className="relative cursor-pointer group"
          style={{
            width: size,
            height: size,
            borderRadius,
            overflow: 'hidden',
            border: '2px dashed hsl(var(--border))',
            backgroundColor: 'hsl(var(--muted))',
          }}
        >
          {photo ? (
            <>
              <img
                src={photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
              <Upload className="w-6 h-6 mb-1" />
              <span className="text-[10px]">Upload</span>
            </div>
          )}
        </div>

        {photo && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRemove}
            className="text-destructive hover:text-destructive"
          >
            <X className="w-4 h-4 mr-1" />
            Remove
          </Button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <p className="text-xs text-muted-foreground">
        Click to upload a photo. JPG, PNG or GIF.
      </p>
    </div>
  );
};
