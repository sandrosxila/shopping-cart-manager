"use client";

import React from "react";
import { Exact, GetCartItemsQuery } from "@/generated/graphql";
import { CartItemCard } from "@/components/cart-item-card";
import { TransportedQueryRef } from "@apollo/experimental-nextjs-app-support";
import { useReadQuery } from "@apollo/client";

type CartItemsProps = {
  queryRef: TransportedQueryRef<
    NoInfer<GetCartItemsQuery>,
    NoInfer<
      Exact<{
        [key: string]: never;
      }>
    >
  >;
};

export const CartItems = ({ queryRef }: CartItemsProps) => {
  const { data } = useReadQuery(queryRef);
  const items = data.getCart?.items || [];

  return (
    <>
      {items.map((item) => (
        <CartItemCard key={item._id} item={item} />
      ))}
    </>
  );
};
