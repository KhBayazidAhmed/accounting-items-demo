import { GetItems } from "@/actions/items/action.items";
import { useQuery } from "@tanstack/react-query";

export default function useGetItems({
  pageNumber,
  setPageNumber,
}: {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}) {
  const ItemsPerPage = 10;
  const { data, error, isLoading } = useQuery({
    queryKey: ["items-data-Table", pageNumber],
    queryFn: async () => {
      const res = await GetItems(pageNumber, ItemsPerPage);
      if (!res.success) {
        throw new Error(res.error || "Something went wrong");
      }
      return res;
    },
    gcTime: 1000 * 60 * 10, // 10 minutes
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    setPageNumber((prev) => prev + 1);
  };
  return {
    data,
    error,
    isLoading,
    handlePreviousPage,
    handleNextPage,
  };
}
