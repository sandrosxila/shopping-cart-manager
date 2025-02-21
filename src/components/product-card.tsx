"use client";

import { Product, AddItemToCartDocument } from "@/generated/graphql";
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

type ProductCardProps = {
  product: Omit<Product, "createdAt" | "updatedAt">;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const [addItemToCart] = useMutation(AddItemToCartDocument);

  const onAddItemToCartAddClick = () => {
    addItemToCart({
      variables: { input: { productId: product._id, quantity } },
    });
  };

  const onQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    setQuantity(value);
  }

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
            <Input type="number" max={product.availableQuantity} min={0} value={quantity} onChange={onQuantityChange}/>
          </div>
          <p className="text-sm font-medium leading-none">
            Available: {product.availableQuantity}
          </p>
          <p className="text-sm text-muted-foreground">
            {product.isArchived ? "Archived" : "Is not Archived"}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive">Cancel</Button>
        <Button variant="default" onClick={onAddItemToCartAddClick}>
          Add To cart
        </Button>
      </CardFooter>
    </Card>
  );
};
