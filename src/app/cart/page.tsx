import { PreloadQuery, query } from "@/apollo-client";
import { CartItems } from "@/components/cart-items";
import { GetCartItemsDocument } from "@/generated/graphql";
import { Suspense } from "react";
import { SkeletonCards } from "@/components/skeleton-cards";

export default async function Cart() {
  return (
    <div className="container flex self-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <PreloadQuery query={GetCartItemsDocument}>
          {(queryRef) => (
            <Suspense fallback={<SkeletonCards length={12} />}>
              <CartItems queryRef={queryRef} />
            </Suspense>
          )}
        </PreloadQuery>
      </div>
    </div>
  );
}
