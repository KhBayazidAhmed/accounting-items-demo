import React from "react";

export default function ItemsSearchSection() {
  return (
    <div className="w-full max-w-[70vw] mb-4 pt-2">
      <div className="flex  items-start w-full justify-between bg-white rounded-lg p-2 gap-2 ">
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow w-12 border border-gray-300 rounded-lg p-2 mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200">
          Search
        </button>
      </div>
    </div>
  );
}
