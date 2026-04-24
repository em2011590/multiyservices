'use client';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface FileDropzoneProps {
  onUpload: (file: File) => Promise<void>;
  accept?: Record<string, string[]>;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onUpload, accept }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await onUpload(file);
      toast.success('File uploaded successfully!');
      setFile(null);
    } catch (err: any) {
      toast.error(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-accent-cyan bg-accent-cyan/10' : 'border-white/20 hover:border-accent-cyan/50'
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="w-12 h-12 mx-auto mb-4 text-muted" />
          <p className="text-primary font-medium">Drag & drop a file here, or click to select</p>
          <p className="text-sm text-muted mt-2">Supports images, JSON, and common formats</p>
        </div>
      ) : (
        <div className="glass p-6 rounded-xl flex items-center justify-between border-accent-cyan/30">
          <div className="flex items-center gap-4">
            <div className="bg-accent-cyan/20 p-3 rounded-lg">
              <UploadCloud className="w-6 h-6 text-accent-cyan" />
            </div>
            <div>
              <p className="text-primary font-medium">{file.name}</p>
              <p className="text-xs text-muted">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFile(null)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              disabled={uploading}
            >
              <X className="w-5 h-5 text-muted hover:text-red-400" />
            </button>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-accent-cyan text-black px-4 py-2 flex items-center gap-2 rounded-md font-semibold hover:bg-accent-cyan/90 transition-colors disabled:opacity-50"
            >
              {uploading ? 'Processing...' : 'Upload & Convert'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
