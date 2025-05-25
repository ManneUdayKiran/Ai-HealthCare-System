
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileText, Check, X } from 'lucide-react';
import { Label } from './ui/label';

interface VerificationFile {
  name: string;
  size: number;
  type: string;
}

interface DoctorVerificationProps {
  onFilesSelected: (files: VerificationFile[]) => void;
  selectedFiles: VerificationFile[];
}

const DoctorVerification: React.FC<DoctorVerificationProps> = ({ 
  onFilesSelected,
  selectedFiles 
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: VerificationFile[] = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      
      onFilesSelected([...selectedFiles, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles: VerificationFile[] = Array.from(e.dataTransfer.files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      
      onFilesSelected([...selectedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    onFilesSelected(updatedFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500 mb-2">
        Please upload documents that verify your medical credentials (license, certification, diploma).
      </div>
      
      <Card>
        <CardContent className="p-4">
          {selectedFiles.length > 0 ? (
            <div className="space-y-2">
              <Label>Selected Documents:</Label>
              <ul className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                      <span className="text-xs text-gray-500 ml-2">({formatFileSize(file.size)})</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFile(index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
            
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center mt-2 ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm font-medium text-gray-900">
              {selectedFiles.length > 0 ? 'Add more files' : 'Upload verification documents'}
            </p>
            <label className="mt-2 cursor-pointer">
              <Button variant="outline" size="sm" className="relative">
                Browse Files
                <input
                  type="file"
                  multiple
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
              </Button>
            </label>
            <p className="mt-2 text-xs text-gray-500">
              PDF, JPG, PNG, DOC up to 10MB
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorVerification;
