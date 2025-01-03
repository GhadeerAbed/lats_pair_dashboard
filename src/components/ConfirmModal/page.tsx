
import React from 'react';

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="text-center mx-5">
      <h1 className="text-lg font-bold text-[#1D1D1D]">{title}</h1>
      <h2 className="text-lg text-[#1D1D1D] pt-3 pb-4">{message}</h2>
      <div className="mt-4 flex gap-4">
        <button
          onClick={onConfirm}
          className="bg-primary text-white px-4 py-2 rounded-md w-full"
        >
          delate
        </button>
        <button
          onClick={onCancel}
          className="text-primary border border-primary px-4 py-2 rounded-md w-full"
        >
          cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
