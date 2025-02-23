import { query } from "@/apollo-client";
import { GetCartItemsDocument } from "@/generated/graphql";

export default async function CheckoutPage() {
  const { data } = await query({
    query: GetCartItemsDocument,
  });

  const items = data.getCart.items;

  const totalPrice = items.reduce((acc, item) => acc + item.product.cost, 0);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="container flex self-center flex-col items-center">
      <h2 className="text-bold text-3xl pb-8 pt-4">Summary</h2>
      <div className="flex gap-8 text-semibold text-xl pb-8">
        <span>Total Price: <b>${totalPrice.toFixed(2)}</b></span>
        <span>Total Number of items: <b>${totalQuantity}</b></span>
      </div>
      <table className="w-full table-auto border-collapse text-sm">
        <thead>
          <tr>
            <th className="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-left font-medium text-gray-700 dark:border-gray-600 dark:text-gray-200">
              Title
            </th>
            <th className="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-left font-medium text-gray-700 dark:border-gray-600 dark:text-gray-200">
              Cost
            </th>
            <th className="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-left font-medium text-gray-700 dark:border-gray-600 dark:text-gray-200">
              Quantity
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {items.map(({ _id, product, quantity }) => (
            <tr key={_id}>
              <td className="border-b border-gray-100 p-4 pl-8 text-gray-800 dark:border-gray-700 dark:text-gray-400">{product.title}</td>
              <td className="border-b border-gray-100 p-4 pl-8 text-gray-800 dark:border-gray-700 dark:text-gray-400">{product.cost}$</td>
              <td className="border-b border-gray-100 p-4 pl-8 text-gray-800 dark:border-gray-700 dark:text-gray-400">{quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
