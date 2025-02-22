import { PreloadQuery, query } from "@/apollo-client";
import { GetProductsDocument } from "@/generated/graphql";
import { Products } from "@/components/products";

export default async function Home() {
  return (
    <div className="container flex grow justify-center w-full self-center">
      <div className="grid grid-cols-3 gap-4">
        <PreloadQuery query={GetProductsDocument}>
          {(queryRef) => <Products queryRef={queryRef} />}
        </PreloadQuery>
      </div>
    </div>
  );
}
