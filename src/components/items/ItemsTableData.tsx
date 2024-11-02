"use client";

interface Item {
  description: string;
  account: string;
  price: number;
  discount: number;
  valueAddedTax: number;
  type: "service" | "good";
}
// Example data - replace this with your data fetching logic
const items: Item[] = [
  {
    description: "Web Development Service",
    account: "Dev Account",
    price: 500,
    discount: 10,
    valueAddedTax: 15,
    type: "service",
  },
  {
    description: "Office Supplies",
    account: "Supply Account",
    price: 200,
    discount: 5,
    valueAddedTax: 15,
    type: "good",
  },
];
export default function ItemsTableData() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[70vw] mb-4">
      <h1 className="text-xl font-semibold">Items Table</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="text-gray-600 text-center">
                <td className="py-2 px-4 border-b">{item.description}</td>
                <td className="py-2 px-4 border-b">{item.type}</td>
                <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
