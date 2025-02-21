"use client";

import React from "react";
import {
  CartItemUpdateSubscriptionDocument,
  GetCartItemsQuery,
} from "@/generated/graphql";
import { useSubscription } from "@apollo/client";
import { CartItemCard } from "@/components/cart-item-card";

type CartItemsProps = {
  items: GetCartItemsQuery["getCart"]["items"];
};

export const CartItems = ({ items }: CartItemsProps) => {
  const { data, loading } = useSubscription(
    CartItemUpdateSubscriptionDocument,
    {
      onData(options) {
        console.log(options);
      },
      onError(error) {
        console.log(error);
      },
      fetchPolicy: 'no-cache'
    }
  );

  console.log(data, loading)

  return (
    <>
      {items.map((item) => (
        <CartItemCard key={item._id} item={item} />
      ))}
    </>
  );
};
