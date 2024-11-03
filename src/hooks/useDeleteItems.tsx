import { DeleteItem } from "@/actions/items/action.items";
import { IItem } from "@/libs/Schema/Item.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteItems() {
  const queryClient = useQueryClient();
  const deleteItemMutation = useMutation({
    mutationKey: ["delete-item"],
    mutationFn: async (id: string) => {
      const res = await DeleteItem(id);
      if (!res.success) {
        throw new Error(res.error || "Something went wrong");
      }
      return res;
    },
    onMutate: (data) => {
      queryClient.cancelQueries({
        queryKey: ["items-data-Table", 1],
      });
      queryClient.setQueryData(
        ["items-data-Table", 1],
        (oldData: { data: IItem[] }) => {
          console.log("oldData", oldData);
          console.log("data", data);
          return {
            ...oldData,
            data: oldData.data.filter((item) => item._id !== data),
          };
        }
      );
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["items-data-Table", 1],
      });
    },
  });
  return {
    deleteItemMutation,
  };
}
