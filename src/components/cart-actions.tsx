"use client";

import React from 'react'
import {Button} from '@/components/ui/button';
import { useMutation } from "@apollo/client";
import { AddItemToCartDocument } from '@/generated/graphql';

type CartActionsProps = {
  productId: string;
}

export const CartActions = ({productId} : CartActionsProps) => {
  const [addItemToCart, { data, loading, error }] = useMutation(AddItemToCartDocument)

  const onAddItemToCartAddClick  = () => {
    addItemToCart({ variables: { input: { productId , quantity: 1} } });
  }

  return (
    <>
      <Button variant="destructive">Cancel</Button>
      <Button variant="default" onClick={onAddItemToCartAddClick}>Add To cart</Button>
    </>
  )
}
