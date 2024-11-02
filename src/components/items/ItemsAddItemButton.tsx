"use client";
import React from "react";
import ItemsForm from "./ItemsForm";

function ItemsAddItemButton() {
  const [isOpen, setIsOpen] = React.useState(false);
  const bgRef = React.useRef<HTMLDivElement | null>(null);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Close modal if clicking outside the modal content
    if (bgRef.current && !bgRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex items-center w-[70vw] justify-end bg-white rounded-lg p-2 gap-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition duration-200"
      >
        Add Item
      </button>
      {isOpen && (
        <div
          onClick={handleBackgroundClick}
          className="fixed inset-0 z-10 bg-black/50 backdrop-blur-sm flex items-center justify-center"
        >
          <div
            ref={bgRef}
            className="relative bg-white rounded-lg p-4 text-left shadow-xl transition duration-200 w-full max-w-md"
          >
            <div className="flex justify-end items-center mb-4">
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-gray-200  rounded-lg p-2 bg-gray-300 transition duration-200"
              >
                Close
              </button>
            </div>
            <ItemsForm setIsOpen={setIsOpen} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemsAddItemButton;
