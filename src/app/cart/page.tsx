import { PreloadQuery } from "@/apollo-client";
import { CartItems } from "@/components/cart-items";
import { GetCartItemsDocument } from "@/generated/graphql";

export const dynamic = "force-dynamic";

export default async function Cart() {
  return (
    <div className="container flex self-center items-center flex-col gap-2">  
        <PreloadQuery query={GetCartItemsDocument}>
          <CartItems />
        </PreloadQuery>
    </div>
  );
}
