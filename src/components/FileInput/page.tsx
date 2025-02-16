
"use client";
import React, { useState, ChangeEvent, useEffect } from "react";

interface FileInputProps {
  FileClassName?: string;
  onChange: (file: File) => void;
  profileImage?: string | null;
}

export const FileInput: React.FC<FileInputProps> = ({
  FileClassName,
  onChange,
  profileImage,
}) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(profileImage || null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // **Wait for profileImage to be available before setting the logo URL**
  useEffect(() => {
    if (profileImage) {
      setLogoUrl(profileImage);
    }
  }, [profileImage]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(""); // Reset error messages
    const file = event.target.files?.[0];

    if (file) {
      const supportedTypes = ["image/jpeg", "image/png"];
      if (!supportedTypes.includes(file.type)) {
        setErrorMessage("Unsupported file type. Please upload a JPEG, PNG.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      onChange(file);
    }
  };

  // **Determine which image to display**
  const imageUrl =
    uploadedImage ||
    (logoUrl &&
      (logoUrl.startsWith("http")
        ? logoUrl
        : `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${logoUrl}`));

  return (
    <div className="flex flex-col mb-4">
      <div className={`flex items-center ${FileClassName}`}>
        {imageUrl && (
          <div className="border border-darkSecondary">
            <img
              src={imageUrl}
              alt="Uploaded Logo"
              width={80}
              height={80}
              key={imageUrl} // Forces re-render when image URL changes
            />
          </div>
        )}
        <label className="py-3 cursor-pointer">
          <p className="underline text-base font-semibold text-fontColor1">
            Upload Cover Image
          </p>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm font-Sans pb-2 -mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

FileInput.displayName = "FileInput";

export default FileInput;
