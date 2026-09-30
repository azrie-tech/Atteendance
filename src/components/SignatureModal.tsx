import React from 'react';
import { X } from 'lucide-react';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  signatureUrl: string;
  attendeeName: string;
}

export const SignatureModal: React.FC<SignatureModalProps> = ({
  isOpen,
  onClose,
  signatureUrl,
  attendeeName
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h4 className="text-sm font-bold text-slate-900">Digital Signature: {attendeeName}</h4>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center min-h-[160px]">
          {signatureUrl ? (
            <img
              src={signatureUrl}
              alt="Enlarged Signature"
              className="max-h-48 max-w-full object-contain"
            />
          ) : (
            <span className="text-xs text-slate-400">No signature image available</span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Cryptographically stored base64 image</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
