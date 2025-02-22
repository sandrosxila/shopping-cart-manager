"use client";

import { Product, AddItemToCartDocument, GetProductsDocument } from "@/generated/graphql";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation } from "@apollo/client";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { cartAddItemSchema } from "@/lib/schema";
import { toastGraphQLZodError, toastZodErrorIssues } from "@/helpers/error";

type ProductCardProps = {
  product: Omit<Product, "createdAt" | "updatedAt">;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const [addItemToCart] = useMutation(AddItemToCartDocument);

  const onAddItemToCartAddClick = async () => {
    const input = { productId: product._id, quantity };

    const validatedInput = cartAddItemSchema.safeParse(input);

    if (!validatedInput.success) {
      toastZodErrorIssues(validatedInput.error);
      return;
    }

    try {
      await addItemToCart({
        variables: { input },
      });

      toast.success("The product added successfully to the cart!");
    } catch (error: any) {
      console.log({...error});
      toastGraphQLZodError(error);
    }
  };

  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    setQuantity(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>${product.cost}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex gap-3 items-center">
            Quantity:
            <Input
              type="number"
              max={product.availableQuantity}
              min={0}
              value={quantity}
              onChange={onQuantityChange}
            />
          </div>
          <p className="text-sm font-medium leading-none">
            Available: {product.availableQuantity}
          </p>
          <p className="text-sm text-muted-foreground">
            {product.isArchived ? "Archived" : "Is not Archived"}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="default"
          onClick={onAddItemToCartAddClick}
          className="w-full"
        >
          Add To cart
        </Button>
      </CardFooter>
    </Card>
  );
};
