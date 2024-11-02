import { useMutation } from "@tanstack/react-query";
import ItemsFormInputs from "./ItemsFormInputs";
import { CreateItem } from "@/actions/items/action.items";
import { IItem } from "@/libs/Schema/Item.model";

export default function ItemsForm({
  setIsOpen,
}: Readonly<{ setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }>) {
  const CreateItems = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!formData.get("description")) {
        throw new Error("Description is required");
      }
      if (!formData.get("account")) {
        throw new Error("Account is required");
      }
      if (!formData.get("price")) {
        throw new Error("Price is required");
      }
      if (!formData.get("discount")) {
        throw new Error("Discount is required");
      }
      if (!formData.get("valueAddedTax")) {
        throw new Error("Value Added Tax is required");
      }
      if (!formData.get("type")) {
        throw new Error("Type is required");
      }
      const data = {
        description: formData.get("description"),
        account: formData.get("account"),
        price: formData.get("price"),
        discount: formData.get("discount"),
        valueAddedTax: formData.get("valueAddedTax"),
        type: formData.get("type"),
      };
      const res = await CreateItem(data as unknown as IItem);
      if (!res.success) {
        throw new Error(res.error || "Something went wrong");
      }
      if (res.data) {
        return JSON.parse(res.data);
      }
      return res.data;
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsOpen(false);
    const formData = new FormData(event.target as HTMLFormElement);
    CreateItems.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <ItemsFormInputs />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200"
      >
        Create Item
      </button>
    </form>
  );
}
