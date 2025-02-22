"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GetCartItemsDocument,
  GetCartItemsQuery,
  RemoveCartItemDocument,
  UpdateItemQuantityDocument,
} from "@/generated/graphql";
import { Button } from "./ui/button";
import { useMutation } from "@apollo/client";
import { Input } from "./ui/input";
import { useState } from "react";
import {
  cartRemoveItemSchema,
  cartUpdateItemQuantitySchema,
} from "@/lib/schema";
import { toastZodErrorIssues, toastGraphQLZodError } from "@/helpers/error";
import toast from "react-hot-toast";

export type CartItemCardProps = {
  item: GetCartItemsQuery["getCart"]["items"][number];
};

export const CartItemCard = ({ item }: CartItemCardProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [removeCartItem] = useMutation(RemoveCartItemDocument);
  const [updateCartItemQuantity] = useMutation(UpdateItemQuantityDocument);

  const onRemoveClick = async () => {
    const input = { cartItemId: item._id };

    const validatedInput = cartRemoveItemSchema.safeParse(input);

    if (!validatedInput.success) {
      toastZodErrorIssues(validatedInput.error);
      return;
    }

    const toastId = toast.loading(`Removing the cart item: ${item.product.title}`);

    try {
      await removeCartItem({
        variables: { input },
        refetchQueries: [GetCartItemsDocument],
      });
    } catch (error) {
      toastGraphQLZodError(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  const onQuantityUpdateClick = async () => {
    const input = { cartItemId: item._id, quantity };

    const validatedInput = cartUpdateItemQuantitySchema.safeParse(input);

    if (!validatedInput.success) {
      toastZodErrorIssues(validatedInput.error);
      return;
    }

    try {
      await updateCartItemQuantity({
        variables: { input },
        refetchQueries: [GetCartItemsDocument],
      });

      toast.success("Cart Item Quantity updated successfully!");
    } catch (error) {
      toastGraphQLZodError(error);
    }
  };

  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    setQuantity(value);
  };

  useEffect(() => {
    setQuantity(q => Math.min(q, item.product.availableQuantity));
  }, [item.product.availableQuantity]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{item.product.title}</CardTitle>
        <CardDescription>${item.product.cost}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="flex gap-3 items-center">
            Quantity:
            <Input
              type="number"
              max={item.product.availableQuantity}
              min={0}
              value={quantity}
              onChange={onQuantityChange}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Available: {item.product.availableQuantity}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="default"
          className="w-full"
          onClick={onQuantityUpdateClick}
        >
          Update Quantity
        </Button>
        <Button
          variant="destructive"
          className="w-full"
          onClick={onRemoveClick}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};
