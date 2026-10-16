import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ResetModal({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirmar' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-[#131015] border-2 border-[#542424] rounded-2xl p-6 shadow-2xl text-[#f3ede2]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#8a7e6e] hover:text-[#f3ede2] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#3d1818] border border-[#6b2626] flex items-center justify-center text-[#e74c3c]">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold font-['Cinzel',serif] text-[#f5ede0]">
            {title}
          </h3>
        </div>

        <p className="text-sm text-[#bcaea0] leading-relaxed mb-6">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#1e1a16] hover:bg-[#2c241c] text-[#a49683] border border-[#3e3223] transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#e74c3c] hover:bg-[#c0392b] text-white shadow-lg shadow-[#e74c3c]/30 transition-all"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
