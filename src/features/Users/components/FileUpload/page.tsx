"use client"
import React, { useState } from "react";
export const FileUpload = ({ label, id, onFilesChange ,fileClassName}:{label?:string, id:string, onFilesChange:any ,fileClassName?:string}) => {
  const [previewImages, setPreviewImages] = useState([]);

  const handleImageChange = (e:any) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file:any) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setPreviewImages((prev) => [...prev, ...previews]);

    if (onFilesChange) {
      onFilesChange(files); // Pass files up to parent component
    }
  };

  return (
    <div className={`mb-5 ${fileClassName}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="file"
          id={id}
          multiple
          accept="image/*"
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer w-[100px]"
          onChange={handleImageChange}
        />
        <div className="flex items-center justify-center w-full h-12 border border-gray-300 rounded-md bg-white text-gray-400 text-sm cursor-pointer">
          <span>تحميل صور المنتج</span>
          <svg
            className="w-5 h-5 ml-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 16v-1a4 4 0 014-4h10a4 4 0 014 4v1M7 16v6h10v-6M12 7v6m-4-4l4-4 4 4"
            ></path>
          </svg>
        </div>
      </div>
      
      {/* Preview images */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {previewImages.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt="Preview"
            className="w-full h-24 object-cover rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default FileUpload;

