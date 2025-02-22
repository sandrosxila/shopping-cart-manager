"use client";

import React from "react";
import {CartItemUpdateSubscriptionDocument, Exact, GetCartItemsQuery, CartItemEvent} from '@/generated/graphql';
import { CartItemCard } from "@/components/cart-item-card";
import { TransportedQueryRef } from "@apollo/experimental-nextjs-app-support";
import { useQueryRefHandlers, useReadQuery, useSubscription } from "@apollo/client";
import { useDebouncedCallback } from 'use-debounce';
import toast from "react-hot-toast";

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
  const { refetch } = useQueryRefHandlers(queryRef);
  const { data } = useReadQuery(queryRef);

  const debouncedRefetch = useDebouncedCallback(refetch, 500);

  const items = data.getCart?.items ?? [];

  useSubscription(CartItemUpdateSubscriptionDocument, {
    onData({data}) {
      if(data.data?.cartItemUpdate){
        const { event, payload } = data.data?.cartItemUpdate;
        const { title, availableQuantity} = payload.product;

        if(event == CartItemEvent.ItemOutOfStock) {
          toast.error(`${title} is out of stock`, {
            icon: "ⓘ",
            duration: 2000
          });
        }
        else if(event == CartItemEvent.ItemQuantityUpdated) {
          toast.error(`Available Quantity of ${title} is changed. \n (Currently it's ${availableQuantity})`, {
            icon: "ⓘ",
            duration: 2000
          });          
        }

        debouncedRefetch();
      }
    },
  });

  return (
    <>
      {items.map((item) => (
        <CartItemCard key={item._id} item={item} />
      ))}
    </>
  );
};
