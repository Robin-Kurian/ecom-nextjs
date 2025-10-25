"use client";

import * as React from "react";

export default function SidebarDrawer({ open, onClose, children }: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out flex flex-col
          ${open ? 'translate-x-0' : 'translate-x-full pointer-events-none'}`}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <button
          className="absolute top-6 right-6 p-2 text-gray-500 hover:text-black text-2xl z-10"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          &times;
        </button>
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 pt-16">
          {children}
        </div>
      </div>
    </>
  );
} 