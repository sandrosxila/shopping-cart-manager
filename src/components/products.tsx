"use client";

import React from "react";
import { ProductCard } from "@/components/product-card";
import {
  Exact,
  GetProductsQuery,
  CartItemUpdateSubscriptionDocument,
  CartItemEvent,
} from "@/generated/graphql";
import { TransportedQueryRef } from "@apollo/experimental-nextjs-app-support";
import {
  useReadQuery,
  useSubscription,
  useQueryRefHandlers,
} from "@apollo/client";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

type ProductsProps = {
  queryRef: TransportedQueryRef<
    NoInfer<GetProductsQuery>,
    NoInfer<
      Exact<{
        [key: string]: never;
      }>
    >
  >;
};

export const Products = ({ queryRef }: ProductsProps) => {
  const { refetch } = useQueryRefHandlers(queryRef);
  const { data } = useReadQuery(queryRef);

  const products = data.getProducts.products ?? [];

  const debouncedRefetch = useDebouncedCallback(refetch, 500);

  useSubscription(CartItemUpdateSubscriptionDocument, {
    onData({ data }) {
      if (data.data?.cartItemUpdate) {
        const { event, payload } = data.data?.cartItemUpdate;
        const { title, availableQuantity } = payload.product;

        if (event == CartItemEvent.ItemOutOfStock) {
          toast.error(`${title} is out of stock`, {
            icon: "ⓘ",
            duration: 2000,
          });
        } else if (event == CartItemEvent.ItemQuantityUpdated) {
          toast.error(
            `Available Quantity of ${title} is changed. \n (Currently it's ${availableQuantity})`,
            {
              icon: "ⓘ",
              duration: 2000,
            }
          );
        }

        debouncedRefetch();
      }
    },
  });

  return (
    <>
      {(products ?? []).map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </>
  );
};
