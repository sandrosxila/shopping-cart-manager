import { PreloadQuery, query } from "@/apollo-client";
import { CartItems } from "@/components/cart-items";
import { GetCartItemsDocument } from "@/generated/graphql";

export default async function Cart() {
  return (
    <div className="container flex justify-center">
      <div className="grid grid-cols-3 gap-4">
        <PreloadQuery query={GetCartItemsDocument}>
          {(queryRef) => <CartItems queryRef={queryRef} />}
        </PreloadQuery>
      </div>
    </div>
  );
}
