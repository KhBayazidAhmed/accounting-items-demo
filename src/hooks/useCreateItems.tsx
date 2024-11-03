import { CreateItem } from "@/actions/items/action.items";
import { useIsOpen } from "@/context/ItemsProvider";
import { IItem } from "@/libs/Schema/Item.model";
import ValidateItemsFormData from "@/utils/ValidateItemsFormData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

export function useCreateItems() {
  const queryClient = useQueryClient();
  const { setIsOpen } = useIsOpen();
  const bgRef = useRef<HTMLDivElement | null>(null);

  const createItemsMutation = useMutation({
    mutationKey: ["create-item"],
    mutationFn: async (formData: FormData) => {
      ValidateItemsFormData(formData);
      const data: Partial<IItem> = {
        description: formData.get("description") as string,
        account: formData.get("account") as string,
        price: Number(formData.get("price")),
        discount: Number(formData.get("discount")),
        valueAddedTax: Number(formData.get("valueAddedTax")),
        type: formData.get("type") as "service" | "good",
      };

      const res = await CreateItem(data as IItem);
      if (!res.success) {
        throw new Error(res.error || "Something went wrong");
      }
      return res.data ? (JSON.parse(res.data) as IItem) : res.data;
    },
    onMutate: (formData) => {
      queryClient.cancelQueries({
        queryKey: ["create-item"],
      });
      setIsOpen(false);
      const data: Partial<IItem> = {
        description: formData.get("description") as string,
        account: formData.get("account") as string,
        price: Number(formData.get("price")),
        discount: Number(formData.get("discount")),
        valueAddedTax: Number(formData.get("valueAddedTax")),
        type: formData.get("type") as "service" | "good",
      };

      console.log("onMutate", data);
      queryClient.setQueryData(
        ["items-data-Table", 1],
        (oldData: { data: IItem[] }) => {
          console.log("oldData", oldData);
          console.log("data", data);
          return {
            ...oldData,
            data: [data, ...oldData.data],
          };
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["items-data-Table", 1],
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // setIsOpen(false);
    const formData = new FormData(event.target as HTMLFormElement);
    createItemsMutation.mutate(formData);
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (bgRef.current && !bgRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return {
    createItemsMutation,
    handleSubmit,
    setIsOpen,
    handleBackgroundClick,

    bgRef,
  };
}
