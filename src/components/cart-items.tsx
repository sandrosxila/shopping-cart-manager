"use client";

import React, { useState } from "react";
import {
  CartItemUpdateSubscriptionDocument,
  CartItemEvent,
  GetCartItemsDocument,
} from "@/generated/graphql";
import { CartItemCard } from "@/components/cart-item-card";
import { useSubscription, useSuspenseQuery } from "@apollo/client";
import { useDebouncedCallback } from "use-debounce";
import toast from "react-hot-toast";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const DEBOUNCE_TIMEOUT = 500;
const TOAST_DURATION = 2000;

export const CartItems = () => {
  const { data, refetch } = useSuspenseQuery(GetCartItemsDocument);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const [itemsChanged, setItemsChanged] = useState<
    { title: string; availableQuantity: number }[]
  >([]);
  const [itemsAffected, setItemsAffected] = useState<
    { title: string; oldQuantity: number; newQuantity: number }[]
  >([]);
  const [itemsRemoved, setItemsRemoved] = useState<string[]>([]);

  const debouncedOpen = useDebouncedCallback(
    () => setIsModalOpen(true),
    DEBOUNCE_TIMEOUT
  );

  const items = data.getCart?.items ?? [];

  useSubscription(CartItemUpdateSubscriptionDocument, {
    onData({ data }) {
      console.log(data);
      if (data.data?.cartItemUpdate) {
        const { event, payload } = data.data?.cartItemUpdate;
        const { title } = payload.product;
        const { quantity: newQuantity, _id } = payload;
        const { quantity } = items.find((item) => item._id === _id)!;

        if (event == CartItemEvent.ItemOutOfStock) {
          toast.error(`${title} is out of stock`, {
            icon: "ⓘ",
            duration: TOAST_DURATION,
          });

          setItemsRemoved((prev) => [...prev, title]);
        } else if (event == CartItemEvent.ItemQuantityUpdated) {
          toast.error(
            `Available Quantity of ${title} is changed. \n (Currently it's ${newQuantity})`,
            {
              icon: "ⓘ",
              duration: TOAST_DURATION,
            }
          );

          setItemsChanged((prev) => [
            ...prev,
            { title, availableQuantity: newQuantity },
          ]);

          if (newQuantity < quantity) {
            setItemsAffected((prev) => [
              ...prev,
              { title, oldQuantity: quantity, newQuantity },
            ]);
          }
        }

        debouncedOpen();
      }
    },
  });

  const onOkClick = () => {
    setIsModalOpen(false);
    setItemsChanged([]);
    setItemsRemoved([]);
    setItemsAffected([]);
    refetch();
  };

  const onCheckoutClick = () => {
    router.push("/checkout");
  };

  return (
    <>
      <Dialog open={isModalOpen}>
        <DialogContent showClose={false} className="max-h-screen">
          <DialogHeader>
            <DialogTitle>Quantities of added products changed</DialogTitle>
            <DialogDescription>
              <ul className="list-disc list-inside font-semibold space-y-2 h-full max-h-100 overflow-y-auto text-lg pt-2">
                {itemsChanged.length > 0 && (
                  <li>
                    Item(s) with changed quantities:
                    <ul className="list-disc list-inside pl-8 font-normal text-base pt-2">
                      {itemsChanged.map((item, id) => (
                        <li key={id}>
                          {item.title} - {item.availableQuantity}
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
                {itemsRemoved.length > 0 && (
                  <li>
                    Item(s) removed due to being out of stock
                    <ul className="list-disc list-inside pl-8 font-normal text-base pt-2">
                      {itemsRemoved.map((item, id) => (
                        <li key={id}>{item}</li>
                      ))}
                    </ul>
                  </li>
                )}
                {itemsAffected.length > 0 && (
                  <li>
                    Items(s) affected
                    <ul className="list-disc list-inside pl-8 font-normal text-base pt-2">
                      {itemsAffected.map(
                        ({ title, oldQuantity, newQuantity }, id) => (
                          <li key={id}>
                            {title} - was {oldQuantity}, became {newQuantity}
                          </li>
                        )
                      )}
                    </ul>
                  </li>
                )}
              </ul>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={onOkClick}>Ok</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex justify-center">
        <Button
          size="lg"
          className="bg-green-700 hover:bg-green-800"
          onClick={onCheckoutClick}
        >
          Checkout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <CartItemCard key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};
