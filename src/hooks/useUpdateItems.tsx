import { UpdateItem } from "@/actions/items/action.items";
import { IItem } from "@/libs/Schema/Item.model";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateItems() {
  const queryClient = useQueryClient();
  const updateItemsMutation = useMutation({
    mutationKey: ["update-item"],
    mutationFn: async ({ id, data }: { id: string; data: Partial<IItem> }) => {
      const res = await UpdateItem(id, data as IItem);
      if (!res.success) {
        throw new Error(res.error || "Something went wrong");
      }
      return res;
    },
    onMutate: ({ id, data }) => {
      queryClient.cancelQueries({
        queryKey: ["update-item"],
      });
      queryClient.setQueryData(
        ["items-data-Table", 1],
        (oldData: { data: IItem[] }) => {
          return {
            ...oldData,
            data: oldData.data.map((item: IItem) => {
              if (item._id === id) {
                return {
                  ...item,
                  ...data,
                };
              }
              return item;
            }),
          };
        }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items-data-Table", 1],
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["items-data-Table", 1],
      });
    },
  });

  return {
    updateItemsMutation,
    queryClient,
  };
}
