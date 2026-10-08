'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import Image from 'next/image';

export default function ToastContainer() {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 p-4 bg-white/95 backdrop-blur-md border border-gray-200 shadow-xl rounded-xl transition-all animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-center gap-3 min-w-0">
            {toast.image ? (
              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100 border border-gray-200">
                {/* Fallback img element for reliable image load */}
                <img
                  src={toast.image}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-6 h-6 text-blue-500 shrink-0" />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
            )}
            <p className="text-sm font-medium text-gray-800 line-clamp-2">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
