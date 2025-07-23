"use client";

import React, { useState, ChangeEvent } from 'react';
import { ImageData } from '../chack/CheckoutContext';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageUpload: (imageData: ImageData) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, onClose, onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (jpeg, png, gif, webp).');
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should not exceed 5MB.');
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }

      setSelectedFile(file);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
      setError(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile && previewUrl) {
      const imageData: ImageData = {
        src: previewUrl,
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
      };
      onImageUpload(imageData);
      onClose();
      setSelectedFile(null);
      setPreviewUrl(null);
      setError(null);
    } else {
      setError('Please choose a picture to upload.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Picture</h2>

        <div className="mb-4">
          <label htmlFor="image-upload-input" className="block text-sm font-medium text-gray-700 mb-2">
            Choose an image:
          </label>
          <input
            type="file"
            id="image-upload-input"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {previewUrl && (
          <div className="mb-4 text-center">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <img src={previewUrl} alt="Preview" className="max-w-full h-auto max-h-60 mx-auto rounded-md shadow-sm border border-gray-200 object-contain" />
          </div>
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || !!error}
            className={`px-4 py-2 rounded-md text-white font-semibold transition-colors
              ${selectedFile && !error ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
          >
            Upload
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ImageUploadModal;