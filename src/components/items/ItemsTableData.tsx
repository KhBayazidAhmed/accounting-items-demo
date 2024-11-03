"use client";

import { useCreateItems } from "@/hooks/useCreateItems";
import useDeleteItems from "@/hooks/useDeleteItems";
import useGetItems from "@/hooks/useGetItems";
import Link from "next/link";
import { useState } from "react";

export default function ItemsTableData() {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, error, isLoading, handleNextPage, handlePreviousPage } =
    useGetItems({ pageNumber, setPageNumber });

  const { createItemsMutation } = useCreateItems();
  const { deleteItemMutation } = useDeleteItems();

  return (
    <div className="flex flex-col gap-4 w-full max-w-[90vw] lg:max-w-[70vw] mb-4 mx-auto">
      <h1 className="text-xl lg:text-2xl font-semibold text-center">
        Items Table
      </h1>

      {(createItemsMutation.isError || deleteItemMutation.isError || error) && (
        <p className="text-red-500 text-center">
          {createItemsMutation.error?.message ||
            deleteItemMutation.error?.message ||
            `Error: ${error?.message}`}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm lg:text-base">
              <th className="py-3 px-4 border-b">Description</th>
              <th className="py-3 px-4 border-b">Type</th>
              <th className="py-3 px-4 border-b">Price</th>
              <th className="py-3 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="py-3 px-4 border-b">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </td>
                </tr>
              ))
            ) : data?.data?.length == 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-5 text-gray-500">
                  No items found
                </td>
              </tr>
            ) : (
              data?.data?.map((item, index) => (
                <tr
                  key={index}
                  className="text-gray-600 text-center text-sm lg:text-base"
                >
                  <td className="py-3 px-4 border-b">{item.description}</td>
                  <td className="py-3 px-4 border-b">{item.type}</td>
                  <td className="py-3 px-4 border-b">${item.price}</td>
                  <td className="py-3 px-4 border-b ">
                    <div className="flex gap-2 justify-center items-center">
                      <Link
                        href={`/items/edit/${item._id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-300 transition duration-200"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          deleteItemMutation.mutate(item._id as string);
                        }}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-300 transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex mb-10 flex-col lg:flex-row justify-center items-center gap-2 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={pageNumber === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:bg-gray-200 transition duration-200"
        >
          Previous
        </button>
        <span className="text-sm lg:text-base">
          Page {pageNumber} of {data?.totalTable}
        </span>
        <button
          onClick={handleNextPage}
          disabled={
            (data && data.totalTable === pageNumber) || data?.totalTable === 0
          }
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 disabled:bg-gray-200 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}
