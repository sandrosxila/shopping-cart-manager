import { query } from "@/apollo-client";
import { CartItemCard } from "@/components/cart-item-card";
import { CartItems } from "@/components/cart-items";
import {
  GetCartItemsDocument,
  GetProductsDocument,
  Product,
} from "@/generated/graphql";

export default async function Cart() {
  const { data } = await query({
    query: GetCartItemsDocument,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

  const items = data.getCart?.items || [];

  return (
    <div className="container flex justify-center">
      <div className="grid grid-cols-3 gap-4">
        <CartItems items={items} />
      </div>
    </div>
  );
}
