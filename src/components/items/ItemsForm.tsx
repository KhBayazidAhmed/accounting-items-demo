import { useCreateItems } from "@/hooks/useCreateItems";
import ItemsFormInputs from "./ItemsFormInputs";

export default function ItemsForm() {
  const { handleSubmit } = useCreateItems();

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <ItemsFormInputs itemData={undefined} />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200"
      >
        Create Item
      </button>
    </form>
  );
}
