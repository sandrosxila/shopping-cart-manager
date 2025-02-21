"use client";

import React, { useEffect } from 'react'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import { CartItemUpdateSubscriptionDocument, GetCartItemsQuery, RemoveCartItemDocument, UpdateItemQuantityDocument } from '@/generated/graphql';
import { Button } from './ui/button';
import {useMutation, useSubscription} from '@apollo/client';
import { Input } from './ui/input';
import {useState} from 'react';

export type CartItemCardProps = {
  item: GetCartItemsQuery["getCart"]["items"][number]
}

export const CartItemCard = ({ item } : CartItemCardProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [removeCartItem] = useMutation(RemoveCartItemDocument);
  const [updateCartItemQuantity] = useMutation(UpdateItemQuantityDocument);

  const onRemoveClick = () => {
    removeCartItem({
      variables: { input: { cartItemId: item._id } },
    });
  };

  const onQuantityUpdateClick = () => {
    updateCartItemQuantity({
      variables: { input: { cartItemId: item._id, quantity } },
    });
  }

  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    setQuantity(value);
  }

  return (
    <Card >
      <CardHeader>
        <CardTitle>{item.product.title}</CardTitle>
        <CardDescription>${item.product.cost}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="flex gap-3 items-center">
            Quantity:
            <Input type="number" max={item.product.availableQuantity} min={0} value={quantity} onChange={onQuantityChange}/>
          </div>
          <p className="text-sm text-muted-foreground">
            {item.product.availableQuantity}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-4">
        <Button variant="destructive" onClick={onRemoveClick}>Remove</Button>
        <Button variant="default" onClick={onQuantityUpdateClick}>
          Update Quantity
        </Button>
      </CardFooter>
    </Card>
  )
}
