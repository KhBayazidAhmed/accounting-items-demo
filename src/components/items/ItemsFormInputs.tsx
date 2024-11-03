import { IItem } from "@/libs/Schema/Item.model";

export default function ItemsFormInputs({ itemData }: { itemData: IItem }) {
  const typeOfItems = [
    { name: "Service", value: "service" },
    { name: "Good", value: "good" },
  ];

  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Description..."
          defaultValue={itemData?.description || ""}
          required
          className="block w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="account"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Account
        </label>
        <div className="relative">
          <input
            id="account"
            name="account"
            list="accountOptions"
            defaultValue={itemData?.account || ""}
            required
            className="block w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            placeholder="Select Type"
          />
          <datalist id="accountOptions">
            <option value="Interest Income" />
            <option value="Other Revenue" />
            <option value="Realised Gain on Foreign Exchange" />
            <option value="Sales" />
          </datalist>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="price"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="0.00"
          defaultValue={itemData?.price || 0}
          required
          className="block w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="discount"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Discount
        </label>
        <input
          type="number"
          id="discount"
          name="discount"
          placeholder="1-100%"
          defaultValue={itemData?.discount || 0}
          required
          className="block w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="valueAddedTax"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Value Added Tax
        </label>
        <div className="relative">
          <input
            id="valueAddedTax"
            name="valueAddedTax"
            list="valueAddedTaxOptions"
            defaultValue={itemData?.valueAddedTax || ""}
            required
            className="block w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            placeholder="Select Type"
          />
          <datalist id="valueAddedTaxOptions">
            <option value="VAT 19" />
            <option value="VAT 9" />
            <option value="VAT 5" />
            <option value="System Created" />
            <option value="Reverse charge" />
            <option value="Tax exempt" />
            <option value="Zero tax" />
            <option value="Custom VAT" />
          </datalist>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="type"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Type of Item
        </label>
        <div className="flex items-center gap-2">
          {typeOfItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                className="cursor-pointer"
                type="radio"
                name="type"
                value={item.value}
                id={item.value}
              />
              <label className="cursor-pointer" htmlFor={item.value}>
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
