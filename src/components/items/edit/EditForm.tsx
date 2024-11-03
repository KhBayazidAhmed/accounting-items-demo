"use client";
import { GetItem } from "@/actions/items/action.items";
import ItemsFormInputs from "@/components/items/ItemsFormInputs";
import { useQuery } from "@tanstack/react-query";

export default function EditForm({ id }: { id: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["items-data-Table", id],
    queryFn: async () => {
      const res = await GetItem(id);
      if (!res.success) {
        throw new Error(res.error || "Something went wrong");
      }
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Edit Item</h1>
      <form className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {isLoading ? (
          <>
            <SkeletonLoader width="100%" height="2rem" />
            <SkeletonLoader width="100%" height="2rem" />
            <SkeletonLoader width="100%" height="2rem" />
            <SkeletonLoader width="100%" height="2rem" />
            <SkeletonLoader width="100%" height="2rem" />
          </>
        ) : (
          <ItemsFormInputs itemData={data} />
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200 mt-4"
        >
          Update Item
        </button>
      </form>
    </main>
  );
}
// SkeletonLoader.tsx
function SkeletonLoader({
  width = "100%",
  height = "1rem",
}: {
  width?: string;
  height?: string;
}) {
  return (
    <div
      style={{ width, height }}
      className="bg-gray-300 animate-pulse rounded "
    ></div>
  );
}
